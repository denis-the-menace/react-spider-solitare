import { useState, useEffect } from "react";

// Define types for the props
interface PreloaderProps {
  game: {
    cards: { src: string }[];
  };
  onLoadComplete: () => void;
}

export default function Preloader({ game, onLoadComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const cardImages: string[] = [
      ...game.cards.map((card) => card.src),
      "cards/back_1.png",
    ];
    let loadedImages = 0;

    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedImages++;
          setProgress((loadedImages / cardImages.length) * 100);
          resolve();
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    Promise.all(cardImages.map(preloadImage))
      .then(() => {
        onLoadComplete();
      })
      .catch((error) => {
        console.error("Failed to load all images:", error);
        // Handle the error, possibly with retry logic or user notification
      });
  }, [game.cards, onLoadComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h2 className="text-2xl font-bold mb-4">Shuffling the Deck</h2>
      <progress value={Math.round(progress)} max={100} className="w-64 border-2 border-white" />
      <p className="mt-2">{Math.round(progress)}%</p>
    </div>
  );
}
