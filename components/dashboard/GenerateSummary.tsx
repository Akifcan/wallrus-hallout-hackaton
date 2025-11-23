"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import instance from "@/lib/api";
import { toast } from "sonner";
import Hint from "@/components/ui/Hint";

export default function GenerateSummary() {
  const [content, setContent] = useState("");
  const [summaryLength, setSummaryLength] = useState("short");
  const [language, setLanguage] = useState("English");
  const [isFormCollapsed, setIsFormCollapsed] = useState(false);

  const summarizeMutation = useMutation({
    mutationFn: async (data: {
      content: string;
      summaryLength: string;
      language: string;
    }) => {
      const response = await instance.post("/api/summary/results", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Summary generated successfully!");
      setIsFormCollapsed(true);
    },
    onError: (e) => {
      console.log(e)
      toast.error("Failed to generate summary. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    summarizeMutation.mutate({
      content,
      summaryLength,
      language,
    });
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

      <div className="border-2 border-black bg-white p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-black">
            Generate Summary
          </h2>
          <div className="flex items-center gap-4">
            {summarizeMutation.isSuccess && (
              <button
                type="button"
                onClick={() => setIsFormCollapsed(!isFormCollapsed)}
                className="border-2 border-black bg-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all"
              >
                {isFormCollapsed ? "Show Form ↓" : "Hide Form ↑"}
              </button>
            )}
            <div className="w-6 h-6 border-2 border-black bg-black" />
          </div>
        </div>
        <div className="h-1 w-16 bg-black mb-6" />

        <AnimatePresence>
          {!isFormCollapsed && (
            <motion.form
              initial={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
                  Input Text
                </label>
                <div className="border-2 border-black bg-white p-4">
                  <textarea
                    rows={8}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Paste your text here..."
                    className="w-full font-mono text-base text-black placeholder-black/40 bg-transparent border-none outline-none resize-none"
                    required
                    minLength={10}
                    disabled={summarizeMutation.isPending}
                  />
                </div>
                {content.length > 0 && content.length < 10 && (
                  <p className="font-mono text-xs text-red-600 mt-2">
                    Text must be at least 10 characters long ({content.length}/10)
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
                    Summary Length
                  </label>
                  <select
                    value={summaryLength}
                    onChange={(e) => setSummaryLength(e.target.value)}
                    className="w-full border-2 border-black bg-white p-4 font-mono text-base text-black"
                    disabled={summarizeMutation.isPending}
                  >
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                  </select>
                </div>
                <div>
                  <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full border-2 border-black bg-white p-4 font-mono text-base text-black"
                    disabled={summarizeMutation.isPending}
                  >
                    <option>English</option>
                    <option>Turkish</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>

              {summarizeMutation.isError && (
                <p className="font-mono text-xs text-red-600">
                  Failed to generate summary. Please try again.
                </p>
              )}

              <button
                type="submit"
                className="w-full border-2 border-black bg-black text-white font-mono text-sm font-bold uppercase tracking-wider py-4 hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={summarizeMutation.isPending}
              >
                {summarizeMutation.isPending
                  ? "Generating Summary..."
                  : "Generate Summary →"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Summary Result */}
      {summarizeMutation.isSuccess && summarizeMutation.data?.summary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-2 border-black bg-white p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-black">
              Generated Summary
            </h3>
            <div className="w-4 h-4 border-2 border-black bg-black" />
          </div>
          <div className="h-1 w-16 bg-black mb-6" />

          <div className="border-2 border-black bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-black" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                  {language} • {summaryLength}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-black mb-3">
                  Original Text:
                </h4>
                <div className="border border-black bg-white p-4 max-h-40 overflow-y-auto">
                  <p className="font-mono text-xs text-black/80 whitespace-pre-wrap">
                    {content}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-black mb-3">
                  Summary:
                </h4>
                <div className="border-2 border-black bg-white p-4">
                  <p className="font-mono text-sm text-black whitespace-pre-wrap">
                    {summarizeMutation.data.summary}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(summarizeMutation.data.summary);
                  toast.success("Summary copied to clipboard!");
                }}
                className="flex-1 border-2 border-black bg-white text-black font-mono text-xs font-bold uppercase tracking-wider py-3 hover:bg-black hover:text-white transition-all"
              >
                Copy Summary
              </button>
              <button
                onClick={() => {
                  summarizeMutation.reset();
                  setContent("");
                  setIsFormCollapsed(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="px-6 py-3 border-2 border-black bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all"
              >
                New Summary
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
