"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
}

interface ConstellationStar {
  id: number;
  x: number;
  y: number;
  title: string;
  color: string;
  connections: number[];
}

interface StarFieldProps {
  constellationStars: ConstellationStar[];
  activeStarId: number | null;
  onStarClick: (id: number) => void;
}

export default function StarField({ constellationStars, activeStarId, onStarClick }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [backgroundStars, setBackgroundStars] = useState<Star[]>([]);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Generate random background stars
  useEffect(() => {
    const initStars = () => {
      const stars: Star[] = [];
      for (let i = 0; i < 200; i++) {
        stars.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2,
          brightness: Math.random(),
          twinkleSpeed: 0.5 + Math.random() * 2,
        });
      }
      setBackgroundStars(stars);
    };

    // Use setTimeout to avoid synchronous setState
    setTimeout(initStars, 0);
  }, []);

  // Animate background stars
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background stars with twinkling
      backgroundStars.forEach((star) => {
        const twinkle = Math.abs(Math.sin(time * star.twinkleSpeed));
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness * twinkle * 0.8})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, [backgroundStars]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Check if mouse is near a star
  const getNearestStar = (mx: number, my: number): number | null => {
    const threshold = 30;
    for (const star of constellationStars) {
      const distance = Math.sqrt(Math.pow(star.x - mx, 2) + Math.pow(star.y - my, 2));
      if (distance < threshold) {
        return star.id;
      }
    }
    return null;
  };

  useEffect(() => {
    const updateHoveredStar = () => {
      const nearest = getNearestStar(mousePos.x, mousePos.y);
      setHoveredStar(nearest);
    };

    // Use setTimeout to avoid synchronous setState
    setTimeout(updateHoveredStar, 0);
  }, [mousePos, constellationStars]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-indigo-950 via-blue-950 to-black overflow-hidden">
      {/* Background stars canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Constellation connections (SVG) */}
      <svg className="absolute inset-0 pointer-events-none">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {constellationStars.map((star) =>
          star.connections.map((targetId) => {
            const target = constellationStars.find((s) => s.id === targetId);
            if (!target) return null;

            const isActive =
              activeStarId === star.id ||
              activeStarId === targetId ||
              hoveredStar === star.id ||
              hoveredStar === targetId;

            return (
              <motion.line
                key={`${star.id}-${targetId}`}
                x1={star.x}
                y1={star.y}
                x2={target.x}
                y2={target.y}
                stroke={isActive ? star.color : "#4a5568"}
                strokeWidth={isActive ? 2 : 1}
                strokeOpacity={isActive ? 0.8 : 0.3}
                filter={isActive ? "url(#glow)" : "none"}
                animate={{
                  strokeOpacity: isActive ? [0.6, 1, 0.6] : 0.3,
                }}
                transition={{
                  duration: 2,
                  repeat: isActive ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />
            );
          })
        )}
      </svg>

      {/* Constellation stars */}
      {constellationStars.map((star) => {
        const isActive = activeStarId === star.id;
        const isHovered = hoveredStar === star.id;
        const scale = isActive ? 1.5 : isHovered ? 1.3 : 1;

        return (
          <motion.div
            key={star.id}
            className="absolute cursor-pointer"
            style={{
              left: star.x,
              top: star.y,
              transform: "translate(-50%, -50%)",
            }}
            onClick={() => onStarClick(star.id)}
            whileHover={{ scale: 1.2 }}
            animate={{ scale }}
          >
            {/* Outer glow ring */}
            {(isActive || isHovered) && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  width: 60,
                  height: 60,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  background: `radial-gradient(circle, ${star.color}40, transparent)`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 0.3, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Star core */}
            <div
              className="w-4 h-4 rounded-full relative z-10"
              style={{
                background: `radial-gradient(circle, ${star.color}, ${star.color}99)`,
                boxShadow: `0 0 20px ${star.color}, 0 0 40px ${star.color}80`,
              }}
            >
              {/* Inner sparkle */}
              <motion.div
                className="absolute inset-0 rounded-full bg-white"
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  scale: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Star label on hover */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
              >
                <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                  <span className="text-white text-sm font-medium">{star.title}</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      })}

      {/* Nebula effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
