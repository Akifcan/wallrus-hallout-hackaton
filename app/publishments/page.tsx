"use client";

import ResearchFooter from "@/components/research/ResearchFooter";
import ResearchHeader from "@/components/research/ResearchHeader";
import { motion } from "framer-motion";
import { useState } from "react";

// Mock data - will be replaced with actual API calls
const mockPublications = [
  {
    id: "1",
    title: "Deep Learning Neural Networks: A Comprehensive Study",
    author: "0x7a5f...9d2c",
    description:
      "An extensive research compilation covering fundamental concepts, advanced architectures, and practical implementations of neural networks in modern AI applications.",
    created_at: "2024-01-15",
    itemsCount: 45,
    views: 1247,
    category: "Machine Learning",
  },
  {
    id: "2",
    title: "Blockchain Technology and Decentralized Systems",
    author: "0x3b8e...4f1a",
    description:
      "Comprehensive analysis of blockchain protocols, consensus mechanisms, and their applications in building trustless distributed systems.",
    created_at: "2024-01-10",
    itemsCount: 32,
    views: 892,
    category: "Blockchain",
  },
  {
    id: "3",
    title: "Quantum Computing: Theory and Practice",
    author: "0x9c2d...7b6e",
    description:
      "Research archive documenting quantum computing principles, algorithms, and current developments in quantum hardware and software.",
    created_at: "2024-01-08",
    itemsCount: 28,
    views: 756,
    category: "Quantum Computing",
  },
  {
    id: "4",
    title: "Sustainable Energy Solutions Research",
    author: "0x1f5a...8c3d",
    description:
      "Collection of research papers and findings on renewable energy technologies, efficiency improvements, and environmental impact assessments.",
    created_at: "2024-01-05",
    itemsCount: 38,
    views: 1105,
    category: "Energy",
  },
];

export default function Publishments() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPublications = mockPublications.filter((pub) =>
    pub.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="bg-[#f5f5f3] min-h-screen">
      <ResearchHeader />

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Hero Section - Academic Archive Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="inline-block border-4 border-black bg-white p-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-12 border-4 border-black bg-black flex items-center justify-center">
                <span className="text-3xl">📚</span>
              </div>
              <h1 className="font-mono text-4xl font-bold uppercase tracking-wider text-black">
                Public Research Archive
              </h1>
              <div className="w-12 h-12 border-4 border-black bg-black flex items-center justify-center">
                <span className="text-3xl">🔬</span>
              </div>
            </div>
            <div className="h-1 w-32 bg-black mx-auto mb-4" />
            <p className="font-mono text-sm text-black/70 max-w-2xl">
              Explore publicly shared research collections from scholars and
              researchers worldwide. Browse, learn, and discover new knowledge.
            </p>
          </div>
        </motion.div>

        {/* Search Bar - Card Catalog Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <div className="border-4 border-black bg-white p-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 border-2 border-black flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search public research archives..."
                className="flex-1 font-mono text-base text-black placeholder-black/40 bg-transparent border-none outline-none"
              />
              <button className="border-2 border-black bg-black text-white font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 hover:bg-white hover:text-black transition-all">
                Search
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-8"
        >
          {[
            { label: "Total Archives", value: mockPublications.length },
            {
              label: "Total Items",
              value: mockPublications.reduce((sum, p) => sum + p.itemsCount, 0),
            },
            {
              label: "Total Views",
              value: mockPublications.reduce((sum, p) => sum + p.views, 0),
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="border-4 border-black bg-white p-4 min-w-[180px]"
            >
              <div className="text-center">
                <div className="font-mono text-3xl font-bold text-black mb-1">
                  {stat.value}
                </div>
                <div className="font-mono text-xs uppercase tracking-wider text-black/60">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Publications Grid - Exhibition Style */}
        <div className="space-y-6">
          {filteredPublications.map((pub, idx) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="border-4 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              {/* Header Bar */}
              <div className="border-b-4 border-black bg-black p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border-2 border-white flex items-center justify-center">
                      <span className="text-2xl">📄</span>
                    </div>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider text-white/60">
                        Public Research Archive
                      </div>
                      <div className="font-mono text-sm font-bold text-white">
                        ID: {pub.id}
                      </div>
                    </div>
                  </div>
                  <div className="border-2 border-white bg-white px-4 py-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                      {pub.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid md:grid-cols-[1fr,auto] gap-8">
                  {/* Main Content */}
                  <div className="space-y-4">
                    <div>
                      <h2 className="font-mono text-2xl font-bold uppercase tracking-wider text-black mb-3">
                        {pub.title}
                      </h2>
                      <p className="font-mono text-sm text-black/70 leading-relaxed">
                        {pub.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-6 font-mono text-xs text-black/60">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-black" />
                        <span>Author: {pub.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-black" />
                        <span>
                          Published:{" "}
                          {new Date(pub.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <button className="border-2 border-black bg-black text-white font-mono text-sm font-bold uppercase tracking-wider px-8 py-3 hover:bg-white hover:text-black transition-all">
                      View Research Archive →
                    </button>
                  </div>

                  {/* Stats Sidebar */}
                  <div className="border-l-4 border-black pl-8 space-y-4">
                    <div className="border-2 border-black p-4">
                      <div className="text-center">
                        <div className="font-mono text-3xl font-bold text-black mb-1">
                          {pub.itemsCount}
                        </div>
                        <div className="font-mono text-xs uppercase tracking-wider text-black/60">
                          Items
                        </div>
                      </div>
                    </div>
                    <div className="border-2 border-black p-4">
                      <div className="text-center">
                        <div className="font-mono text-3xl font-bold text-black mb-1">
                          {pub.views}
                        </div>
                        <div className="font-mono text-xs uppercase tracking-wider text-black/60">
                          Views
                        </div>
                      </div>
                    </div>
                    <div className="border-2 border-black bg-black p-3">
                      <div className="text-center font-mono text-xs font-bold uppercase tracking-wider text-white">
                        Public
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPublications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-4 border-black bg-white p-16 text-center"
          >
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="font-mono text-xl font-bold uppercase tracking-wider text-black mb-2">
              No Archives Found
            </h3>
            <p className="font-mono text-sm text-black/60">
              Try adjusting your search query to find research archives.
            </p>
          </motion.div>
        )}
      </div>

      <ResearchFooter />
    </main>
  );
}
