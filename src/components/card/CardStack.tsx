import { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ItemTypes, Card as CardType } from "@/GameState";
import Card from "./Card";

interface CardStackProps {
  cards: CardType[];
}

export default function CardStack({ cards }: CardStackProps) {
  const [draggedCardIds, setDraggedCardIds] = useState<string[]>([]);

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { draggedCardIds },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [draggedCardIds],
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  const handleClick = (clickedCardId: string) => {
    const clickedCard = cards.find((card) => card.id === clickedCardId);
    if (!clickedCard) return;
    const newDraggedCardIds = cards
      .filter((card) => card.position.z >= clickedCard.position.z)
      .map((card) => card.id);
    setDraggedCardIds(newDraggedCardIds);
  };

  const renderCards = (card: CardType) => (
    <Card
      key={card.id}
      card={card}
      onCardClick={handleClick}
      isDragging={isDragging && draggedCardIds.includes(card.id)}
    />
  );

  const draggedCards = cards.filter((card) => draggedCardIds.includes(card.id));
  const remainingCards = cards.filter(
    (card) => !draggedCardIds.includes(card.id),
  );

  return (
    <>
      <div className="relative">{remainingCards.map(renderCards)}</div>
      <div ref={drag} className={`relative`}>
        {draggedCards.map(renderCards)}
      </div>
    </>
  );
}
