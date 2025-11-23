"use client";

import { motion } from "framer-motion";

interface ProjectFileCardProps {
  file: {
    id: string;
    type: string;
    title: string;
    date: string;
    itemsCount: number;
    icon: string;
  };
  typeLabel: string;
  index: number;
  onClick: () => void;
}

export default function ProjectFileCard({
  file,
  typeLabel,
  index,
  onClick,
}: ProjectFileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      onClick={onClick}
      className="border-4 border-black bg-white hover:bg-black hover:text-white transition-all group cursor-pointer"
    >
      {/* Card Header */}
      <div className="border-b-4 border-black bg-black group-hover:bg-white transition-all p-3">
        <div className="flex items-center justify-between">
          <span className="text-3xl">{file.icon}</span>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-white group-hover:text-black">
            {typeLabel}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-mono text-lg font-bold uppercase tracking-wider mb-2">
            {file.title}
          </h3>
          <p className="font-mono text-xs opacity-60 group-hover:opacity-100">
            Added: {new Date(file.date).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t-2 border-current">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-current" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              {file.itemsCount} Items
            </span>
          </div>
          <div className="font-mono text-xs font-bold uppercase tracking-wider group-hover:underline">
            View →
          </div>
        </div>
      </div>
    </motion.div>
  );
}
