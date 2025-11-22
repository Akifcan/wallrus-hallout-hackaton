"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ResearchHeader from "@/components/research/ResearchHeader";
import ResearchFooter from "@/components/research/ResearchFooter";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <main className="min-h-screen bg-[#f5f5f3]">
      <ResearchHeader />
      <div className="max-w-[1600px] mx-auto px-8 py-12 pt-40">
        {/* Dashboard Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center gap-3 border-2 border-black bg-white px-4 py-2 mb-6">
                <div className="w-3 h-3 bg-black" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-black">
                  Dashboard
                </span>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 border-2 border-black bg-black rotate-[-4deg]" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-4 border-b-4 border-black">
          {[
            { id: "search", label: "Word Research" },
            { id: "file", label: "File Research" },
            { id: "summary", label: "Generate Summary" },
            { id: "folders", label: "Folders/Projects" },
            { id: "notes", label: "Notes" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 border-2 border-black font-mono text-sm font-bold uppercase tracking-wider transition-all ${activeTab === tab.id
                ? "bg-black text-white border-b-4 border-b-transparent"
                : "bg-white text-black hover:bg-black hover:text-white"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {/* 1. Word Research */}
          {activeTab === "search" && (
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

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
                        Category
                      </label>
                      <select className="w-full border-2 border-black bg-white p-4 font-mono text-base text-black">
                        <option>All Categories</option>
                        <option>AI</option>
                        <option>Blockchain</option>
                        <option>Research</option>
                        <option>Technology</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
                        Date Range
                      </label>
                      <select className="w-full border-2 border-black bg-white p-4 font-mono text-base text-black">
                        <option>All Time</option>
                        <option>Last Year</option>
                        <option>Last 5 Years</option>
                        <option>Last 10 Years</option>
                      </select>
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
          )}

          {/* 2. File Research */}
          {activeTab === "file" && (
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
          )}

          {/* 3. Generate Summary */}
          {activeTab === "summary" && (
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
          )}

          {/* 4. Folders/Projects */}
          {activeTab === "folders" && (
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
          )}

          {/* 5. Notes */}
          {activeTab === "notes" && (
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
                  {[
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
                  ].map((note, idx) => (
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
          )}
        </div>
      </div>
      <ResearchFooter />
    </main>
  );
}

