import Tableau from "./Tableau";
import Stock from "./Stock";
import Foundation from "./Foundation";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { Game } from "./Game";
import { useState, useEffect } from "react";
import { DragLayer } from "./DragLayer";

interface BoardProps {
  game: Game;
  setHandleUndo: (handleUndo: () => void) => void;
}

export default function Board({ game, setHandleUndo }: BoardProps) {
  const [cards, setCards] = useState(game.cards);
  const isMobile = window.matchMedia("(pointer: coarse)").matches;
  const backend = isMobile ? TouchBackend : HTML5Backend;

  if (!backend) {
    return null;
  }

  useEffect(() => {
    const unsubscribe = game.observe((cardId, position, faceUp) => {
      setCards((cards) =>
        cards.map((card) =>
          card.id === cardId ? { ...card, position, faceUp } : card,
        ),
      );
    });
    return unsubscribe;
  }, [game]);

  useEffect(() => {
    setHandleUndo(() => handleUndo);
  }, [setHandleUndo]);

  const handleUndo = () => {
    game.undo();
  };

  return (
    <DndProvider backend={backend}>
      <DragLayer game={game} />
      <div className="h-full overflow-y-auto overflow-x-hidden no-scrollbar">
        <div className="grid grid-cols-10 grid-rows-2 lg:gap-8 lg:mt-8">
          <div className="col-span-1 row-span-1">
            <Stock cards={cards} game={game} />
          </div>
          <div className="col-span-9 row-span-1">
            <Foundation cards={cards} game={game} />
          </div>
          <div className="col-span-10 row-span-1">
            <Tableau cards={cards} game={game} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
