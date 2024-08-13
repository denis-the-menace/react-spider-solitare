import { useDragLayer } from "react-dnd";
import { ItemTypes, Game } from "./Game";
import Card from "./Card";

interface DragLayerProps {
  game: Game;
}

export function DragLayer({ game }: DragLayerProps) {
  const { itemType, isDragging, item, currentOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }),
  );

  if (!isDragging || itemType !== ItemTypes.CARD) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 100,
        left: currentOffset?.x ? currentOffset.x - item.mouseOffset.x : 0,
        top: currentOffset?.y ? currentOffset.y - item.mouseOffset.y : 0,
      }}
    >
      {item.draggedCardIds.map((cardId: string) => (
        <Card
          key={cardId}
          card={game.getCard(cardId)}
        />
      ))}
    </div>
  );
}
