import { useDrag } from "react-dnd";
import { ItemTypes, Card as CardType } from "./Game";

interface CardProps {
  card: CardType;
  isDragging: boolean;
}

export default function Card({ card, isDragging }: CardProps) {
  return (
    <div
      className={`absolute w-32 h-48 cursor-grab select-none ${
        isDragging ? "cursor-grabbing opacity-0" : "opacity-100"
      }`}
      style={{
        zIndex: card.position.z,
        top:
          card.position.x === 0 && card.position.y === 0
            ? ""
            : `${card.position.z * 32}px`,
      }}
    >
      {card.faceUp ? (
        <img
          src={card.src}
          alt={card.alt}
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
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
