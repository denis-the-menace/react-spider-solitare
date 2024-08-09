import { useState } from "react";
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

  const [draggedCardIds, setDraggedCardIds] = useState<string[]>([]);

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

  const renderCards = (card: CardType) => {
    return (
      <Card key={card.id} card={card} onCardMouseDown={handleCardMouseDown} />
    );
  };

  const draggedCards = cards.filter((card) =>
    draggedCardIds.some((draggedCardId) => draggedCardId === card.id),
  );
  const remainingCards = cards.slice(0, cards.length - draggedCards.length);
  const cardElements = remainingCards.map(renderCards);
  // console.log(cardElements);
  const draggedCardElements = draggedCards.map(renderCards);

  //farkli yerlerden tiklayinca hata veriyor
  //eger cardstacke birakirsan hata veriyor carda birakirsan sikinti yok

  return (
    <>
      <div className="relative">{cardElements}</div>
      <div ref={drag} className="relative">
        {draggedCardElements}
      </div>
    </>
  );
}
