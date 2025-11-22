"use client";

import { useState } from "react";
import { Search, Sparkles, Database, Zap } from "lucide-react";

interface NavigationOrbsProps {
  activeZone: number;
  onZoneChange: (zone: number) => void;
}

export default function NavigationOrbs({ activeZone, onZoneChange }: NavigationOrbsProps) {
  const [hoveredZone, setHoveredZone] = useState<number | null>(null);

  const zones = [
    { icon: Search, label: "SEARCH", color: "cyan" },
    { icon: Sparkles, label: "AI ENGINE", color: "purple" },
    { icon: Database, label: "STORAGE", color: "green" },
    { icon: Zap, label: "FEATURES", color: "yellow" },
  ];

  const getOrbPosition = (index: number) => {
    const positions = [
      "bottom-32 left-32",
      "bottom-32 right-32",
      "top-32 left-32",
      "top-32 right-32",
    ];
    return positions[index];
  };

  return (
    <>
      {zones.map((zone, index) => {
        const Icon = zone.icon;
        const isActive = activeZone === index;
        const isHovered = hoveredZone === index;

        return (
          <div
            key={index}
            className={`fixed ${getOrbPosition(index)} z-40 cursor-pointer transition-all duration-300 ${
              isActive ? "scale-125" : "scale-100 opacity-70 hover:opacity-100"
            }`}
            onClick={() => onZoneChange(index)}
            onMouseEnter={() => setHoveredZone(index)}
            onMouseLeave={() => setHoveredZone(null)}
          >
            {/* Outer Rings */}
            {isActive && (
              <>
                <div className={`absolute inset-0 border-2 border-${zone.color}-500 rounded-full animate-ping opacity-50`} />
                <div className={`absolute inset-0 border border-${zone.color}-400 rounded-full animate-pulse`} />
              </>
            )}

            {/* Main Orb */}
            <div
              className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? `bg-${zone.color}-500/30 border-2 border-${zone.color}-400 shadow-[0_0_40px_rgba(0,255,255,0.6)]`
                  : `bg-black/50 border border-${zone.color}-500/50 backdrop-blur-xl`
              }`}
            >
              {/* Icon */}
              <Icon
                className={`w-8 h-8 transition-all duration-300 ${
                  isActive ? `text-${zone.color}-400` : `text-${zone.color}-500`
                }`}
                style={{
                  filter: isActive ? `drop-shadow(0 0 10px currentColor)` : "none",
                }}
              />

              {/* Data Streams */}
              {isActive && (
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-full h-px bg-gradient-to-r from-transparent via-${zone.color}-400 to-transparent`}
                      style={{
                        top: `${50 + Math.sin((i / 8) * Math.PI * 2) * 40}%`,
                        left: `${50 + Math.cos((i / 8) * Math.PI * 2) * 40}%`,
                        transform: `rotate(${(i / 8) * 360}deg)`,
                        animation: `orbit ${2 + i * 0.2}s linear infinite`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Label */}
            {(isActive || isHovered) && (
              <div
                className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
                  isActive ? "opacity-100" : "opacity-70"
                }`}
              >
                <div className={`px-3 py-1 bg-black/80 border border-${zone.color}-500/50 rounded text-xs font-mono text-${zone.color}-400 tracking-wider`}>
                  {zone.label}
                  {isActive && <span className="ml-2 inline-block w-1 h-3 bg-current animate-blink" />}
                </div>
              </div>
            )}

            {/* Particle Effect */}
            {isActive && (
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-1 h-1 bg-${zone.color}-400 rounded-full`}
                    style={{
                      top: "50%",
                      left: "50%",
                      animation: `particle-burst ${1 + Math.random()}s ease-out infinite`,
                      animationDelay: `${Math.random() * 2}s`,
                      transform: `rotate(${(i / 20) * 360}deg) translateX(0)`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Connecting Lines */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-30 opacity-20">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#00ffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ff00ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {activeZone !== null && (
          <>
            <line
              x1="10%"
              y1="90%"
              x2="90%"
              y2="90%"
              stroke="url(#line-gradient)"
              strokeWidth="1"
              className="animate-dash"
            />
            <line
              x1="10%"
              y1="10%"
              x2="90%"
              y2="10%"
              stroke="url(#line-gradient)"
              strokeWidth="1"
              className="animate-dash"
            />
            <line
              x1="10%"
              y1="10%"
              x2="10%"
              y2="90%"
              stroke="url(#line-gradient)"
              strokeWidth="1"
              className="animate-dash"
            />
            <line
              x1="90%"
              y1="10%"
              x2="90%"
              y2="90%"
              stroke="url(#line-gradient)"
              strokeWidth="1"
              className="animate-dash"
            />
          </>
        )}
      </svg>

      <style jsx>{`
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(30px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(30px) rotate(-360deg);
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

        @keyframes particle-burst {
          0% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(40px) scale(0);
            opacity: 0;
          }
        }

        @keyframes dash {
          0% {
            stroke-dasharray: 0, 1000;
          }
          100% {
            stroke-dasharray: 1000, 0;
          }
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }

        .animate-dash {
          stroke-dasharray: 10, 10;
          animation: dash 20s linear infinite;
        }
      `}</style>
    </>
  );
}
