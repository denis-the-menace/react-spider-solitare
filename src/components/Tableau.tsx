import { useAppSelector } from '../hooks';
import Card from './Card';
import { Card as CardType } from '../slices/cardSlice';

export default function Tableau() {
  const cards = useAppSelector((state) => state.cards.tableau);

  return (
    <div className="grid grid-cols-10 gap-2 h-full">
      {cards.map((card: CardType, index: number) => (
        <div
          key={card.id}
          className="relative"
          style={{
            gridColumn: `${card.position.x + 1} / span 1`,
            gridRow: `${card.position.y + 1} / span 1`,
          }}
        >
          <Card
            id={card.id}
            src={card.src}
            alt={card.alt}
            isMovable={true}
            style={{
              zIndex: index,
            }}
          />
        </div>
      ))}
    </div>
  );
}

