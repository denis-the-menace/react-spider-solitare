import type { ReactNode } from "react";
import { ItemTypes, Card as CardType, Game } from "./Game";
import { useDrop } from "react-dnd";

interface CardAreaProps {
  x: number;
  y: number;
  children?: ReactNode;
  game: Game;
}

export default function CardArea({ x, y, children, game }: CardAreaProps) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      // canDrop: () => true,
      drop: (item: { id: string }) => {
        game.moveCard(item.id, x, y);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        // canDrop: !!monitor.canDrop(),
      }),
    }),
    [game],
  );

  return (
    <div
      ref={drop}
      className={`w-32 h-48 flex items-center justify-center relative ${
        isOver ? "bg-lightblue" : "bg-transparent"
      } transition-colors duration-300 border border-gray-300 shadow-md`}
      style={{
        gridColumnStart: x + 1,
        gridRowStart: y + 1,
      }}
    >
      {children}
    </div>
  );
}
