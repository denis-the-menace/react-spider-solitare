import { useState } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes, Card as CardType } from "./Game";
import Card from "./Card";

interface CardStackProps {
  cards: CardType[];
}

export default function CardStack({ cards }: CardStackProps) {
  const [draggedCardIds, setDraggedCardIds] = useState<string[]>([]);

  if (!cards) {
    return null;
  }

  const handleCardMouseDown = (clickedCardId: string) => {
    const clickedCard = cards.find((card) => card.id === clickedCardId);
    if (!clickedCard) return;
    const newDraggedCardIds = cards
      .filter((card) => card.position.z >= clickedCard.position.z)
      .map((card) => card.id);

    setDraggedCardIds(newDraggedCardIds);
  };

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { draggedCardIds },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [draggedCardIds],
  );

  const renderCards = (card: CardType) => (
    <Card key={card.id} card={card} onCardMouseDown={handleCardMouseDown} />
  );

  const draggedCards = cards.filter((card) => draggedCardIds.includes(card.id));

  const remainingCards = cards.filter(
    (card) => !draggedCardIds.includes(card.id),
  );

  return (
    <>
      <div className="relative">{remainingCards.map(renderCards)}</div>
      <div ref={drag} draggable="true" className={`relative ${isDragging && "opacity-0"}`}>
        {draggedCards.map(renderCards)}
      </div>
    </>
  );
}
