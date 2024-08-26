import { ItemTypes, GameState, Card as CardType } from "@/GameState";
import { useDrop } from "react-dnd";
import CardStack from "./CardStack";

interface CardAreaProps {
  x: number;
  y: number;
  cards: CardType[];
  game: GameState;
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
      drop: (item: { draggedCardIds: string[] }) => {
        item.draggedCardIds.length === 1
          ? game.moveCard(item.draggedCardIds[0], x, y)
          : game.moveStack(item.draggedCardIds, x, y);
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
      className={`w-[4.5rem] h-[6rem] md:w-[6rem] md:h-[8rem] lg:w-[7rem] lg:h-[10rem] xl:w-[8rem] xl:h-[12rem] relative ${
        isOver ? "bg-lightblue" : "bg-transparent"
      } transition-colors duration-300`}
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
