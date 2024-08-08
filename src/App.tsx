import { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";

export default function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gamePaused, setGamePaused] = useState<boolean>(false);

  const startGame = () => setGameStarted(true);
  const exitGame = () => setGameStarted(false);
  const pauseGame = () => setGamePaused(true);
  const continueGame = () => setGamePaused(false);

  return (
    <main className="container h-full mx-auto flex justify-center items-start mt-8 max-w-[1600px]">
      {1 ? (
        <GameScreen
          gamePaused={gamePaused}
          pauseGame={pauseGame}
          continueGame={continueGame}
          exitGame={exitGame}
        />
      ) : (
        <HomeScreen startGame={startGame} />
      )}
    </main>
  );
}
