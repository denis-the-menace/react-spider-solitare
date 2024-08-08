import { Card as CardType, Game } from "./Game";
import CardArea from "./CardArea";

interface FoundationProps {
  game: Game;
}

export default function Foundation({ game }: FoundationProps) {
  const renderCardArea = (i: number) => {
    const x = i + 1;
    const y = 0;

    return (
      <CardArea key={`foundation-${x}-${y}`} x={x} y={y} game={game}></CardArea>
    );
  };

  const cardAreas = Array.from({ length: 8 }, (_, i) => renderCardArea(i));

  return (
    <div className="grid grid-cols-8 gap-2 h-full place-items-center">{cardAreas}</div>
  );
}
