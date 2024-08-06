import React from "react";
import { useAppSelector } from "../hooks";
import Card from "./Card";
import CardArea from "./CardArea";

export default function Tableau() {
  const cards = useAppSelector((state) => state.cards.tableau);

  return (
    <div className="grid grid-cols-10 gap-2 h-full">
      {cards.map((card) => (
        <CardArea
          key={card.id}
          x={card.position.x * 128}
          y={card.position.y * 192}
          cards={[card]}
        />
      ))}
    </div>
  );
}
