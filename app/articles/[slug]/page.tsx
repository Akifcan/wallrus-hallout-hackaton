"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ResearchHeader from "@/components/research/ResearchHeader";
import ResearchFooter from "@/components/research/ResearchFooter";

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  // Mock article data - in real app, fetch by slug
  const article = {
    id: 1,
    title: "Advanced AI-Powered Research Methodology: A Comprehensive Analysis",
    author: "Smith, J., Doe, A., & Johnson, B.",
    journal: "Journal of Research Intelligence",
    year: 2025,
    volume: "1",
    issue: "1",
    pages: "45-67",
    doi: "10.1234/jri.2025.001",
    abstract:
      "This paper presents a novel approach to academic research using artificial intelligence and blockchain technology. Our methodology demonstrates significant improvements in citation accuracy and research discovery speed. We conducted extensive experiments across multiple academic databases, analyzing over 2.5 million research papers to validate our approach. The results show a 98.7% precision rate in document retrieval and a 0.34-second average response time, significantly outperforming traditional keyword-based search systems.",
    fullText: `## Introduction

Academic research has undergone significant transformation with the advent of artificial intelligence and blockchain technology. Traditional research methodologies, while effective, face limitations in scalability, accuracy, and data permanence. This paper introduces a comprehensive framework that addresses these challenges through innovative AI-powered semantic search and decentralized storage solutions.

## Methodology

Our research methodology combines three core components:

1. **Semantic Search Engine**: Utilizing advanced natural language processing algorithms to understand context and meaning beyond simple keyword matching.

2. **Blockchain Storage**: Implementing Walrus blockchain technology for permanent, decentralized storage of research data with cryptographic verification.

3. **Citation Network Analysis**: Building comprehensive citation graphs to identify research trends and connections across academic literature.

## Results

The experimental results demonstrate significant improvements across all key metrics:

- **Precision**: 98.7% accuracy in document retrieval
- **Response Time**: 0.34 seconds average query processing
- **Storage Efficiency**: 40% reduction in storage costs through blockchain optimization
- **User Satisfaction**: 94% positive feedback from research participants

## Discussion

The integration of AI and blockchain technology presents unprecedented opportunities for academic research. Our findings suggest that semantic understanding combined with decentralized storage can revolutionize how researchers discover, analyze, and preserve scholarly work.

## Conclusion

This study establishes a new paradigm for academic research platforms, demonstrating the viability and effectiveness of AI-powered semantic search combined with blockchain storage. Future work will explore additional applications and scalability improvements.`,
    tags: ["AI", "Research", "Blockchain", "Semantic Search", "Academic"],
    category: "AI",
    citations: 247,
    views: 1847,
    downloads: 523,
    relatedArticles: [
      {
        id: 2,
        title: "Blockchain-Based Academic Storage Solutions",
        author: "Johnson, M. & Williams, K.",
        year: 2025,
      },
      {
        id: 3,
        title: "Semantic Search in Academic Literature",
        author: "Brown, A. et al.",
        year: 2024,
      },
    ],
  };

  const citationFormats = {
    apa: `${article.author} (${article.year}). ${article.title}. ${article.journal}, ${article.volume}(${article.issue}), ${article.pages}. https://doi.org/${article.doi}`,
    mla: `${article.author.split(",")[0]} et al. "${article.title}." ${article.journal}, vol. ${article.volume}, no. ${article.issue}, ${article.year}, pp. ${article.pages}.`,
    chicago: `${article.author}. "${article.title}." ${article.journal} ${article.volume}, no. ${article.issue} (${article.year}): ${article.pages}.`,
    ieee: `${article.author}, "${article.title}," ${article.journal}, vol. ${article.volume}, no. ${article.issue}, pp. ${article.pages}, ${article.year}.`,
  };

  return (
    <main className="min-h-screen bg-[#f5f5f3]">
      <ResearchHeader />
      <div className="max-w-[1600px] mx-auto px-8 py-12 pt-40">
        {/* Back Button */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 mb-8 font-mono text-sm text-black/60 hover:text-black transition-colors"
        >
          <span>←</span>
          <span>Back to Articles</span>
        </Link>

        {/* Article Header */}
        <div className="mb-12">
          <div className="border-2 border-black bg-white p-8 mb-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 border-2 border-black bg-black text-white px-4 py-2 mb-6">
              <div className="w-3 h-3 bg-white" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Author & Journal Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 border-2 border-black bg-black" />
                <div>
                  <p className="font-mono text-base font-bold text-black">
                    {article.author}
                  </p>
                  <p className="font-mono text-sm text-black/60">
                    {article.journal} • Volume {article.volume}, Issue{" "}
                    {article.issue} • {article.year}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-black">
              <div>
                <div className="font-mono text-3xl font-black text-black mb-1">
                  {article.citations}
                </div>
                <div className="font-mono text-xs text-black/60 uppercase tracking-wider">
                  Citations
                </div>
              </div>
              <div>
                <div className="font-mono text-3xl font-black text-black mb-1">
                  {article.views}
                </div>
                <div className="font-mono text-xs text-black/60 uppercase tracking-wider">
                  Views
                </div>
              </div>
              <div>
                <div className="font-mono text-3xl font-black text-black mb-1">
                  {article.downloads}
                </div>
                <div className="font-mono text-xs text-black/60 uppercase tracking-wider">
                  Downloads
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-4 py-2 border-2 border-black bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Abstract */}
            <div className="border-2 border-black bg-white p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-black">
                  Abstract
                </h2>
                <div className="w-6 h-6 border-2 border-black bg-black" />
              </div>
              <div className="h-1 w-16 bg-black mb-6" />
              <p className="font-mono text-base text-black/80 leading-relaxed">
                {article.abstract}
              </p>
            </div>

            {/* Full Text */}
            <div className="border-2 border-black bg-white p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-black">
                  Full Text
                </h2>
                <div className="w-6 h-6 border-2 border-black bg-black" />
              </div>
              <div className="h-1 w-16 bg-black mb-6" />
              <div className="prose prose-lg max-w-none">
                <div className="font-mono text-base text-black/80 leading-relaxed whitespace-pre-line">
                  {article.fullText}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 border-2 border-black bg-black text-white font-mono text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all">
                Download PDF
              </button>
              <button className="px-8 py-4 border-2 border-black bg-white text-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all">
                Share Article
              </button>
              <button className="px-8 py-4 border-2 border-black bg-white text-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all">
                Cite This
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Citation Formats */}
            <div className="border-2 border-black bg-white p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-black">
                  Citations
                </h3>
                <div className="w-4 h-4 border-2 border-black bg-black" />
              </div>

              <div className="space-y-4">
                {Object.entries(citationFormats).map(([format, citation]) => (
                  <div key={format} className="space-y-2">
                    <div className="font-mono text-xs font-bold uppercase tracking-wider text-black/60">
                      {format.toUpperCase()}
                    </div>
                    <div className="bg-black/5 p-3 border border-black/20">
                      <p className="font-mono text-[10px] text-black/80 leading-relaxed">
                        {citation}
                      </p>
                    </div>
                    <button className="w-full border border-black bg-white text-black font-mono text-[10px] font-bold uppercase tracking-wider py-2 hover:bg-black hover:text-white transition-all">
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Article Info */}
            <div className="border-2 border-black bg-white p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-black">
                  Article Info
                </h3>
                <div className="w-4 h-4 border-2 border-black bg-black" />
              </div>

              <div className="space-y-4 font-mono text-sm">
                <div>
                  <div className="text-black/60 mb-1">DOI</div>
                  <div className="text-black font-bold">{article.doi}</div>
                </div>
                <div>
                  <div className="text-black/60 mb-1">Published</div>
                  <div className="text-black font-bold">{article.year}</div>
                </div>
                <div>
                  <div className="text-black/60 mb-1">Pages</div>
                  <div className="text-black font-bold">{article.pages}</div>
                </div>
                <div>
                  <div className="text-black/60 mb-1">Volume</div>
                  <div className="text-black font-bold">{article.volume}</div>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="border-2 border-black bg-white p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-black">
                  Related
                </h3>
                <div className="w-4 h-4 border-2 border-black bg-black" />
              </div>

              <div className="space-y-4">
                {article.relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/articles/${related.id}`}
                    className="block border-2 border-black bg-white p-4 hover:bg-black hover:text-white transition-all group"
                  >
                    <div className="font-mono text-sm font-bold text-black group-hover:text-white mb-2">
                      {related.title}
                    </div>
                    <div className="font-mono text-xs text-black/60 group-hover:text-white/80">
                      {related.author} • {related.year}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ResearchFooter />
    </main>
  );
}

