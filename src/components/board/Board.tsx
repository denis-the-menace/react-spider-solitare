import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import Tableau from "@/components/board/Tableau";
import Stock from "@/components/board/Stock";
import Foundation from "@/components/board/Foundation";
import { GameState, Card as CardType } from "@/GameState";
import { DragLayer } from "@/components/card/DragLayer";
import AnimatedCard from "@/components/card/AnimatedCard";

interface BoardProps {
  game: GameState;
  setHandleUndo: (handleUndo: () => void) => void;
}

interface AnimatedCardType {
  card: CardType;
  startPos: { x: number; y: number };
  endPos: { x: number; y: number };
}

export default function Board({ game, setHandleUndo }: BoardProps) {
  const [cards, setCards] = useState(game.cards);
  const [animatingCards, setAnimatingCards] = useState<AnimatedCardType[]>([]);
  const isMobile = window.matchMedia("(pointer: coarse)").matches;
  const backend = isMobile ? TouchBackend : HTML5Backend;

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
    const handleUndo = () => {
      game.undo();
    };
    setHandleUndo(() => handleUndo);
  }, [setHandleUndo, game]);

  const handleDealCards = () => {
    const stockRect = document.querySelector(".stock")?.getBoundingClientRect();
    const stock = cards.filter(
      (card) => card.position.x === 0 && card.position.y === 0,
    );
    if (!stockRect) return;

    const dealtCards = game.dealStockCards(stock);

    const newAnimatingCards: AnimatedCardType[] = dealtCards
      .map((card, index) => {
        console.log(index);
        const tableauRect = document
          .querySelector(`.tableau-area-${index}`)
          ?.getBoundingClientRect();
        if (!tableauRect) return null;

        return {
          card,
          startPos: {
            x: stockRect.left + (stock.length / 10) * 16,
            y: stockRect.top,
          },
          endPos: {
            x: tableauRect.left,
            y: tableauRect.top + card.position.z * 32,
          },
        };
      })
      .filter(Boolean) as AnimatedCardType[];

    console.log(newAnimatingCards);
    setAnimatingCards(newAnimatingCards);
  };

  const handleAnimationComplete = () => {
    console.log("animation complete");
    game.emitChangeForAll(animatingCards.map(({ card }) => card.id));
    setAnimatingCards([]);
  };

  if (!backend) {
    return null;
  }

  return (
    <DndProvider backend={backend}>
      <DragLayer game={game} />
      <div className="h-full overflow-y-auto overflow-x-hidden no-scrollbar">
        <div className="grid grid-cols-10 grid-rows-2 lg:gap-8 lg:mt-8">
          <div className="col-span-1 row-span-1">
            <Stock cards={cards} game={game} onDeal={handleDealCards} />
          </div>
          <div className="col-span-9 row-span-1">
            <Foundation cards={cards} game={game} />
          </div>
          <div className="col-span-10 row-span-1">
            <Tableau cards={cards} game={game} />
          </div>
        </div>
      </div>
      {animatingCards.map(({ card, startPos, endPos }, index) => (
        <AnimatedCard
          key={card.id}
          card={card}
          startPos={startPos}
          endPos={endPos}
          index={index}
          onAnimationComplete={handleAnimationComplete}
        />
      ))}
    </DndProvider>
  );
}
