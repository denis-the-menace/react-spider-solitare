interface HomeScreenProps {
  startGame: (suits: number) => void;
}

export default function HomeScreen({ startGame }: HomeScreenProps) {
  return (
    <div className="flex flex-col justify-center items-center h-4/5 text-white">
      <h1 className="text-3xl lg:text-6xl font-bold mb-10">Welcome to Spider Solitaire</h1>
      <div className="flex justify-center items-center gap-8">
        <div
          className="flex flex-col items-center p-6 bg-white text-black rounded-lg shadow-lg hover:bg-gray-100 cursor-pointer"
          onClick={() => startGame(1)}
        >
          <p className="text-2xl font-semibold">One Suit</p>
        </div>
        <div
          className="flex flex-col items-center p-6 bg-white text-black rounded-lg shadow-lg hover:bg-gray-100 cursor-pointer"
          onClick={() => startGame(2)}
        >
          <p className="text-2xl font-semibold">Two Suits</p>
        </div>
        <div
          className="flex flex-col items-center p-6 bg-white text-black rounded-lg shadow-lg hover:bg-gray-100 cursor-pointer"
          onClick={() => startGame(4)}
        >
          <p className="text-2xl font-semibold">Four Suits</p>
        </div>
      </div>
    </div>
  );
}
