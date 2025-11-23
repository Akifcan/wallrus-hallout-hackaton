"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import instance from "@/lib/api";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface WordResearchFormProps {
  onSearchComplete: (data: WordResearchResponse) => void;
}

export default function WordResearchForm({
  onSearchComplete,
}: WordResearchFormProps) {
  const [site, setSite] = useState("");
  const [keyword, setKeyword] = useState("");
  const [useSiteUrl, setUseSiteUrl] = useState(false);

  const searchMutation = useMutation({
    mutationFn: async (searchData: { site: string; keyword: string }) => {
      const response = await instance.post(
        "/api/word-research/results",
        searchData
      );
      return response.data;
    },
    onSuccess: (data: WordResearchResponse) => {
      toast.success("Search completed successfully!");
      onSearchComplete(data);
    },
    onError: () => {
      toast.error("Failed to complete search. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchMutation.mutate({
      site: useSiteUrl && site ? site : "",
      keyword,
    });
  };

  const handleClear = () => {
    setSite("");
    setKeyword("");
    setUseSiteUrl(false);
  };

  return (
    <div className="border-2 border-black bg-white p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-black">
          Word Research
        </h2>
        <div className="w-6 h-6 border-2 border-black bg-black" />
      </div>
      <div className="h-1 w-16 bg-black mb-6" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
            Search Keyword
          </label>
          <div className="border-2 border-black bg-white p-4">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter your research keyword..."
              className="w-full font-mono text-base text-black placeholder-black/40 bg-transparent border-none outline-none"
              required
              disabled={searchMutation.isPending}
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={useSiteUrl}
              onChange={(e) => setUseSiteUrl(e.target.checked)}
              disabled={searchMutation.isPending}
              className="w-5 h-5 border-2 border-black accent-black cursor-pointer"
            />
            <span className="font-mono text-sm font-bold uppercase tracking-wider text-black">
              Search in specific site
            </span>
          </label>
        </div>

        <AnimatePresence>
          {useSiteUrl && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div>
                <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
                  Site URL
                </label>
                <div className="border-2 border-black bg-white p-4">
                  <input
                    type="url"
                    value={site}
                    onChange={(e) => setSite(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full font-mono text-base text-black placeholder-black/40 bg-transparent border-none outline-none"
                    disabled={searchMutation.isPending}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {searchMutation.isError && (
          <p className="font-mono text-xs text-red-600">
            Failed to complete search. Please try again.
          </p>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 border-2 border-black bg-black text-white font-mono text-sm font-bold uppercase tracking-wider py-4 hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={searchMutation.isPending}
          >
            {searchMutation.isPending ? "Searching..." : "Start Research →"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-8 py-4 border-2 border-black bg-white text-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={searchMutation.isPending}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
