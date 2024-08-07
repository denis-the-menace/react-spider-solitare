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
    return unsubscribe;
  }, [game]);

  const stock = cards.filter((card) => card.location === "stock");
  const tableau = cards.filter((card) => card.location === "tableau");

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-10 grid-rows-2 gap-8 w-full h-full">
        <div className="col-span-2 row-span-1">
          <Stock cards={stock} game={game} />
        </div>
        <div className="col-span-8 row-span-1">
          <Foundation game={game} />
        </div>
        <div className="col-span-10 row-span-1">
          <Tableau cards={tableau} game={game} />
        </div>
      </div>
    </DndProvider>
  );
}
