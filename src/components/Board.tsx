import Tableau from "./Tableau";
import Stock from "./Stock";
import Foundation from "./Foundation";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Game } from "./Game";
import { useState, useEffect } from "react";
import { DragLayer } from "./DragLayer";

interface BoardProps {
  game: Game;
}

export default function Board({ game }: BoardProps) {
  const [cards, setCards] = useState(game.cards);

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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-10 grid-rows-2 gap-8 w-full h-full">
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
    </DndProvider>
  );
}
