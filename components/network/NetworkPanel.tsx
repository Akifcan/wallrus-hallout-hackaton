"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface NetworkPanelProps {
  isOpen: boolean;
  title: string;
  description: string;
  metrics: Array<{ label: string; value: string }>;
  details: string[];
  color: string;
  onClose: () => void;
}

export default function NetworkPanel({
  isOpen,
  title,
  description,
  metrics,
  details,
  color,
  onClose,
}: NetworkPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg z-50 bg-gradient-to-br from-slate-900 to-slate-800 border-l border-white/10 shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div
              className="p-8 border-b border-white/10"
              style={{
                background: `linear-gradient(135deg, ${color}20, transparent)`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-16 h-1 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              <h2
                className="text-4xl font-bold mb-3"
                style={{ color }}
              >
                {title}
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">{description}</p>
            </div>

            {/* Metrics */}
            <div className="p-8 border-b border-white/10">
              <div className="grid grid-cols-3 gap-4">
                {metrics.map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center"
                  >
                    <div
                      className="text-3xl font-bold mb-1"
                      style={{ color }}
                    >
                      {metric.value}
                    </div>
                    <div className="text-xs text-white/50 uppercase tracking-wider">
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Key Features</h3>
              <div className="space-y-4">
                {details.map((detail, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-3 group"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors">
                      {detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Glow effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: `inset 0 0 100px ${color}10`,
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
