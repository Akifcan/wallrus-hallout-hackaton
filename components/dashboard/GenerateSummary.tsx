"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Hint from "@/components/ui/Hint";
import GenerateSummaryForm from "./GenerateSummaryForm";
import GenerateSummaryResults from "./GenerateSummaryResults";

export default function GenerateSummary() {
  const [showForm, setShowForm] = useState(true);
  const [summaryData, setSummaryData] = useState<{
    summary: string;
    summaryId: string;
    content: string;
    language: string;
    summaryLength: string;
  } | null>(null);

  const handleSummaryComplete = (data: {
    summary: string;
    summaryId: string;
    content: string;
    language: string;
    summaryLength: string;
  }) => {
    setSummaryData(data);
    setShowForm(false);
  };

  const handleNewSummary = () => {
    setShowForm(true);
    setSummaryData(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <Hint
        title="How to use Generate Summary"
        description="Generate Summary uses AI to create concise summaries of your text content. Simply paste your text, choose the desired summary length and output language, and let the AI do the work."
        tips={[
          "Short summaries are best for quick overviews (2-3 sentences)",
          "Medium summaries provide balanced detail (4-6 sentences)",
          "Long summaries include more comprehensive information",
          "You can summarize in different languages - the AI will translate and summarize",
          "Minimum text length is 10 characters, maximum is 10,000 characters",
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
            <GenerateSummaryForm onSummaryComplete={handleSummaryComplete} />
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
                onClick={handleNewSummary}
                className="w-full border-2 border-black bg-white text-black font-mono text-sm font-bold uppercase tracking-wider py-3 hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
              >
                ← New Summary
              </button>
            </div>

            {summaryData && (
              <GenerateSummaryResults
                summary={summaryData.summary}
                summaryId={summaryData.summaryId}
                content={summaryData.content}
                language={summaryData.language}
                summaryLength={summaryData.summaryLength}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
