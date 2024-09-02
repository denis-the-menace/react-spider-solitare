import { Card as CardType, GameState } from "@/GameState";
import CardArea from "@/components/card/CardArea";

interface TableauProps {
  cards: CardType[];
  game: GameState;
}

export default function Tableau({ cards, game }: TableauProps) {
  const renderCardArea = (i: number) => {
    const x = i;
    const y = 1;
    const cardsInArea = cards.filter(
      (card) => card.position.x === x && card.position.y === y,
    );
    // console.log(x);
    return (
      <div key={`tableau-${x}-${y}`} className={`tableau-area-${x}`}>
        <CardArea x={x} y={y} game={game} cards={cardsInArea} />
      </div>
    );
  };
  const cardAreas = Array.from({ length: 10 }, (_, i) => renderCardArea(i));
  return (
    <div className="grid grid-cols-10 gap-2 place-items-center">
      {cardAreas}
    </div>
  );
}
