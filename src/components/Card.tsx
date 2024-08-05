import React, { useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { updateCardPosition, stackCards } from "../slices/cardSlice";

type CardProps = {
  id: string;
  src: string;
  alt: string;
  isMovable: boolean;
  style?: React.CSSProperties;
};

export default function Card({ id, src, alt, isMovable, style }: CardProps) {
  const dispatch = useAppDispatch();
  const card = useAppSelector((state) =>
    state.cards.deck.find((card) => card.id === id),
  );
  const position = useAppSelector(
    (state) => state.cards.deck.find((card) => card.id === id)?.position,
  );

  const [dragging, setDragging] = useState(false);

  // Handle drag start event
  const handleStart = (_: DraggableEvent, data: DraggableData) => {
    if (!isMovable) return false;
    setDragging(true);
  };

  // Handle drag event
  const handleDrag = (_: DraggableEvent, data: DraggableData) => {
    dispatch(updateCardPosition({ id, position: { x: data.x, y: data.y } }));
  };

  // Handle drag stop event for stacking
  const handleStop = useCallback(
    (_: DraggableEvent, data: DraggableData) => {
      setDragging(false);

      const targetId = findTargetCard(id, data.x, data.y);

      if (targetId) {
        dispatch(stackCards({ draggedId: id, targetId }));
      }
    },
    [dispatch, id],
  );

  // Find target card to stack on
  const findTargetCard = (
    draggedId: string,
    x: number,
    y: number,
  ): string | null => {
    const cards = useAppSelector((state) => state.cards.deck);
    const draggedCard = cards.find((card) => card.id === draggedId);

    if (!draggedCard) return null;

    for (let i = 0; i < cards.length; i++) {
      const targetCard = cards[i];

      if (targetCard.id === draggedId) continue;

      // Check if position overlaps (basic bounding box collision detection)
      if (
        x >= targetCard.position.x &&
        x <= targetCard.position.x + 150 && // Card width
        y >= targetCard.position.y &&
        y <= targetCard.position.y + 200 // Card height
      ) {
        return targetCard.id;
      }
    }

    return null;
  };

  return (
    <Draggable
      disabled={!isMovable}
      handle=".card-handle"
      position={position}
      onStart={handleStart}
      onDrag={handleDrag}
    >
      <div
        className={`card-handle absolute w-36 h-48 cursor-grab ${dragging ? "cursor-grabbing" : ""}`}
        style={{ ...style, zIndex: card?.zIndex || 0 }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
      </div>
    </Draggable>
  );
}
