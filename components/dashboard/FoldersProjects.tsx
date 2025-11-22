"use client";

import { motion } from "framer-motion";

export default function FoldersProjects() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-black">
          Folders & Projects
        </h2>
        <button className="px-6 py-3 border-2 border-black bg-black text-white font-mono text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all">
          + New Folder
        </button>
      </div>

      {/* Folders Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "AI Research", items: 12, color: "bg-black" },
          { name: "Blockchain", items: 8, color: "bg-white" },
          { name: "Thesis Work", items: 24, color: "bg-black" },
          { name: "Citations", items: 5, color: "bg-white" },
          { name: "Notes", items: 18, color: "bg-black" },
          { name: "Drafts", items: 6, color: "bg-white" },
        ].map((folder, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="border-2 border-black bg-white p-6 hover:bg-black hover:text-white transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 border-2 border-black ${folder.color} group-hover:bg-white group-hover:border-white flex items-center justify-center`}>
                <span className={`font-mono text-lg font-black ${folder.color === "bg-black" ? "text-white" : "text-black"} group-hover:text-black`}>
                  📁
                </span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 border border-black bg-black group-hover:bg-white" />
                <div className="w-2 h-2 border border-black bg-white group-hover:bg-black" />
              </div>
            </div>
            <h3 className="font-mono text-lg font-bold uppercase tracking-wider mb-2">
              {folder.name}
            </h3>
            <div className="h-1 w-12 bg-black group-hover:bg-white mb-4" />
            <p className="font-mono text-sm text-black/60 group-hover:text-white/80">
              {folder.items} items
            </p>
          </motion.div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="border-2 border-black bg-white p-8 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-black">
            Recent Projects
          </h3>
          <div className="w-4 h-4 border-2 border-black bg-black" />
        </div>
        <div className="space-y-3">
          {[
            { name: "AI Research Project", folder: "AI Research", date: "2 days ago" },
            { name: "Thesis Chapter 3", folder: "Thesis Work", date: "5 days ago" },
            { name: "Blockchain Analysis", folder: "Blockchain", date: "1 week ago" },
          ].map((project, idx) => (
            <div
              key={idx}
              className="border-2 border-black bg-white p-4 hover:bg-black hover:text-white transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-sm font-bold block">{project.name}</span>
                  <span className="font-mono text-xs text-black/60">{project.folder} • {project.date}</span>
                </div>
                <span className="font-mono text-xs">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
