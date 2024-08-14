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
    <div className="fixed inset-0 pointer-events-none z-50">
      <div
        className={`absolute`}
        style={{
          left: currentOffset?.x ?? 0,
          top: currentOffset?.y ?? 0,
          transform: "translate(-50%, -50%)",
        }}
      >
        {item.draggedCardIds.map((cardId: string, index: number) => (
          <div key={cardId} className={`absolute top-[${index * 32}px] left-0`}>
            <Card card={game.getCard(cardId)} />
          </div>
        ))}
      </div>
    </div>
  );
}
