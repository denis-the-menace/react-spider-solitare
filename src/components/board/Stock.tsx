import { useState } from "react";
import { Card as CardType, GameState } from "@/GameState";
import CardArea from "@/components/card/CardArea";
import { AnimatedCardType } from "../card/AnimatedCard";

interface StockProps {
  cards: CardType[];
  game: GameState;
  onDeal: (newAnimatingCards: AnimatedCardType[]) => void;
  isAnimating: boolean;
}

export default function Stock({
  cards,
  game,
  onDeal,
  isAnimating,
}: StockProps) {
  const isMobile = window.matchMedia("(pointer: coarse)").matches;
  const stock = cards.filter(
    (card) => card.position.x === 0 && card.position.y === 0,
  );
  const [noOfEmptyCards, setNoOfEmptyCards] = useState(
    Math.ceil(stock.length / 10),
  );

  const handleDealCards = () => {
    if (isAnimating) return;

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

    setNoOfEmptyCards(...[noOfEmptyCards - 1]);
    onDeal(newAnimatingCards);
  };

  const renderEmptyCards = () => {
    return Array.from({ length: noOfEmptyCards }, (_, index) => {
      let leftValue = `${index}rem`;
      if (isMobile) leftValue = `${index * 0.5}rem`;
      return (
        <div
          key={`empty-${index}`}
          className={`border-black border-2 border-x-[5px] rounded-lg absolute w-[4.5rem] h-[6rem] md:w-[6rem] md:h-[8rem] lg:w-[7rem] lg:h-[10rem] xl:w-[8rem] xl:h-[12rem] select-none cursor-pointer`}
          style={{
            zIndex: index,
            left: leftValue,
            transition: "top 0.5s ease, left 0.5s ease",
          }}
          onClick={handleDealCards}
        >
          <img
            src="cards/back_1.png"
            alt="back"
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
        </div>
      );
    });
  };

  return (
    <div className="stock lg:ml-3 relative w-[4.5rem] h-[6rem] sm:w-[5rem] sm:h-[7rem] md:w-[6rem] md:h-[8rem] lg:w-[7rem] lg:h-[10rem] xl:w-[8rem] xl:h-[12rem]">
      {renderEmptyCards()}
      <CardArea
        key={`${0}-${0}`}
        x={0}
        y={0}
        cards={[]}
        game={game}
        onClick={handleDealCards}
      />
    </div>
  );
}
