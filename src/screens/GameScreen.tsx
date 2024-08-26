import { useMemo } from "react";
import PauseMenu from "../components/ui/PauseMenu";
import { Game } from "../components/Game";
import Board from "../components/Board";

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

  const game = useMemo(() => new Game(numSuits ?? 1), [numSuits]);

  return (
    <div className="w-full h-full lg:h-4/5 relative">
      <Board game={game} setHandleUndo={setHandleUndo} />
      {gamePaused && (
        <PauseMenu continueGame={continueGame} exitGame={handleExit} />
      )}
    </div>
  );
}
