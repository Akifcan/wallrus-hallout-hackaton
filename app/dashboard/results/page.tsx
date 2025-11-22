"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ResearchHeader from "@/components/research/ResearchHeader";
import ResearchFooter from "@/components/research/ResearchFooter";

export default function SearchResultsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  // Mock search results
  const searchQuery = "AI-powered research methodology";
  const totalResults = 1247;

  const results = [
    {
      id: 1,
      title: "Advanced AI-Powered Research Methodology: A Comprehensive Analysis",
      author: "Smith, J., Doe, A., & Johnson, B.",
      journal: "Journal of Research Intelligence",
      year: 2025,
      abstract:
        "This paper presents a novel approach to academic research using artificial intelligence and blockchain technology. Our methodology demonstrates significant improvements in citation accuracy and research discovery speed.",
      relevance: 98,
      citations: 247,
      url: "/articles/1",
      tags: ["AI", "Research", "Blockchain"],
    },
    {
      id: 2,
      title: "Machine Learning Applications in Academic Research Discovery",
      author: "Wilson, T. et al.",
      journal: "AI Research Journal",
      year: 2025,
      abstract:
        "Investigating machine learning applications in academic research discovery. This paper presents novel algorithms for pattern recognition and knowledge extraction from scholarly documents.",
      relevance: 95,
      citations: 423,
      url: "/articles/2",
      tags: ["ML", "AI", "Discovery"],
    },
    {
      id: 3,
      title: "Semantic Search Algorithms for Academic Literature",
      author: "Brown, A. et al.",
      journal: "Information Science Quarterly",
      year: 2024,
      abstract:
        "A comprehensive analysis of semantic search algorithms applied to academic literature databases. The study evaluates precision, recall, and user satisfaction metrics across multiple platforms.",
      relevance: 92,
      citations: 312,
      url: "/articles/3",
      tags: ["Search", "AI", "Literature"],
    },
    {
      id: 4,
      title: "Blockchain-Based Storage Solutions for Academic Data",
      author: "Johnson, M. & Williams, K.",
      journal: "Academic Technology Review",
      year: 2025,
      abstract:
        "Exploring decentralized storage solutions for academic institutions. This study examines the implementation of blockchain technology in preserving research data with enhanced security.",
      relevance: 88,
      citations: 189,
      url: "/articles/4",
      tags: ["Blockchain", "Storage", "Security"],
    },
    {
      id: 5,
      title: "Neural Network Architectures for Research Paper Analysis",
      author: "Davis, R. & Miller, L.",
      journal: "Computational Intelligence Review",
      year: 2024,
      abstract:
        "Evaluating neural network architectures for analyzing academic research papers. The research compares different deep learning models for content understanding and classification.",
      relevance: 85,
      citations: 156,
      url: "/articles/5",
      tags: ["Neural Networks", "Deep Learning", "Analysis"],
    },
    {
      id: 6,
      title: "Automated Citation Generation Using AI",
      author: "Anderson, P. & Taylor, S.",
      journal: "Bibliographic Studies",
      year: 2025,
      abstract:
        "Analyzing automated citation generation tools powered by artificial intelligence. The study explores accuracy rates and user adoption patterns in citation management systems.",
      relevance: 82,
      citations: 278,
      url: "/articles/6",
      tags: ["Citations", "AI", "Automation"],
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f5f3]">
      <ResearchHeader />
      <div className="max-w-[1600px] mx-auto px-8 py-12 pt-40">
        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 mb-8 font-mono text-sm text-black/60 hover:text-black transition-colors"
        >
          <span>←</span>
          <span>Back to Dashboard</span>
        </Link>

        {/* Search Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-3 border-2 border-black bg-white px-4 py-2 mb-6">
                <div className="w-3 h-3 bg-black" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-black">
                  Search Results
                </span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-black text-black leading-[0.9] mb-6">
                Research
                <br />
                Results
              </h1>
              <div className="h-2 w-32 bg-black mb-6" />
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 border-2 border-black bg-black rotate-[-4deg]" />
            </div>
          </div>

          {/* Search Query Display */}
          <div className="border-2 border-black bg-white p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 border-2 border-black bg-black" />
              <div>
                <div className="font-mono text-xs text-black/60 uppercase tracking-wider mb-1">
                  Search Query
                </div>
                <div className="font-mono text-lg font-bold text-black">
                  "{searchQuery}"
                </div>
              </div>
            </div>
          </div>

          {/* Results Count & Filters */}
          <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
            <div className="font-mono text-base text-black">
              Found <span className="font-black">{totalResults}</span> results
            </div>
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="font-mono text-xs text-black/60 uppercase tracking-wider mb-2 block">
                  Filter
                </label>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="border-2 border-black bg-white px-4 py-2 font-mono text-sm font-bold text-black"
                >
                  <option value="all">All</option>
                  <option value="ai">AI</option>
                  <option value="blockchain">Blockchain</option>
                  <option value="research">Research</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-xs text-black/60 uppercase tracking-wider mb-2 block">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border-2 border-black bg-white px-4 py-2 font-mono text-sm font-bold text-black"
                >
                  <option value="relevance">Relevance</option>
                  <option value="citations">Citations</option>
                  <option value="year">Year</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-6">
          {results.map((result, idx) => (
            <motion.article
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="border-2 border-black bg-white p-8 hover:bg-black hover:text-white transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border-2 border-black bg-black group-hover:bg-white flex items-center justify-center">
                    <span className="font-mono text-lg font-black text-white group-hover:text-black">
                      {String(result.id).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-black/60 group-hover:text-white/60 mb-1">
                      Relevance: {result.relevance}%
                    </div>
                    <div className="h-2 w-24 bg-black/10 group-hover:bg-white/20">
                      <div
                        className="h-full bg-black group-hover:bg-white"
                        style={{ width: `${result.relevance}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 border border-black bg-black group-hover:bg-white" />
                  <div className="w-2 h-2 border border-black bg-white group-hover:bg-black" />
                </div>
              </div>

              <h2 className="font-mono text-2xl font-bold uppercase tracking-wider mb-4 group-hover:text-white">
                {result.title}
              </h2>

              <div className="h-1 w-16 bg-black group-hover:bg-white mb-4" />

              <div className="mb-4 space-y-2">
                <p className="font-mono text-sm font-bold text-black/70 group-hover:text-white/90">
                  {result.author}
                </p>
                <p className="font-mono text-sm text-black/60 group-hover:text-white/80">
                  {result.journal} • {result.year}
                </p>
              </div>

              <p className="font-mono text-base leading-relaxed mb-6 text-black/80 group-hover:text-white/90 line-clamp-3">
                {result.abstract}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {result.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="px-3 py-1 border border-black bg-white group-hover:bg-black group-hover:border-white font-mono text-xs text-black group-hover:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats & Actions */}
              <div className="flex items-center justify-between pt-6 border-t-2 border-black">
                <div className="flex items-center gap-6">
                  <div>
                    <div className="font-mono text-2xl font-black group-hover:text-white">
                      {result.citations}
                    </div>
                    <div className="font-mono text-[10px] text-black/60 group-hover:text-white/70 uppercase tracking-wider">
                      Citations
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-2xl font-black group-hover:text-white">
                      {result.year}
                    </div>
                    <div className="font-mono text-[10px] text-black/60 group-hover:text-white/70 uppercase tracking-wider">
                      Year
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link
                    href={result.url}
                    className="px-6 py-3 border-2 border-black bg-black text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all group-hover:bg-white group-hover:text-black group-hover:border-white"
                  >
                    Read Article
                  </Link>
                  <button className="px-6 py-3 border-2 border-black bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all group-hover:bg-black group-hover:text-white group-hover:border-white">
                    Save
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <button className="px-6 py-3 border-2 border-black bg-white text-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all">
            Previous
          </button>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`w-12 h-12 border-2 border-black font-mono text-sm font-bold ${
                  page === 1
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-black hover:text-white"
                } transition-all`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="px-6 py-3 border-2 border-black bg-white text-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all">
            Next
          </button>
        </div>

        {/* Export Options */}
        <div className="mt-12 border-2 border-black bg-white p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-black">
              Export Results
            </h3>
            <div className="w-4 h-4 border-2 border-black bg-black" />
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 border-2 border-black bg-white text-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all">
              Export as PDF
            </button>
            <button className="px-6 py-3 border-2 border-black bg-white text-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all">
              Export as CSV
            </button>
            <button className="px-6 py-3 border-2 border-black bg-white text-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all">
              Export Citations
            </button>
            <button className="px-6 py-3 border-2 border-black bg-white text-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all">
              Save to Folder
            </button>
          </div>
        </div>
      </div>
      <ResearchFooter />
    </main>
  );
}

