"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const fileTypes = [
  { label: "ALL", icon: "📁" },
  { label: "PDF", icon: "📄" },
  { label: "DOC", icon: "📝" },
  { label: "DOCX", icon: "📝" },
  { label: "TXT", icon: "📃" },
  { label: "MD", icon: "📋" },
  { label: "XLSX", icon: "📊" },
  { label: "CSV", icon: "📊" },
  { label: "PPT", icon: "📊" },
  { label: "JSON", icon: "🔧" },
  { label: "XML", icon: "🔧" },
  { label: "HTML", icon: "🌐" },
  { label: "CSS", icon: "🎨" },
  { label: "JS", icon: "⚡" },
  { label: "ZIP", icon: "🗜️" },
  { label: "JPG", icon: "🖼️" },
  { label: "PNG", icon: "🖼️" },
  { label: "GIF", icon: "🖼️" },
  { label: "MP4", icon: "🎬" },
  { label: "MP3", icon: "🎵" },
];

export default function FileResearch() {
  const [selectedType, setSelectedType] = useState("ALL");

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

          <div>
            <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
              File Type
            </label>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {fileTypes.map((type) => (
                <button
                  key={type.label}
                  type="button"
                  onClick={() => setSelectedType(type.label)}
                  className={`border-2 p-3 font-mono text-xs font-bold uppercase transition-all flex flex-col items-center justify-center gap-1 ${
                    selectedType === type.label
                      ? "border-black bg-black text-white"
                      : "border-black bg-white text-black hover:bg-black hover:text-white"
                  }`}
                >
                  <span className="text-2xl">{type.icon}</span>
                  <span className="text-[10px]">{type.label}</span>
                </button>
              ))}
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
