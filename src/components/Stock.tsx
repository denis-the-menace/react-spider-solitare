import { useAppSelector } from "../hooks";
import Card from "./Card";
import { Card as CardType } from "../slices/cardSlice";

export default function Stock() {
  const cards = useAppSelector((state) => state.cards.stock);

  return <div className="col-span-2 row-span-1"></div>; // Render the array of cards
}
