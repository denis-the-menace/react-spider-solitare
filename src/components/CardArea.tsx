import React from "react";
import { ItemTypes } from "./Card";
import { useDrop } from "react-dnd";
import { useAppDispatch } from "../hooks";
import { updateCardPosition } from "../slices/cardSlice";
import Card from "./Card";

export default function CardArea({
  x,
  y,
  cards,
}: {
  x: number;
  y: number;
  cards: Array<{ id: string, src: string, alt: string, isMovable: boolean }>;
}) {
  const dispatch = useAppDispatch();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.card,
    drop: (item: { id: string }) => {
      console.log("CardArea drop", item.id, x, y);
      dispatch(updateCardPosition({ id: item.id, position: { x, y } }));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [x, y, dispatch]);

  return (
    <div 
      ref={drop} 
      style={{ 
        position: 'absolute', 
        left: x, 
        top: y, 
        width: '100%', 
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(128px, 1fr))',
        gridTemplateRows: 'repeat(auto-fill, minmax(192px, 1fr))',
        backgroundColor: isOver ? 'lightblue' : 'transparent'
      }}
    >
      {cards.map(card => (
        <Card
          key={card.id}
          id={card.id}
          src={card.src}
          alt={card.alt}
          isMovable={card.isMovable}
        />
      ))}
    </div>
  );
}
