import { useEffect, useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import LandscapeWarningScreen from "./screens/LandscapeWarningScreen";

export default function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gamePaused, setGamePaused] = useState<boolean>(false);
  const [numSuits, setNumSuits] = useState<number | null>(null);
  const [isLandscape, setIsLandscape] = useState<boolean>(
    window.innerWidth > window.innerHeight,
  );
  const [handleUndo, setHandleUndo] = useState<(() => void) | null>(null);

  // const startGame = (suits: number) => {
  //   setNumSuits(suits);
  //   setGameStarted(true);
  // };
  const startGame = (suits: number) => {
    setNumSuits(1);
    setGameStarted(true);
  };

  const exitGame = () => setGameStarted(false);
  const pauseGame = () => setGamePaused(!gamePaused);
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
        <LandscapeWarningScreen />
      ) : (
        <>
          <main
            className="container h-full mx-auto flex flex-col justify-between items-start mt-8 max-w-[1600px]"
            style={{ display: isLandscape ? "block" : "none" }}
          >
            {true ? (
              <GameScreen
                numSuits={numSuits}
                gamePaused={gamePaused}
                pauseGame={pauseGame}
                continueGame={continueGame}
                exitGame={exitGame}
                setHandleUndo={setHandleUndo}
              />
            ) : (
              <HomeScreen startGame={startGame} />
            )}
          </main>
          {true && (
            <footer className="absolute w-full bottom-0 flex justify-start p-4 z-[999] gap-4">
              <button
                onClick={pauseGame}
                className="bg-[#D3D3D3] hover:bg-[#A9A9A9] text-black font-bold py-2 px-4 rounded"
              >
                Pause
              </button>
              <button
                className="bg-[#D3D3D3] hover:bg-[#A9A9A9] text-black font-bold py-2 px-4 rounded"
                onClick={() => handleUndo && handleUndo()}
              >
                Undo
              </button>
            </footer>
          )}
        </>
      )}
    </>
  );
}
