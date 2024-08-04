import Foundation from "./Foundation";
import Stock from "./Stock";
import Tableau from "./Tableau";

type Props = {};

export default function Game({ }: Props) {
  return (
    <div className="grid grid-cols-10 gap-4">
      <Stock />
      <Foundation />
      <Tableau />
    </div>
  );
}
