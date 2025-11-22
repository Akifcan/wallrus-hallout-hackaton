"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function WordResearch() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="border-2 border-black bg-white p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-black">
            Word Research
          </h2>
          <div className="w-6 h-6 border-2 border-black bg-black" />
        </div>
        <div className="h-1 w-16 bg-black mb-6" />

        <div className="space-y-6">
          <div>
            <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
              Search Query
            </label>
            <div className="border-2 border-black bg-white p-4">
              <input
                type="text"
                placeholder="Enter your research query..."
                className="w-full font-mono text-base text-black placeholder-black/40 bg-transparent border-none outline-none"
              />
            </div>
          </div>

          <Link
            href="/dashboard/results"
            className="w-full border-2 border-black bg-black text-white font-mono text-sm font-bold uppercase tracking-wider py-4 hover:bg-white hover:text-black transition-all block text-center"
          >
            Start Research →
          </Link>
        </div>
      </div>

      {/* Recent Searches */}
      <div className="border-2 border-black bg-white p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-black">
            Recent Searches
          </h3>
          <div className="w-4 h-4 border-2 border-black bg-black" />
        </div>
        <div className="space-y-3">
          {["AI-powered research", "Blockchain storage", "Semantic search"].map(
            (search, idx) => (
              <div
                key={idx}
                className="border-2 border-black bg-white p-4 hover:bg-black hover:text-white transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold">{search}</span>
                  <span className="font-mono text-xs text-black/60">2 days ago</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}
