"use client";

import { motion } from "framer-motion";

interface ProjectFiltersProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export default function ProjectFilters({
  selectedType,
  onTypeChange,
}: ProjectFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="border-4 border-black bg-white p-4"
    >
      <div className="flex items-center gap-3 overflow-x-auto">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-black whitespace-nowrap mr-2">
          Filter by Type:
        </span>
        <button
          onClick={() => onTypeChange("all")}
          className={`border-2 px-6 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            selectedType === "all"
              ? "border-black bg-black text-white"
              : "border-black bg-white text-black hover:bg-black hover:text-white"
          }`}
        >
          All Items
        </button>
        <button
          onClick={() => onTypeChange("word_research")}
          className={`border-2 px-6 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            selectedType === "word_research"
              ? "border-black bg-black text-white"
              : "border-black bg-white text-black hover:bg-black hover:text-white"
          }`}
        >
          📚 Research
        </button>
        <button
          onClick={() => onTypeChange("summary")}
          className={`border-2 px-6 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            selectedType === "summary"
              ? "border-black bg-black text-white"
              : "border-black bg-white text-black hover:bg-black hover:text-white"
          }`}
        >
          📝 Summaries
        </button>
        <button
          onClick={() => onTypeChange("file_research")}
          className={`border-2 px-6 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            selectedType === "file_research"
              ? "border-black bg-black text-white"
              : "border-black bg-white text-black hover:bg-black hover:text-white"
          }`}
        >
          📄 Files
        </button>
        <button
          onClick={() => onTypeChange("note")}
          className={`border-2 px-6 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            selectedType === "note"
              ? "border-black bg-black text-white"
              : "border-black bg-white text-black hover:bg-black hover:text-white"
          }`}
        >
          ✍️ Notes
        </button>
      </div>
    </motion.div>
  );
}
