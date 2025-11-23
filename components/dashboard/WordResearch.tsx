"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import WordResearchForm from "./WordResearchForm";
import WordResearchResults from "./WordResearchResults";

export default function WordResearch() {
  const [searchData, setSearchData] = useState<WordResearchResult[] | null>(
    null
  );
  const [showForm, setShowForm] = useState(true);

  const handleSearchComplete = (data: WordResearchResponse) => {
    setSearchData(data.results.results);
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
            {searchData && <WordResearchResults results={searchData} />}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
