"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

interface ResearchPaperProps {
  title: string;
  abstract: string;
  content: Array<{ heading: string; text: string }>;
  isActive: boolean;
}

export default function ResearchPaper({ title, abstract, content, isActive }: ResearchPaperProps) {
  const paperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paperRef.current && isActive) {
      gsap.fromTo(
        paperRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <motion.div
      ref={paperRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 w-[600px] max-w-[45vw] z-30"
    >
      {/* Paper Container */}
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
        {/* Paper Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border-b border-gray-200">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 font-mono">
            <span>DocScout Research Platform</span>
            <span>•</span>
            <span>{new Date().getFullYear()}</span>
          </div>

          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-3 leading-tight">
            {title}
          </h2>

          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-4" />

          <p className="text-sm text-gray-600 italic leading-relaxed">
            <span className="font-semibold not-italic">Abstract:</span> {abstract}
          </p>
        </div>

        {/* Paper Content */}
        <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {content.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-6"
            >
              <h3 className="text-lg font-serif font-semibold text-gray-800 mb-3 flex items-center gap-3">
                <span className="text-blue-600">{index + 1}.</span>
                {section.heading}
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify pl-6">
                {section.text}
              </p>
            </motion.div>
          ))}

          {/* Citation */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 font-mono">
              <span className="font-semibold">Citation:</span> DocScout Research Platform. (2025).{" "}
              <em>{title}</em>. Retrieved from https://docscout.ai
            </p>
          </div>
        </div>

        {/* Paper Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Research Active</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>Page 1 of 1</span>
            <span>•</span>
            <span>DocScout v2.1</span>
          </div>
        </div>
      </div>

      {/* Paper Shadow/Depth */}
      <div className="absolute inset-0 bg-gray-300 rounded-lg -z-10 translate-x-1 translate-y-1" />
      <div className="absolute inset-0 bg-gray-200 rounded-lg -z-20 translate-x-2 translate-y-2" />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </motion.div>
  );
}
