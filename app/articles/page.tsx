"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ResearchHeader from "@/components/research/ResearchHeader";
import ResearchFooter from "@/components/research/ResearchFooter";

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "AI", "Blockchain", "Research", "Technology", "Citations"];

  const articles = [
    {
      id: 1,
      title: "Advanced AI-Powered Research Methodology",
      author: "Smith, J. et al.",
      journal: "Journal of Research Intelligence",
      year: 2025,
      abstract:
        "This paper presents a novel approach to academic research using artificial intelligence and blockchain technology. Our methodology demonstrates significant improvements in citation accuracy and research discovery speed.",
      tags: ["AI", "Research", "Blockchain"],
      category: "AI",
      citations: 247,
      views: 1847,
    },
    {
      id: 2,
      title: "Blockchain-Based Academic Storage Solutions",
      author: "Johnson, M. & Williams, K.",
      journal: "Academic Technology Review",
      year: 2025,
      abstract:
        "Exploring decentralized storage solutions for academic institutions. This study examines the implementation of blockchain technology in preserving research data with enhanced security and permanence.",
      tags: ["Blockchain", "Storage", "Security"],
      category: "Blockchain",
      citations: 189,
      views: 1234,
    },
    {
      id: 3,
      title: "Semantic Search in Academic Literature",
      author: "Brown, A. et al.",
      journal: "Information Science Quarterly",
      year: 2024,
      abstract:
        "A comprehensive analysis of semantic search algorithms applied to academic literature databases. The study evaluates precision, recall, and user satisfaction metrics across multiple platforms.",
      tags: ["Search", "AI", "Literature"],
      category: "Research",
      citations: 312,
      views: 2156,
    },
    {
      id: 4,
      title: "Automated Citation Generation Systems",
      author: "Davis, R. & Miller, L.",
      journal: "Bibliographic Studies",
      year: 2025,
      abstract:
        "Evaluating automated citation generation tools across different academic formats. The research compares accuracy rates and user adoption patterns in various citation management systems.",
      tags: ["Citations", "Automation", "Tools"],
      category: "Citations",
      citations: 156,
      views: 987,
    },
    {
      id: 5,
      title: "Machine Learning in Research Discovery",
      author: "Wilson, T. et al.",
      journal: "AI Research Journal",
      year: 2025,
      abstract:
        "Investigating machine learning applications in academic research discovery. This paper presents novel algorithms for pattern recognition and knowledge extraction from scholarly documents.",
      tags: ["ML", "AI", "Discovery"],
      category: "AI",
      citations: 423,
      views: 2891,
    },
    {
      id: 6,
      title: "Decentralized Research Networks",
      author: "Anderson, P. & Taylor, S.",
      journal: "Network Science Review",
      year: 2024,
      abstract:
        "Analyzing decentralized network architectures for academic collaboration. The study explores peer-to-peer research sharing and blockchain-based verification systems.",
      tags: ["Blockchain", "Networks", "Collaboration"],
      category: "Technology",
      citations: 278,
      views: 1654,
    },
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#f5f5f3]">
      <ResearchHeader />
      <div className="max-w-[1600px] mx-auto px-8 py-12 pt-40">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-3 border-2 border-black bg-white px-4 py-2 mb-6">
                <div className="w-3 h-3 bg-black" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-black">
                  Research Articles
                </span>
              </div>
              <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-black text-black leading-[0.9] mb-6">
                Articles
                <br />
                Library
              </h1>
              <div className="h-2 w-32 bg-black mb-6" />
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 border-2 border-black bg-black rotate-[-4deg]" />
            </div>
          </div>

          {/* Search and Filter */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Search */}
            <div className="border-2 border-black bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-black bg-black" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 font-mono text-sm text-black placeholder-black/40 bg-transparent border-none outline-none"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 border-2 border-black font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedCategory === category
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-black hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <span className="font-mono text-sm text-black/60">
              Showing {filteredArticles.length} of {articles.length} articles
            </span>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="border-2 border-black bg-white p-6 hover:bg-black hover:text-white transition-all duration-200 group"
            >
              {/* Article Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 border-2 border-black bg-black group-hover:bg-white flex items-center justify-center">
                  <span className="font-mono text-lg font-black text-white group-hover:text-black">
                    {String(article.id).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 border border-black bg-black group-hover:bg-white" />
                  <div className="w-2 h-2 border border-black bg-white group-hover:bg-black" />
                </div>
              </div>

              {/* Title */}
              <h2 className="font-mono text-xl font-bold uppercase tracking-wider mb-4 group-hover:text-white">
                {article.title}
              </h2>

              {/* Divider */}
              <div className="h-1 w-16 bg-black group-hover:bg-white mb-4" />

              {/* Author & Journal */}
              <div className="mb-4 space-y-2">
                <p className="font-mono text-xs text-black/70 group-hover:text-white/80">
                  {article.author}
                </p>
                <p className="font-mono text-xs text-black/60 group-hover:text-white/70">
                  {article.journal} • {article.year}
                </p>
              </div>

              {/* Abstract */}
              <p className="font-mono text-sm leading-relaxed mb-6 text-black/80 group-hover:text-white/90 line-clamp-3">
                {article.abstract}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="px-2 py-1 border border-black bg-white group-hover:bg-black group-hover:border-white font-mono text-[10px] text-black group-hover:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t-2 border-black">
                <div>
                  <div className="font-mono text-2xl font-black group-hover:text-white">
                    {article.citations}
                  </div>
                  <div className="font-mono text-[10px] text-black/60 group-hover:text-white/70 uppercase tracking-wider">
                    Citations
                  </div>
                </div>
                <div>
                  <div className="font-mono text-2xl font-black group-hover:text-white">
                    {article.views}
                  </div>
                  <div className="font-mono text-[10px] text-black/60 group-hover:text-white/70 uppercase tracking-wider">
                    Views
                  </div>
                </div>
              </div>

              {/* View Button */}
              <div className="mt-6">
                <button className="w-full border-2 border-black bg-black text-white font-mono text-xs font-bold uppercase tracking-wider py-3 group-hover:bg-white group-hover:text-black transition-all duration-200">
                  Read Article →
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-20 border-2 border-black bg-white p-12">
            <div className="font-mono text-xl font-bold text-black mb-4">
              No articles found
            </div>
            <p className="font-mono text-sm text-black/60">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredArticles.length > 0 && (
          <div className="mt-16 flex items-center justify-center gap-4">
            <button className="px-6 py-3 border-2 border-black bg-white text-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all">
              Previous
            </button>
            <div className="flex gap-2">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 border-2 border-black font-mono text-sm font-bold ${
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
        )}
      </div>
      <ResearchFooter />
    </main>
  );
}

