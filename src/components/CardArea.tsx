import { useState } from 'react';
import Card from './Card';

type CardData = {
  id: string;
  src: string;
  alt: string;
  position: { x: number; y: number };
};

export default function CardArea() {
  const [cards, setCards] = useState<CardData[]>([
    // Initialize with your card data
  ]);

  const handleDrag = (id: string, data: { x: number; y: number }) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, position: data } : card
      )
    );
  };

  const handleDragStop = (id: string, data: { x: number; y: number }) => {
    const draggedCard = cards.find(card => card.id === id);
    if (!draggedCard) return;

    const overlappingCard = cards.find(card => 
      card.id !== id && isOverlapping(draggedCard, card, data)
    );

    if (overlappingCard) {
      // Stack the cards
      setCards(prevCards =>
        prevCards.filter(card => card.id !== id)
          .concat({ ...draggedCard, position: overlappingCard.position })
      );
    } else {
      handleDrag(id, data);
    }
  };

  const isOverlapping = (card1: CardData, card2: CardData, newPosition: { x: number; y: number }) => {
    const threshold = 50; // Adjust based on your needs
    const dx = Math.abs(newPosition.x - card2.position.x);
    const dy = Math.abs(newPosition.y - card2.position.y);
    return dx < threshold && dy < threshold;
  };

  return (
    <div className="relative w-full h-full">
      {cards.map(card => (
        <Card
          key={card.id}
          id={card.id}
          src={card.src}
          alt={card.alt}
          isMovable={true}
          position={card.position}
          onDrag={(_, data) => handleDrag(card.id, data)}
          onStop={(_, data) => handleDragStop(card.id, data)}
        />
      ))}
    </div>
  );
}
