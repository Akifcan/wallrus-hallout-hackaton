"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HintProps {
  title: string;
  description: string;
  tips?: string[];
}

export default function Hint({ title, description, tips }: HintProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-2 border-black bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-black hover:text-white transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-current flex items-center justify-center">
            <span className="font-mono text-xs font-bold">?</span>
          </div>
          <span className="font-mono text-sm font-bold uppercase tracking-wider">
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="font-mono text-xs font-bold"
        >
          ▼
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t-2 border-black"
          >
            <div className="p-4 space-y-3">
              <p className="font-mono text-xs leading-relaxed text-black/80">
                {description}
              </p>

              {tips && tips.length > 0 && (
                <div className="pt-3 border-t-2 border-black/10">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-black mb-2">
                    Tips:
                  </h4>
                  <ul className="space-y-2">
                    {tips.map((tip, idx) => (
                      <li
                        key={idx}
                        className="font-mono text-xs text-black/70 flex gap-2"
                      >
                        <span className="text-black font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
