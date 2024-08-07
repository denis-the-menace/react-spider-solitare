import { useDrag } from "react-dnd";
import { ItemTypes, Card as CardType, Game } from "./Game";

interface CardProps {
  card: CardType;
}

export default function Card({ card }: CardProps) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id: card.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [card.id],
  );

  return (
    <div
      ref={card.isMovable ? drag : null}
      className={`absolute w-32 h-48 cursor-grab select-none ${
        isDragging ? "cursor-grabbing opacity-0" : "opacity-100"
      }`}
      style={{
        zIndex: card.position.z,
        top: `${card.position.z * 32}px`,
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
