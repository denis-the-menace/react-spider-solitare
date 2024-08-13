import { useEffect, useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";

export default function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gamePaused, setGamePaused] = useState<boolean>(false);
  const [isLandscape, setIsLandscape] = useState<boolean>(
    window.innerWidth > window.innerHeight,
  );

  const startGame = () => setGameStarted(true);
  const exitGame = () => setGameStarted(false);
  const pauseGame = () => setGamePaused(true);
  const continueGame = () => setGamePaused(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {!isLandscape ? (
        <div
          className="flex justify-center items-center h-screen bg-black text-white text-xl"
          style={{ display: isLandscape ? "none" : "flex" }}
        >
          Please rotate your device to landscape mode.
        </div>
      ) : (
        <main
          className="container h-full mx-auto flex justify-center items-start mt-8 max-w-[1600px]"
          style={{ display: isLandscape ? "block" : "none" }}
        >
          {true ? (
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
      )}
    </>
  );
}
