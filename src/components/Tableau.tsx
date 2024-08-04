import { useAppDispatch, useAppSelector } from "../hooks";
import { updateCardPosition, stackCards } from "../slices/cardSlice";
import Card from "./Card";

export default function Tableau() {
  const cards = useAppSelector(state => state.cards.cards);
  const dispatch = useAppDispatch();

  const handleDrag = (id: string, data: { x: number; y: number }) => {
    dispatch(updateCardPosition({ id, position: data }));
  };

  const handleDragStop = (id: string, data: { x: number; y: number }) => {
    const draggedCard = cards.find((card) => card.id === id);
    if (!draggedCard) return;

    const overlappingCard = cards.find(
      (card) => card.id !== id && isOverlapping(draggedCard, card, data),
    );

    if (overlappingCard) {
      dispatch(stackCards({ draggedId: id, targetId: overlappingCard.id }));
    } else {
      dispatch(updateCardPosition({ id, position: data }));
    }
  };

  const isOverlapping = (
    card1: CardData,
    card2: CardData,
    newPosition: { x: number; y: number },
  ) => {
    const threshold = 50;
    const dx = Math.abs(newPosition.x - card2.position.x);
    const dy = Math.abs(newPosition.y - card2.position.y);
    return dx < threshold && dy < threshold;
  };

  return (
    <div className="col-span-10 mt-4 relative" style={{ height: "400px" }}>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          {...card}
          isMovable={true}
          onDrag={(_, data) => handleDrag(card.id, data)}
          onStop={(_, data) => handleDragStop(card.id, data)}
          style={{ zIndex: index }}
        />
      ))}
    </div>
  );
}
