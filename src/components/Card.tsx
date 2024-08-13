import { Card as CardType } from "./Game";

interface CardProps {
  card: CardType;
  onCardMouseDown?: (clickedCardId: string) => void;
}

export default function Card({ card, onCardMouseDown }: CardProps) {
  const handleCardMouseDown = () => {
    if (!onCardMouseDown) return;
    card.faceUp ? onCardMouseDown(card.id) : null;
  };

  return (
    <div
      className={`border-black border-2 border-x-[5px] rounded-lg absolute w-[4.5rem] h-[6rem] md:w-[6rem] md:h-[8rem] lg:w-[7rem] lg:h-[10rem] xl:w-[8rem] xl:h-[12rem] select-none ${card.faceUp && "cursor-grab"}`}
      style={{
        zIndex: card.position.z,
        top:
          card.position.x === 0 && card.position.y === 0
            ? ""
            : `${card.position.z * 32}px`,
      }}
      onMouseDown={handleCardMouseDown}
    >
      {card.faceUp ? (
        <img
          src={card.src}
          alt={card.alt}
          className="w-full h-full object-cover pointer-events-none"
        />
      ) : (
        <img
          src="cards/back1.png"
          alt="back"
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
      )}
    </div>
  );
}
