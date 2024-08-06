import { useAppSelector } from "../hooks";
import CardArea from "./CardArea";
import Card from "./Card";
import { Card as CardType } from "../slices/cardSlice";

export default function Tableau() {
  const cards = useAppSelector((state) => state.cards.tableau);

  return (
    <div className="grid grid-cols-10 gap-2 h-full">
      {Array.from({ length: 10 }, (_, i) =>
        i === 0 ? (
          <CardArea key={i} x={i} y={2}>
            <Card
              id="tableau"
              src="cards/hearts_2.png"
              alt="Card back"
              isMovable={false}
            />
          </CardArea>
        ) : (
          <CardArea key={i} x={i} y={2} />
        ),
      )}
    </div>
  );
}

// {cards.map((card: CardType, index: number) => (
//   <div
//     key={card.id}
//     className="relative"
//     style={{
//       gridColumn: `${card.position.x + 1} / span 1`,
//       gridRow: `${card.position.y + 1} / span 1`,
//     }}
//   >
//     <Card
//       id={card.id}
//       src={card.src}
//       alt={card.alt}
//       isMovable={true}
//       style={{
//         zIndex: index,
//       }}
//     />
//   </div>
// ))}
