import { Card as CardType, Game } from "./Game";
import CardArea from "./CardArea";

interface TableauProps {
  cards: CardType[];
  game: Game;
}

export default function Tableau({ cards, game }: TableauProps) {
  const renderCardArea = (i: number) => {
    const x = i;
    const y = 1;

    const cardsInArea = cards.filter(
      (card) => card.position.x === x && card.position.y === y,
    );

    return (
      <CardArea
        key={`${x}-${y}`}
        x={x}
        y={y}
        game={game}
        cards={cardsInArea}
      ></CardArea>
    );
  };

  const cardAreas = Array.from({ length: 10 }, (_, i) => renderCardArea(i));

  return (
    <div className="grid grid-cols-10 gap-2 place-items-center">
      {cardAreas}
    </div>
  );
}
