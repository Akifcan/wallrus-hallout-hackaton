"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

interface BookContentProps {
  title: string;
  chapter: string;
  content: Array<{ heading: string; text: string }>;
  isOpen: boolean;
  color: string;
}

export default function BookContent({ title, chapter, content, isOpen, color }: BookContentProps) {
  const bookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bookRef.current && isOpen) {
      gsap.fromTo(
        bookRef.current,
        {
          rotateY: -90,
          scale: 0.8,
          opacity: 0
        },
        {
          rotateY: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <motion.div
        ref={bookRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative w-[900px] max-w-[90vw] h-[600px] max-h-[80vh]"
        style={{ perspective: "2000px" }}
      >
        {/* Opened book */}
        <div className="flex h-full shadow-2xl" style={{ transformStyle: "preserve-3d" }}>
          {/* Left page */}
          <div className="flex-1 bg-gradient-to-br from-amber-50 to-yellow-50 p-10 border-r-2 border-amber-200 relative overflow-hidden">
            {/* Page texture */}
            <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_20px,#d97706_20px,#d97706_21px)]" />

            {/* Content */}
            <div className="relative">
              {/* Book title */}
              <div className="mb-8 pb-6 border-b-2 border-amber-300">
                <div
                  className="w-16 h-1 mb-4 rounded-full"
                  style={{ background: color }}
                />
                <h2 className="text-4xl font-serif font-bold text-gray-800 mb-2">
                  {title}
                </h2>
                <p className="text-lg text-amber-700 font-serif italic">{chapter}</p>
              </div>

              {/* Chapter number */}
              <div className="absolute top-0 right-0 text-8xl font-serif text-amber-200/40">
                I
              </div>

              {/* Content sections */}
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {content.slice(0, Math.ceil(content.length / 2)).map((section, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <h3 className="text-xl font-serif font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <span style={{ color }}>§{i + 1}</span>
                      {section.heading}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-justify font-serif">
                      {section.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Page number */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm text-gray-400 font-serif">
                1
              </div>
            </div>
          </div>

          {/* Right page */}
          <div className="flex-1 bg-gradient-to-br from-yellow-50 to-amber-50 p-10 relative overflow-hidden">
            {/* Page texture */}
            <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_20px,#d97706_20px,#d97706_21px)]" />

            {/* Content */}
            <div className="relative">
              {/* Continued content */}
              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                {content.slice(Math.ceil(content.length / 2)).map((section, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (i + Math.ceil(content.length / 2)) * 0.1 }}
                  >
                    <h3 className="text-xl font-serif font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <span style={{ color }}>§{i + Math.ceil(content.length / 2) + 1}</span>
                      {section.heading}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-justify font-serif">
                      {section.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Decorative bookmark */}
              <div
                className="absolute -top-10 right-8 w-8 h-32 shadow-lg"
                style={{ background: color }}
              />

              {/* Page number */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm text-gray-400 font-serif">
                2
              </div>
            </div>
          </div>
        </div>

        {/* Book spine shadow */}
        <div className="absolute top-0 bottom-0 left-1/2 w-8 -translate-x-1/2 bg-gradient-to-r from-black/20 via-black/10 to-black/20 pointer-events-none" />

        {/* Book shadow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full h-8 bg-black/20 blur-xl rounded-full" />
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(217, 119, 6, 0.1);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(217, 119, 6, 0.3);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(217, 119, 6, 0.5);
        }
      `}</style>
    </div>
  );
}
