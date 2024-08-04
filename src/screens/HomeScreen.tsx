interface HomeScreenProps {
  startGame: () => void;
}

export default function HomeScreen({ startGame }: HomeScreenProps) {
  return (
    <div>
      <h1>Welcome to Spider Solitaire</h1>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}
