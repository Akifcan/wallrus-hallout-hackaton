"use client";

import { motion } from "framer-motion";

export default function FileResearch() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="border-2 border-black bg-white p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-black">
            File Research
          </h2>
          <div className="w-6 h-6 border-2 border-black bg-black" />
        </div>
        <div className="h-1 w-16 bg-black mb-6" />

        <div className="space-y-6">
          <div>
            <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
              File URL or Path
            </label>
            <div className="border-2 border-black bg-white p-4">
              <input
                type="text"
                placeholder="Enter file URL or path..."
                className="w-full font-mono text-base text-black placeholder-black/40 bg-transparent border-none outline-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
                File Type
              </label>
              <select className="w-full border-2 border-black bg-white p-4 font-mono text-base text-black">
                <option>PDF</option>
                <option>DOCX</option>
                <option>TXT</option>
                <option>MD</option>
              </select>
            </div>
          </div>

          <button className="w-full border-2 border-black bg-black text-white font-mono text-sm font-bold uppercase tracking-wider py-4 hover:bg-white hover:text-black transition-all">
            Find Files →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
