import React, { useMemo } from "react";
import { useAppSelector } from "../hooks";
import { useDrag } from "react-dnd";

export const ItemTypes = {
  card: "card",
};

type CardProps = {
  id: string;
  src: string;
  alt: string;
  isMovable: boolean;
  style?: React.CSSProperties;
};

export default function Card({ id, src, alt, isMovable, style }: CardProps) {
  const card = useAppSelector((state) =>
    state.cards.deck.find((card) => card.id === id)
  );

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.card,
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [id]);

  const cardStyle = useMemo(() => ({
    ...style,
    zIndex: card?.zIndex || 10,
    gridColumn: `${(card?.position.x || 0) + 1} / span 1`,
    gridRow: `${(card?.position.y || 0) + 1} / span 1`,
  }), [card?.position.x, card?.position.y, card?.zIndex, style]);
  console.log(cardStyle);

  if (!card) return null;

  return (
    <div
      ref={drag}
      className={`card-handle absolute w-32 h-48 cursor-grab ${
        isDragging ? "cursor-grabbing" : ""
      }`}
      style={cardStyle}
      key={`${card.position.x}-${card.position.y}`} // Force re-render on position change
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
    </div>
  );
}
