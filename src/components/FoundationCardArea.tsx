import type { ReactNode } from "react";
import { ItemTypes, Game } from "./Game";
import { useDrop } from "react-dnd";

interface FoundationCardAreaProps {
  x: number;
  y: number;
  children?: ReactNode;
  game: Game;
}

export default function FoundationCardArea({
  x,
  y,
  children,
  game,
}: FoundationCardAreaProps) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: (item: { id: string }) => {
        game.moveCard(item.id, x, y);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [game],
  );

  return (
    <div
      ref={drop}
      className={`w-32 h-48 flex items-center justify-center relative ${isOver ? "bg-lightblue" : "bg-gray-900"
        } transition-colors duration-300 border border-gray-300 shadow-md`}
      style={{
        gridColumnStart: x + 1,
        gridRowStart: y + 1,
      }}
    >
      {children ? (
        children
      ) : (
        <p className="text-3xl text-white">
          {x === 1 ? "♠" : x === 2 ? "♣" : x === 3 ? "♦" : "♥"}
        </p>
      )}
    </div>
  );
}
