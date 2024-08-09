import { Card as CardType } from "./Game";

interface CardProps {
  card: CardType;
  onCardMouseDown: (clickedCardId: string) => void;
}

export default function Card({ card, onCardMouseDown }: CardProps) {
  const handleCardMouseDown = () => {
    console.log(card.position.z);
    card.faceUp ? onCardMouseDown(card.id) : null;
  };

  return (
    <div
      className={`absolute w-32 h-48 select-none ${card.faceUp && "cursor-grab"}`}
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
          src="cards/back_1.png"
          alt="back"
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
      )}
    </div>
  );
}
