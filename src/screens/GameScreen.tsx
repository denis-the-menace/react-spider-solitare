import { useMemo } from "react";
import PauseMenu from "../components/ui/PauseMenu";
import { Game } from "../components/Game";
import Board from "../components/Board";

interface GameScreenProps {
  gamePaused: boolean;
  pauseGame: () => void;
  continueGame: () => void;
  exitGame: () => void;
}

export default function GameScreen({
  gamePaused,
  pauseGame,
  continueGame,
  exitGame,
}: GameScreenProps) {
  const handleExit = () => {
    exitGame();
    continueGame();
  };

  const game = useMemo(() => new Game(), []);

  return (
    <div className="bg-green-700 w-full">
      <div style={{ position: "relative" }}>
        <Board game={game} />
      </div>

      {gamePaused && (
        <PauseMenu continueGame={continueGame} exitGame={handleExit} />
      )}
    </div>
  );
}
