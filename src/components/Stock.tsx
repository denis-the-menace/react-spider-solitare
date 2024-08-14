import { Card as CardType, Game } from "./Game";
import CardArea from "./CardArea";

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

  const renderEmptyCards = () => {
    const noOfEmptyCards = Math.ceil(stock.length / 10);
    return Array.from({ length: noOfEmptyCards }, (_, index) => (
      <div
        key={`empty-${index}`}
        className={`lg:ml-3 border-black border-2 border-x-[5px] rounded-lg absolute w-[4.5rem] h-[6rem] md:w-[6rem] md:h-[8rem] lg:w-[7rem] lg:h-[10rem] xl:w-[8rem] xl:h-[12rem] select-none cursor-pointer`}
        style={{
          zIndex: index,
          left: `${index}rem`,
          transition: "top 0.5s ease, left 0.5s ease",
        }}
        onClick={handleLeftClick}
      >
        <img
          src="cards/back1.png"
          alt="back"
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
      </div>
    ));
  };

  return (
    <div className="mt-1 lg:mt-2 2xl:ml-3">
      {renderEmptyCards()}
      <CardArea
        key={`${0}-${0}`}
        x={0}
        y={0}
        cards={[]}
        game={game}
        onClick={handleLeftClick}
      ></CardArea>
    </div>
  );
}
