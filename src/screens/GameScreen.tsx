import PauseMenu from "./components/ui/PauseMenu";

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

  return (
    <div>
      <div style={{ position: "relative" }}>
        <button
          style={{ position: "absolute", top: "10px", right: "10px" }}
          onClick={pauseGame}
        >
          Pause
        </button>
        <div>
          {/* Your game implementation goes here */}
          <p>Game content...</p>
        </div>
      </div>

      {gamePaused && (
        <PauseMenu continueGame={continueGame} exitGame={handleExit} />
      )}
    </div>
  );
}
