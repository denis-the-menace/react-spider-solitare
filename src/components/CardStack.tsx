import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes, Card as CardType } from "./Game";
import Card from "./Card";

interface CardStackProps {
  cards: CardType[];
}

export default function CardStack({ cards }: CardStackProps) {
  if (!cards) {
    return null;
  }

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id: cards[0]?.id || "", cards },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [cards],
  );

  console.log(cards);

  const renderCards = (card: CardType) => {
    return <Card key={card.id} card={card} isDragging={isDragging} />;
  };

  let cardElements = null;
  if (cards) {
    cardElements = cards.map(renderCards);
  }

  return (
    <div
      ref={drag}
      className={`relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
    >
      {cardElements}
    </div>
  );
}
