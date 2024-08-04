interface PauseMenuProps {
  continueGame: () => void;
  exitGame: () => void;
}

export default function PauseMenu({ continueGame, exitGame }: PauseMenuProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h2>Game Paused</h2>
        <button onClick={continueGame}>Continue Game</button>
        <button onClick={exitGame}>Exit Game</button>
      </div>
    </div>
  );
}
