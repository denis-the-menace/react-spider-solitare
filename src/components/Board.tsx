import CardArea from "./CardArea";
import Foundation from "./Foundation";
import Stock from "./Stock";
import Tableau from "./Tableau";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Game } from "./Game";
import { useState, useEffect } from "react";

interface BoardProps {
  game: Game;
}

export default function Board({ game }: BoardProps) {
  const [cards, setCards] = useState(game.cards);

  useEffect(() => {
    const unsubscribe = game.observe((cardId, position) => {
      setCards((cards) =>
        cards.map((card) =>
          card.id === cardId ? { ...card, position } : card,
        ),
      );
    });
    console.log(game);
    return unsubscribe;
  }, [game]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-10 grid-rows-2 gap-4 h-full">
        <Stock />
        <Foundation />
        <div className="col-span-10 row-span-1">
          <Tableau cards={cards} game={game} />
        </div>
      </div>
    </DndProvider>
  );
}
