import type { ReactNode } from "react";
import { ItemTypes, Game, Card as CardType } from "./Game";
import { useDrop } from "react-dnd";
import CardStack from "./CardStack";

interface CardAreaProps {
  x: number;
  y: number;
  cards: CardType[];
  game: Game;
  onClick?: () => void;
}

export default function CardArea({
  x,
  y,
  cards,
  game,
  onClick,
}: CardAreaProps) {
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
      className={`w-32 h-48 flex items-center justify-center relative ${
        isOver ? "bg-lightblue" : "bg-transparent"
      } transition-colors duration-300 border border-gray-300 shadow-md`}
      style={{
        gridColumnStart: x + 1,
        gridRowStart: y + 1,
      }}
      onClick={x === 0 && y === 0 ? onClick : undefined}
    >
      <CardStack cards={cards} />
    </div>
  );
}
