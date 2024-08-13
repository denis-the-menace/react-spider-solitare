import { Card as CardType, Game } from "./Game";
import CardArea from "./CardArea";
import Card from "./Card";

interface StockProps {
  cards: CardType[];
  game: Game;
}

export default function Stock({ cards, game }: StockProps) {
  const stock = cards.filter(
    (card) => card.position.x === 0 && card.position.y === 0,
  );

  const handleLeftClick = () => {
    game.dealStockCards(stock);
  };

  return (
    <div className="mt-1 lg:mt-2 lg:ml-3">
      <CardArea
        key={`${0}-${0}`}
        x={0}
        y={0}
        cards={stock}
        game={game}
        onClick={handleLeftClick}
      ></CardArea>
    </div>
  );
}
