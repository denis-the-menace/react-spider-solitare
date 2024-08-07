import { Card as CardType, Game } from "./Game";
import CardArea from "./CardArea";
import Card from "./Card";

interface TableauProps {
  cards: CardType[];
  game: Game;
}

export default function Tableau({ cards, game }: TableauProps) {
  // Render 10 card areas for the tableau
  const renderCardArea = (i: number) => {
    const x = i; // Column index
    const y = 2; // Row index (for simplicity, let's assume all cards start in row 0 initially)

    // Filter the cards that belong to this CardArea
    const cardsInArea = cards.filter(
      (card) => card.position.x === x && card.position.y === y
    );

    return (
      <CardArea key={x} x={x} y={y} game={game}>
        {cardsInArea.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </CardArea>
    );
  };

  // Generate the 10 card areas
  const cardAreas = Array.from({ length: 10 }, (_, i) => renderCardArea(i));

  return (
    <div className="grid grid-cols-10 gap-2 h-full p-4">
      {cardAreas}
    </div>
  );
}
