"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

interface InfoCardProps {
  title: string;
  subtitle: string;
  content: string[];
  color: string;
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
}

export default function InfoCard({
  title,
  subtitle,
  content,
  color,
  isOpen,
  onClose,
  position,
}: InfoCardProps) {
  if (!isOpen) return null;

  // Calculate card position to avoid screen edges
  const cardWidth = 400;
  const cardHeight = 500;
  const padding = 20;

  let left = position.x + 40;
  let top = position.y - cardHeight / 2;

  // Adjust if card goes off-screen
  if (left + cardWidth > window.innerWidth - padding) {
    left = position.x - cardWidth - 40;
  }
  if (top < padding) {
    top = padding;
  }
  if (top + cardHeight > window.innerHeight - padding) {
    top = window.innerHeight - cardHeight - padding;
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed z-50"
        style={{
          left: `${left}px`,
          top: `${top}px`,
          width: `${cardWidth}px`,
        }}
      >
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Header */}
          <div
            className="p-6 border-b border-white/10"
            style={{
              background: `linear-gradient(135deg, ${color}20, transparent)`,
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-12 h-1 rounded-full"
                style={{ backgroundColor: color }}
              />
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            <h2
              className="text-3xl font-bold mb-2"
              style={{ color }}
            >
              {title}
            </h2>
            <p className="text-white/60 text-sm">{subtitle}</p>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[400px] overflow-y-auto custom-scrollbar">
            <div className="space-y-4">
              {content.map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-white/80 leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Decorative elements */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: color }}
                />
                <span className="text-white/40 text-xs font-mono">
                  RESEARCH_NODE_ACTIVE
                </span>
              </div>
            </div>
          </div>

          {/* Glow effect */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: `inset 0 0 60px ${color}20, 0 0 40px ${color}30`,
            }}
          />
        </div>

        {/* Connection line to star */}
        <svg className="absolute inset-0 pointer-events-none -z-10">
          <line
            x1={position.x - left}
            y1={position.y - top}
            x2={20}
            y2={cardHeight / 2}
            stroke={color}
            strokeWidth="2"
            strokeOpacity="0.4"
            strokeDasharray="5,5"
          />
        </svg>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </>
  );
}
