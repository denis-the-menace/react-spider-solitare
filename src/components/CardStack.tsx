import { useState, useRef } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes, Card as CardType } from "./Game";
import Card from "./Card";

interface CardStackProps {
  cards: CardType[];
}

export default function CardStack({ cards }: CardStackProps) {
  const [draggedCardIds, setDraggedCardIds] = useState<string[]>([]);
  const mouseOffsetRef = useRef({ x: 0, y: 0 });

  const handleCardMouseDown = (
    clickedCardId: string,
    event: React.MouseEvent,
  ) => {
    const clickedCard = cards.find((card) => card.id === clickedCardId);
    if (!clickedCard) return;

    const newDraggedCardIds = cards
      .filter((card) => card.position.z >= clickedCard.position.z)
      .map((card) => card.id);

    setDraggedCardIds(newDraggedCardIds);

    const rect = event.currentTarget.getBoundingClientRect();
    mouseOffsetRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { draggedCardIds, mouseOffset: mouseOffsetRef.current, cards },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [draggedCardIds, cards],
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
      <div ref={drag} className={`relative ${isDragging && "opacity-0"}`}>
        {draggedCards.map(renderCards)}
      </div>
    </>
  );
}
