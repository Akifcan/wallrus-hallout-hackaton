"use client";

import { motion } from "framer-motion";

export default function GenerateSummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="border-2 border-black bg-white p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-black">
            Generate Summary
          </h2>
          <div className="w-6 h-6 border-2 border-black bg-black" />
        </div>
        <div className="h-1 w-16 bg-black mb-6" />

        <div className="space-y-6">
          <div>
            <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
              Input Text or URL
            </label>
            <div className="border-2 border-black bg-white p-4">
              <textarea
                rows={8}
                placeholder="Paste your text here or enter a URL..."
                className="w-full font-mono text-base text-black placeholder-black/40 bg-transparent border-none outline-none resize-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
                Summary Length
              </label>
              <select className="w-full border-2 border-black bg-white p-4 font-mono text-base text-black">
                <option>Short (1-2 sentences)</option>
                <option>Medium (1 paragraph)</option>
                <option>Long (2-3 paragraphs)</option>
              </select>
            </div>
            <div>
              <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
                Language
              </label>
              <select className="w-full border-2 border-black bg-white p-4 font-mono text-base text-black">
                <option>English</option>
                <option>Turkish</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>

          <button className="w-full border-2 border-black bg-black text-white font-mono text-sm font-bold uppercase tracking-wider py-4 hover:bg-white hover:text-black transition-all">
            Generate Summary →
          </button>
        </div>
      </div>

      {/* Recent Summaries */}
      <div className="border-2 border-black bg-white p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-black">
            Recent Summaries
          </h3>
          <div className="w-4 h-4 border-2 border-black bg-black" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="border-2 border-black bg-white p-4 hover:bg-black hover:text-white transition-all"
            >
              <div className="font-mono text-sm font-bold mb-2">
                Summary #{idx}
              </div>
              <p className="font-mono text-xs text-black/70 line-clamp-2">
                This is a sample summary text that demonstrates the summary
                generation feature...
              </p>
              <div className="mt-2 font-mono text-[10px] text-black/50">
                2 days ago
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
