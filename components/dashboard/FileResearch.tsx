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

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-black"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 font-mono text-xs text-black/60 uppercase tracking-wider">
                OR
              </span>
            </div>
          </div>

          <div>
            <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
              Upload File
            </label>
            <div className="border-2 border-dashed border-black bg-white p-12 text-center">
              <div className="mb-4">
                <div className="w-16 h-16 border-2 border-black bg-black mx-auto flex items-center justify-center">
                  <span className="text-white font-mono text-2xl">📄</span>
                </div>
              </div>
              <p className="font-mono text-sm text-black mb-2">
                Drag and drop files here
              </p>
              <p className="font-mono text-xs text-black/60 mb-4">
                or click to browse
              </p>
              <button className="px-6 py-2 border-2 border-black bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all">
                Select File
              </button>
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
            <div>
              <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
                Analysis Type
              </label>
              <select className="w-full border-2 border-black bg-white p-4 font-mono text-base text-black">
                <option>Full Analysis</option>
                <option>Summary Only</option>
                <option>Citations Extract</option>
                <option>Keywords Extract</option>
              </select>
            </div>
          </div>

          <button className="w-full border-2 border-black bg-black text-white font-mono text-sm font-bold uppercase tracking-wider py-4 hover:bg-white hover:text-black transition-all">
            Analyze File →
          </button>
        </div>
      </div>

      {/* Recent Files */}
      <div className="border-2 border-black bg-white p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-black">
            Recent Files
          </h3>
          <div className="w-4 h-4 border-2 border-black bg-black" />
        </div>
        <div className="space-y-3">
          {[
            { name: "research_paper.pdf", date: "3 days ago", status: "Analyzed" },
            { name: "thesis_draft.docx", date: "1 week ago", status: "Processing" },
            { name: "notes.txt", date: "2 weeks ago", status: "Analyzed" },
          ].map((file, idx) => (
            <div
              key={idx}
              className="border-2 border-black bg-white p-4 hover:bg-black hover:text-white transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-sm font-bold block">{file.name}</span>
                  <span className="font-mono text-xs text-black/60">{file.date}</span>
                </div>
                <span className="font-mono text-xs font-bold px-3 py-1 border border-black">
                  {file.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
