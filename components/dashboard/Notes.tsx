"use client";

import { motion } from "framer-motion";

export default function Notes() {
  const notesData = [
    {
      title: "AI Research Ideas",
      content: "Need to explore semantic search algorithms and their applications in academic research. Focus on precision and recall metrics.",
      category: "Research",
      tags: ["AI", "Search", "Algorithms"],
      date: "2 days ago",
    },
    {
      title: "Blockchain Storage Notes",
      content: "Walrus blockchain provides decentralized storage with cryptographic verification. Key benefits: permanence, security, redundancy.",
      category: "Research",
      tags: ["Blockchain", "Storage"],
      date: "5 days ago",
    },
    {
      title: "Citation Format Reference",
      content: "APA format: Author, A. (Year). Title. Journal, Volume(Issue), Pages. DOI: 10.xxxx/xxxx",
      category: "References",
      tags: ["Citations", "APA"],
      date: "1 week ago",
    },
    {
      title: "Todo: Review Papers",
      content: "Review the following papers: 1) AI Research Methodology, 2) Semantic Search Analysis, 3) Blockchain Applications",
      category: "Todo",
      tags: ["Todo", "Review"],
      date: "2 weeks ago",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Create New Note */}
      <div className="border-2 border-black bg-white p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-black">
            Create Note
          </h2>
          <div className="w-6 h-6 border-2 border-black bg-black" />
        </div>
        <div className="h-1 w-16 bg-black mb-6" />

        <div className="space-y-6">
          <div>
            <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
              Note Title
            </label>
            <div className="border-2 border-black bg-white p-4">
              <input
                type="text"
                placeholder="Enter note title..."
                className="w-full font-mono text-base text-black placeholder-black/40 bg-transparent border-none outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
              Note Content
            </label>
            <div className="border-2 border-black bg-white p-4">
              <textarea
                rows={10}
                placeholder="Write your note here..."
                className="w-full font-mono text-base text-black placeholder-black/40 bg-transparent border-none outline-none resize-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
                Category
              </label>
              <select className="w-full border-2 border-black bg-white p-4 font-mono text-base text-black">
                <option>General</option>
                <option>Research</option>
                <option>Ideas</option>
                <option>References</option>
                <option>Todo</option>
              </select>
            </div>
            <div>
              <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
                Tags
              </label>
              <div className="border-2 border-black bg-white p-4">
                <input
                  type="text"
                  placeholder="Add tags (comma separated)..."
                  className="w-full font-mono text-base text-black placeholder-black/40 bg-transparent border-none outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 border-2 border-black bg-black text-white font-mono text-sm font-bold uppercase tracking-wider py-4 hover:bg-white hover:text-black transition-all">
              Save Note
            </button>
            <button className="px-8 py-4 border-2 border-black bg-white text-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all">
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="border-2 border-black bg-white p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-black">
            My Notes
          </h3>
          <div className="flex items-center gap-4">
            <select className="border-2 border-black bg-white px-4 py-2 font-mono text-xs font-bold text-black">
              <option>All</option>
              <option>General</option>
              <option>Research</option>
              <option>Ideas</option>
            </select>
            <div className="w-4 h-4 border-2 border-black bg-black" />
          </div>
        </div>

        <div className="space-y-4">
          {notesData.map((note, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="border-2 border-black bg-white p-6 hover:bg-black hover:text-white transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border-2 border-black bg-black group-hover:bg-white flex items-center justify-center">
                    <span className="font-mono text-sm font-black text-white group-hover:text-black">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-mono text-lg font-bold uppercase tracking-wider mb-1">
                      {note.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-black/60 group-hover:text-white/70 px-2 py-1 border border-black/20 group-hover:border-white/20">
                        {note.category}
                      </span>
                      <span className="font-mono text-xs text-black/50 group-hover:text-white/60">
                        {note.date}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 border border-black bg-black group-hover:bg-white" />
                  <div className="w-2 h-2 border border-black bg-white group-hover:bg-black" />
                </div>
              </div>

              <div className="h-1 w-12 bg-black group-hover:bg-white mb-4" />

              <p className="font-mono text-sm leading-relaxed mb-4 text-black/80 group-hover:text-white/90 line-clamp-2">
                {note.content}
              </p>

              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="px-2 py-1 border border-black bg-white group-hover:bg-black group-hover:border-white font-mono text-[10px] text-black group-hover:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-4 pt-4 border-t-2 border-black">
                <button className="font-mono text-xs font-bold uppercase tracking-wider text-black/60 group-hover:text-white/80 hover:underline">
                  Edit
                </button>
                <button className="font-mono text-xs font-bold uppercase tracking-wider text-black/60 group-hover:text-white/80 hover:underline">
                  Delete
                </button>
                <button className="font-mono text-xs font-bold uppercase tracking-wider text-black/60 group-hover:text-white/80 hover:underline">
                  Share
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
