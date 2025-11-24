"use client";

import ResearchFooter from "@/components/research/ResearchFooter";
import ResearchHeader from "@/components/research/ResearchHeader";
import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import instance from "@/lib/api";
import Link from "next/link";
import WalrusCTA from "@/components/common/WalrusCTA";

interface Publication {
  title: string;
  wallet: string;
  slug: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_number: string | null;
  is_public: string;
}

export default function Publishments() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["publications"],
    queryFn: async () => {
      const response = await instance.get("/api/publications");
      return response.data;
    },
  });

  const publications: Publication[] = data?.publications || [];

  const filteredPublications = publications.filter((pub) => {
    const query = searchQuery.toLowerCase();
    return (
      pub.title.toLowerCase().includes(query) ||
      pub.slug.toLowerCase().includes(query) ||
      (pub.contact_name && pub.contact_name.toLowerCase().includes(query)) ||
      (pub.contact_email && pub.contact_email.toLowerCase().includes(query))
    );
  });

  return (
    <main className="bg-[#f5f5f3] min-h-screen">
      <ResearchHeader />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 pt-28 min-h-[80vh]">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-4 border-black bg-white p-4"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-black bg-black flex items-center justify-center">
                <span className="text-xl">📚</span>
              </div>
              <div>
                <h1 className="font-mono text-xl font-bold uppercase tracking-wider text-black">
                  Public Research Archive
                </h1>
                <p className="font-mono text-xs text-black/60">
                  {data?.count || 0} public archives available
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search archives..."
                className="flex-1 font-mono text-sm text-black placeholder-black/40 bg-transparent border-2 border-black px-3 py-2 outline-none"
              />
              <button className="border-2 border-black bg-black text-white font-mono text-xs font-bold uppercase px-4 py-2 hover:bg-white hover:text-black transition-all">
                🔍
              </button>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-black border-t-transparent animate-spin mx-auto" />
              <p className="font-mono text-sm uppercase tracking-wider">Loading publications...</p>
            </div>
          </div>
        )}

        {/* Publications Grid - Compact Style */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPublications.map((pub, idx) => (
              <motion.div
                key={pub.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx }}
                className="border-4 border-black bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                {/* Header */}
                <div className="border-b-2 border-black bg-black px-4 py-2 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-white truncate max-w-[150px]">
                    {pub.slug}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 bg-white text-black">
                    {pub.contact_name ? "Verified" : "Anon"}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-black line-clamp-2">
                    {pub.title}
                  </h3>

                  <div className="font-mono text-xs text-black/60 space-y-1">
                    <div className="flex items-center gap-2">
                      <span>👤</span>
                      <span>{pub.contact_name || "Anonymous"}</span>
                    </div>
                    {pub.contact_email && (
                      <div className="flex items-center gap-2">
                        <span>✉️</span>
                        <span className="truncate">{pub.contact_email}</span>
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/publishments/${pub.slug}`}
                    className="block w-full text-center border-2 border-black bg-black text-white font-mono text-xs font-bold uppercase tracking-wider px-4 py-2 hover:bg-white hover:text-black transition-all"
                  >
                    View →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredPublications.length === 0 && (
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
              {searchQuery
                ? "Try adjusting your search query to find research archives."
                : "No public research archives available yet."}
            </p>
          </motion.div>
        )}

        {/* CTA Section */}
        <WalrusCTA />
      </div>

      <ResearchFooter />
    </main>
  );
}
