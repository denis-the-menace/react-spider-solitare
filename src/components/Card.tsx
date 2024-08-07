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
      ref={drag}
      className={`card-handle absolute w-32 h-48 cursor-grab ${
        isDragging ? "cursor-grabbing" : ""
      }`}
      key={card.alt} // Force re-render on position change
    >
      <img
        src={card.src}
        alt={card.alt}
        className="w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
    </div>
  );
}
