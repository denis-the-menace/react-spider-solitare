import { useMemo, useState } from "react";
import PauseMenu from "@/screens/PauseMenu";
import { GameState } from "@/GameState";
import Board from "@/components/board/Board";
import Preloader from "./Preloader";

interface GameScreenProps {
  numSuits: number | null;
  gamePaused: boolean;
  pauseGame: () => void;
  continueGame: () => void;
  exitGame: () => void;
  setHandleUndo: (handleUndo: () => void) => void;
}

export default function GameScreen({
  numSuits,
  gamePaused,
  continueGame,
  exitGame,
  setHandleUndo,
}: GameScreenProps) {
  const handleExit = () => {
    exitGame();
    continueGame();
  };
  const [isLoading, setIsLoading] = useState(true);
  const game = useMemo(() => new GameState(numSuits ?? 1), [numSuits]);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full lg:h-5/6 relative">
      {isLoading ? (
        <Preloader game={game} onLoadComplete={handleLoadComplete} />
      ) : (
        <>
          <Board game={game} setHandleUndo={setHandleUndo} />
          {gamePaused && (
            <PauseMenu continueGame={continueGame} exitGame={handleExit} />
          )}
        </>
      )}
    </div>
  );
}
