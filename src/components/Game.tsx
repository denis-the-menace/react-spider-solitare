import { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { initializeDeck } from "../slices/cardSlice";
import Foundation from "./Foundation";
import Stock from "./Stock";
import Tableau from "./Tableau";

export default function Game() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeDeck());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-10 grid-rows-2 gap-4 h-full">
      <Stock />
      <Foundation />
      <div className="col-span-10 row-span-1">
        <Tableau />
      </div>
    </div>
  );
}
