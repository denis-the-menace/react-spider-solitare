import { Card as CardType, Game } from "./Game";
import FoundationCardArea from "./FoundationCardArea";

interface FoundationProps {
  cards: CardType[];
  game: Game;
}

export default function Foundation({ cards, game }: FoundationProps) {
  const renderCardArea = (i: number) => {
    const x = i + 1;
    const y = 0;

    const foundation = cards.filter(
      (card) => card.position.x === x && card.position.y === y,
    );

    return (
      <FoundationCardArea
        key={`foundation-${x}-${y}`}
        x={x}
        y={y}
        cards={foundation}
        game={game}
      ></FoundationCardArea>
    );
  };

  const cardAreas = Array.from({ length: 8 }, (_, i) => renderCardArea(i));

  return (
    <div className="grid grid-cols-9 gap-2 place-items-center">{cardAreas}</div>
  );
}
