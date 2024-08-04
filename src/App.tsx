import { useState } from "react";
import HomeScreen from "./components/screens/HomeScreen";
import GameScreen from "./components/screens/GameScreen";

export default function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gamePaused, setGamePaused] = useState<boolean>(false);

  const startGame = () => setGameStarted(true);
  const exitGame = () => setGameStarted(false);
  const pauseGame = () => setGamePaused(true);
  const continueGame = () => setGamePaused(false);

  return (
    <div>
      {gameStarted ? (
        <GameScreen
          gamePaused={gamePaused}
          pauseGame={pauseGame}
          continueGame={continueGame}
          exitGame={exitGame}
        />
      ) : (
        <HomeScreen startGame={startGame} />
      )}
    </div>
  );
}
