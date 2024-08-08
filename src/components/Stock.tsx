import { Card as CardType, Game } from "./Game";
import CardArea from "./CardArea";
import Card from "./Card";

interface StockProps {
  cards: CardType[];
  game: Game;
}

export default function Stock({ cards, game }: StockProps) {
  const stock = cards.filter(
    (card) =>
      (card.position.x === 0 && card.position.y === 0) ||
      (card.position.x === 1 && card.position.y === 0),
  );

  const handleLeftClick = () => {
    game.dealStockCards(stock);
  };

  return (
    <div className="grid grid-cols-2 gap-2 h-full place-items-center">
      <CardArea
        key={`${0}-${0}`}
        x={0}
        y={0}
        game={game}
        onClick={handleLeftClick}
      >
        {stock.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </CardArea>
    </div>
  );
}
