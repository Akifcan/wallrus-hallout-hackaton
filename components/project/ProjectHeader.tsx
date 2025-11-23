"use client";

import { motion } from "framer-motion";

interface ProjectHeaderProps {
  project: {
    id: string;
    title: string;
    description: string;
    created_at: string;
    itemsCount: number;
  };
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-4 border-black bg-white"
    >
      {/* Decorative Header Bar */}
      <div className="border-b-4 border-black bg-black p-2">
        <div className="flex items-center justify-center gap-3">
          <div className="w-3 h-3 border-2 border-white bg-white" />
          <div className="w-3 h-3 border-2 border-white" />
          <div className="w-3 h-3 border-2 border-white bg-white" />
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 border-4 border-black flex items-center justify-center bg-black">
                <span className="text-4xl">📖</span>
              </div>
              <div>
                <h1 className="font-mono text-3xl font-bold uppercase tracking-wider text-black mb-2">
                  {project.title}
                </h1>
                <p className="font-mono text-sm text-black/60">
                  Catalog No. {project.id} • Est.{" "}
                  {new Date(project.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="border-2 border-black bg-white p-4">
              <p className="font-mono text-sm text-black leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          <div className="ml-8 border-4 border-black bg-white p-6">
            <div className="text-center">
              <div className="font-mono text-5xl font-bold text-black mb-2">
                {project.itemsCount}
              </div>
              <div className="font-mono text-xs uppercase tracking-wider text-black/60">
                Total Items
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
