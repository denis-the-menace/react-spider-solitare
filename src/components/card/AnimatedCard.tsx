import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Card as CardType } from "@/GameState";

interface AnimatedCardProps {
  card: CardType;
  startPos: { x: number; y: number };
  endPos: { x: number; y: number };
  index: number;
  onAnimationComplete: () => void;
}

export default function AnimatedCard({
  card,
  startPos,
  endPos,
  index,
  onAnimationComplete,
}: AnimatedCardProps) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: endPos.x,
      y: endPos.y,
      transition: {
        damping: 12,
        stiffness: 100,
        delay: index * 0.1,
        duration: 1,
      },
    });
  }, [controls, endPos.x, endPos.y, index]);

  return (
    <motion.div
      initial={{ x: startPos.x, y: startPos.y }}
      animate={controls}
      onAnimationComplete={index === 9 ? onAnimationComplete : undefined}
      className={`fixed top-0 left-0 border-black border-2 border-x-[5px] rounded-lg w-[4.5rem] h-[6rem] md:w-[6rem] md:h-[8rem] lg:w-[7rem] lg:h-[10rem] xl:w-[8rem] xl:h-[12rem] select-none`}
      style={{
        zIndex: 9999 + index,
      }}
    >
      <img
        src={card.faceUp ? card.src : "cards/back_1.png"}
        alt={card.faceUp ? card.alt : "back"}
        className="w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
    </motion.div>
  );
}
