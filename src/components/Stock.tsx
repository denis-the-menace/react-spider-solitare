import { Card as CardType, Game } from "./Game";
import CardArea from "./CardArea";
import Card from "./Card";

interface StockProps {
  cards: CardType[];
  game: Game;
}

export default function Stock({ cards, game }: StockProps) {
  return (
    <div className="grid grid-cols-2 gap-2 h-full place-items-center">
      <CardArea key={`${0}-${0}`} x={0} y={0} game={game}>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </CardArea>
      <CardArea x={1} y={0} game={game} />
    </div>
  );
}
