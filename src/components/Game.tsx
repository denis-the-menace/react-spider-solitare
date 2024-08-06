import { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { initializeDeck } from "../slices/cardSlice";
import Foundation from "./Foundation";
import Stock from "./Stock";
import Tableau from "./Tableau";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Game() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeDeck());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-10 grid-rows-2 gap-4 h-full">
        <Stock />
        <Foundation />
        <div className="col-span-10 row-span-1">
          <Tableau />
        </div>
      </div>
    </DndProvider>
  );
}
