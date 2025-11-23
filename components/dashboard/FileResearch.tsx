"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import FileResearchForm from "./FileResearchForm";
import FileResearchResults from "./FileResearchResults";
import Hint from "@/components/ui/Hint";

export default function FileResearch() {
  const [searchData, setSearchData] = useState<{
    results: FileSearchResult[];
    researchId: string;
  } | null>(null);
  const [showForm, setShowForm] = useState(true);

  const handleSearchComplete = (data: FileResearchResponse) => {
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
        title="How to use File Research"
        description="File Research helps you find specific file types across the web using advanced search techniques. You can search by keyword and file type, and optionally narrow results to a specific website."
        tips={[
          "Select a file type to search for specific formats (PDF, DOC, images, etc.)",
          "Use specific keywords for better results",
          "Enable 'Search in specific site' to limit results to a particular domain",
          "Click 'Save' next to any file to add it to your project",
          "File type icons help you quickly identify document types",
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
            <FileResearchForm onSearchComplete={handleSearchComplete} />
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
            {searchData && <FileResearchResults results={searchData.results} />}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
