import React from "react";
import Draggable from "react-draggable";

type CardProps = {
  id: string;
  src: string;
  alt: string;
  isMovable: boolean;
  position: { x: number; y: number };
  onDrag: (e: any, data: { x: number; y: number }) => void;
  onStop: (e: any, data: { x: number; y: number }) => void;
};

export default function Card({ id, src, alt, isMovable, position, onDrag, onStop }: CardProps) {
  return (
    <Draggable
      disabled={!isMovable}
      handle=".card-handle"
      position={position}
      onDrag={onDrag}
      onStop={onStop}
    >
      <div
        className="card-handle relative w-36 h-48 cursor-grab active:cursor-grabbing"
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover pointer-events-none" 
          draggable={false}
        />
      </div>
    </Draggable>
  );
}
