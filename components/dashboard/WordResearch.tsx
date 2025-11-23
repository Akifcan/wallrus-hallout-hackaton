"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import WordResearchForm from "./WordResearchForm";
import WordResearchResults from "./WordResearchResults";
import Hint from "@/components/ui/Hint";

export default function WordResearch() {
  const [searchData, setSearchData] = useState<{
    results: WordResearchResult[];
    researchId: string;
  } | null>(null);
  const [showForm, setShowForm] = useState(true);

  const handleSearchComplete = (data: WordResearchResponse) => {
    setSearchData({
      results: data.results.results,
      researchId: data.researchId,
    });
    setShowForm(false);
  };

  const handleNewSearch = () => {
    setShowForm(true);
    setSearchData(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <Hint
        title="How to use Word Research"
        description="Word Research helps you find specific information across the web using advanced search techniques. You can search with just keywords, or narrow results by searching within a specific website."
        tips={[
          "Use specific keywords for better results (e.g., 'machine learning tutorial' instead of 'AI')",
          "Enable 'Search in specific site' to limit results to a particular domain",
          "Combine multiple keywords to narrow down your search",
          "Results are automatically saved to Walrus decentralized storage",
        ]}
      />

      <AnimatePresence mode="wait">
        {showForm ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <WordResearchForm onSearchComplete={handleSearchComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="border-2 border-black bg-white p-4">
              <button
                onClick={handleNewSearch}
                className="w-full border-2 border-black bg-white text-black font-mono text-sm font-bold uppercase tracking-wider py-3 hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
              >
                ← New Search
              </button>
            </div>
            {searchData && (
              <WordResearchResults
                results={searchData.results}
                researchId={searchData.researchId}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
