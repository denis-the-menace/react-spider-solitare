import Card from "./Card";
import { GameState, Card as CardType } from "@/GameState";

interface FoundationCardAreaProps {
  x: number;
  y: number;
  cards: CardType[];
  game: GameState;
}

export default function FoundationCardArea({
  x,
  y,
  cards,
}: FoundationCardAreaProps) {
  if (!cards) return null;

  return (
    <div
      className={`border-black border-2 border-x-4 rounded-lg w-[4.5rem] h-[6rem] md:w-[6rem] md:h-[8rem]
        lg:w-[7rem] lg:h-[10rem] xl:w-[8rem] xl:h-[12rem] flex items-center justify-center relative 
        transition-colors duration-300`}
      style={{
        gridColumnStart: x + 1,
        gridRowStart: y,
      }}
    >
      {cards.length ? (
        <Card
          card={cards.reduce((highestZCard, currentCard) => {
            return currentCard.position.z > highestZCard.position.z
              ? currentCard
              : highestZCard;
          }, cards[0])}
        />
      ) : (
        <img
          src="cards/back_1.png"
          alt="back"
          className="brightness-75 w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
      )}
    </div>
  );
}
