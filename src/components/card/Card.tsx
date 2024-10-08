import { Card as CardType } from "@/GameState";

interface CardProps {
  card: CardType;
  onCardClick?: (clickedCardId: string) => void;
  isDragging?: boolean;
}

export default function Card({ card, onCardClick, isDragging }: CardProps) {
  const isMobile = window.matchMedia("(pointer: coarse)").matches;

  const handleCardClick = () => {
    if (!onCardClick) return;
    card.faceUp || card.id === "0" ? onCardClick(card.id) : null;
  };

  return (
    <div
      className={`${card.faceUp && !isDragging ? "cursor-grab" : ""} ${isDragging ? "opacity-0 cursor-grabbing" : ""} border-black border-2 border-x-[5px] rounded-lg absolute w-[4.5rem] h-[6rem] md:w-[6rem] md:h-[8rem] lg:w-[7rem] lg:h-[10rem] xl:w-[8rem] xl:h-[12rem] select-none`}
      style={{
        zIndex: card.position.z,
        top:
          card.position.y === 0
            ? ""
            : isMobile
              ? `${card.position.z * 20}px`
              : `${card.position.z * 32}px`,
      }}
      {...(isMobile
        ? { onTouchStart: handleCardClick }
        : { onMouseDown: handleCardClick })}
    >
      <img
        src={card.faceUp ? card.src : "cards/back_1.png"}
        alt={card.faceUp ? card.alt : "back"}
        className="w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
    </div>
  );
}
