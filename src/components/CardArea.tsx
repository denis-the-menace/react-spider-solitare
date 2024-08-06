import { ItemTypes } from "./Card";
import { useDrop } from "react-dnd";

export default function CardArea({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children?: React.ReactElement;
}) {
  const moveCard = (x: number, y: number) => {
    console.log("Move card", x, y);
  };

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.card,
      drop: () => moveCard(x, y),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [x, y],
  );

  return (
    <div
      ref={drop}
      className={`${isOver ? "bg-yellow-500" : "bg-black"} relative w-30 h-48`}
      style={{
        gridColumn: `${x} / span 1`,
        gridRow: `${y} / span 1`,
        // gridColumn: `${card.position.x + 1} / span 1`,
        // gridRow: `${card.position.y + 1} / span 1`,
      }}
    >
      {children}
    </div>
  );
}
