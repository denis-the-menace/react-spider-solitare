import { useMemo } from "react";
import PauseMenu from "../components/ui/PauseMenu";
import { Game } from "../components/Game";
import Board from "../components/Board";

interface GameScreenProps {
  startGame: (suits: number) => void;
  gamePaused: boolean;
  pauseGame: () => void;
  continueGame: () => void;
  exitGame: () => void;
}

export default function GameScreen({
  startGame,
  gamePaused,
  pauseGame,
  continueGame,
  exitGame,
}: GameScreenProps) {
  const handleExit = () => {
    exitGame();
    continueGame();
  };

  const game = useMemo(() => new Game(startGame), []);

  return (
    <div className="w-full">
      <div style={{ position: "relative" }}>
        <Board game={game} />
      </div>

      {gamePaused && (
        <PauseMenu continueGame={continueGame} exitGame={handleExit} />
      )}
    </div>
  );
}
