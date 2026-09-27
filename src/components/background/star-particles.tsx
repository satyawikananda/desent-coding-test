'use client'

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface StarParticlesProps {
  position: "top-right" | "bottom-left";
  delay?: number;
  className?: string;
}

const Star = ({
  size,
  delay,
  x,
  y,
}: {
  size: number;
  delay: number;
  x: number;
  y: number;
}) => (
  <motion.div
    className="absolute"
    style={{ left: `${x}%`, top: `${y}%` }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0.5, 1, 0],
      scale: [0, 1, 0.8, 1, 0],
    }}
    transition={{
      duration: 2.5,
      repeat: Number.POSITIVE_INFINITY,
      delay: delay,
      ease: "easeInOut",
    }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="text-primary"
    >
      <path
        d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
        fill="currentColor"
      />
    </svg>
  </motion.div>
);

export const StarParticles = ({
  position,
  delay = 0,
  className,
}: StarParticlesProps) => {
  const stars =
    position === "top-right"
      ? [
        { size: 12, delay: delay + 0, x: 70, y: 5 },
        { size: 8, delay: delay + 0.3, x: 85, y: 15 },
        { size: 10, delay: delay + 0.6, x: 95, y: 8 },
        { size: 6, delay: delay + 0.9, x: 78, y: 20 },
        { size: 14, delay: delay + 0.4, x: 92, y: 25 },
      ]
      : [
        { size: 12, delay: delay + 0.2, x: 5, y: 75 },
        { size: 8, delay: delay + 0.5, x: 15, y: 85 },
        { size: 10, delay: delay + 0.8, x: 8, y: 92 },
        { size: 6, delay: delay + 1.1, x: 22, y: 78 },
        { size: 14, delay: delay + 0.6, x: 25, y: 90 },
      ];

  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none overflow-visible",
        className
      )}
    >
      {stars.map((star, index) => (
        <Star key={index} {...star} />
      ))}
    </div>
  );
};
