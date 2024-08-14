interface PauseMenuProps {
  continueGame: () => void;
  exitGame: () => void;
}

export default function PauseMenu({ continueGame, exitGame }: PauseMenuProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[999]">
      <div className="bg-white p-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Game Paused</h2>
        <button
          onClick={continueGame}
          className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded mb-4"
        >
          Continue
        </button>
        <br />
        <button
          onClick={exitGame}
          className="bg-red-500 hover:bg-red-700 w-full text-white font-bold py-2 px-4 rounded"
        >
          Exit
        </button>
      </div>
    </div>
  );
}
