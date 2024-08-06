import React, { useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { updateCardPosition, stackCards } from "../slices/cardSlice";
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
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.card,
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const dispatch = useAppDispatch();
  const card = useAppSelector((state) =>
    state.cards.deck.find((card) => card.id === id),
  );
  const position = useAppSelector(
    (state) => state.cards.deck.find((card) => card.id === id)?.position,
  );

  return (
    <div
      ref={drag}
      className={`card-handle absolute w-36 h-48 cursor-grab ${isDragging ? "cursor-grabbing" : ""}`}
      style={{ ...style, zIndex: card?.zIndex || 0 }}
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
