"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

interface FloatingTerminalProps {
  title: string;
  content: string[];
  position: "left" | "right" | "center" | "top";
  isActive: boolean;
  glitchText?: string;
}

export default function FloatingTerminal({
  title,
  content,
  position,
  isActive,
  glitchText = "DocScout",
}: FloatingTerminalProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  const positionClasses = {
    left: "left-8 top-1/2 -translate-y-1/2",
    right: "right-8 top-1/2 -translate-y-1/2",
    center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    top: "left-1/2 top-20 -translate-x-1/2",
  };

  useEffect(() => {
    if (isActive && currentLineIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, content[currentLineIndex]]);
        setCurrentLineIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isActive, currentLineIndex, content]);

  useEffect(() => {
    if (!isActive) {
      setDisplayedLines([]);
      setCurrentLineIndex(0);
    }
  }, [isActive]);

  useEffect(() => {
    if (terminalRef.current && isActive) {
      gsap.fromTo(
        terminalRef.current,
        {
          scale: 0.8,
          opacity: 0,
          rotateX: -10,
        },
        {
          scale: 1,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      ref={terminalRef}
      className={`fixed ${positionClasses[position]} z-50 w-[500px] max-w-[90vw]`}
      style={{ perspective: "1000px" }}
    >
      {/* Terminal Window */}
      <div className="bg-black/90 backdrop-blur-xl border-2 border-cyan-500/50 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.3)]">
        {/* Terminal Header */}
        <div className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 px-4 py-2 border-b border-cyan-500/30 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-cyan-400 font-mono text-sm glitch-text" data-text={title}>
              {title}
            </span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm min-h-[300px] max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Glitch Title */}
          <div className="mb-4">
            <h2 className="text-3xl font-bold glitch-text text-cyan-400" data-text={glitchText}>
              {glitchText}
            </h2>
            <div className="h-px bg-gradient-to-r from-cyan-500 via-purple-500 to-transparent mt-2 animate-scan" />
          </div>

          {/* Typed Content */}
          {displayedLines.map((line, i) => (
            <div key={i} className="mb-2 flex gap-2 animate-fade-in">
              <span className="text-cyan-500">{">"}</span>
              <span className="text-green-400">{line}</span>
              {i === displayedLines.length - 1 && (
                <span className="inline-block w-2 h-4 bg-cyan-400 animate-blink" />
              )}
            </div>
          ))}

          {/* Data Stream Effect */}
          <div className="mt-6 opacity-30">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="text-cyan-500/30 text-xs mb-1 animate-data-stream">
                {Array.from({ length: 60 })
                  .map(() => Math.random().toString(36)[2])
                  .join("")}
              </div>
            ))}
          </div>
        </div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none animate-scan-line" />
      </div>

      {/* Holographic Edge Glow */}
      <div className="absolute inset-0 border-2 border-cyan-400/20 rounded-lg blur-xl pointer-events-none" />

      <style jsx>{`
        .glitch-text {
          position: relative;
          animation: glitch 2s infinite;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
        }

        .glitch-text::before {
          animation: glitch-before 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
          color: #00ffff;
          z-index: -1;
        }

        .glitch-text::after {
          animation: glitch-after 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
          color: #ff00ff;
          z-index: -2;
        }

        @keyframes glitch {
          0%,
          100% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
        }

        @keyframes glitch-before {
          0%,
          100% {
            clip-path: inset(0 0 0 0);
          }
          20% {
            clip-path: inset(20% 0 60% 0);
          }
          40% {
            clip-path: inset(40% 0 20% 0);
          }
          60% {
            clip-path: inset(60% 0 40% 0);
          }
          80% {
            clip-path: inset(10% 0 70% 0);
          }
        }

        @keyframes glitch-after {
          0%,
          100% {
            clip-path: inset(0 0 0 0);
          }
          20% {
            clip-path: inset(60% 0 20% 0);
          }
          40% {
            clip-path: inset(20% 0 40% 0);
          }
          60% {
            clip-path: inset(40% 0 60% 0);
          }
          80% {
            clip-path: inset(70% 0 10% 0);
          }
        }

        @keyframes scan {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes data-stream {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes scan-line {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .animate-scan {
          animation: scan 1s ease-out forwards;
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-data-stream {
          animation: data-stream 5s linear infinite;
        }

        .animate-scan-line {
          animation: scan-line 8s linear infinite;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 255, 255, 0.1);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 255, 0.5);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 255, 0.7);
        }
      `}</style>
    </div>
  );
}
