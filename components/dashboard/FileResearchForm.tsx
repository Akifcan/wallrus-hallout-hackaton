"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import instance from "@/lib/api";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const fileTypes = [
  { label: "PDF", icon: "📄", value: ".pdf" },
  { label: "DOC", icon: "📝", value: ".doc" },
  { label: "DOCX", icon: "📝", value: ".docx" },
  { label: "TXT", icon: "📃", value: ".txt" },
  { label: "MD", icon: "📋", value: ".md" },
  { label: "XLSX", icon: "📊", value: ".xlsx" },
  { label: "CSV", icon: "📊", value: ".csv" },
  { label: "PPT", icon: "📊", value: ".ppt" },
  { label: "JSON", icon: "🔧", value: ".json" },
  { label: "XML", icon: "🔧", value: ".xml" },
  { label: "HTML", icon: "🌐", value: ".html" },
  { label: "CSS", icon: "🎨", value: ".css" },
  { label: "JS", icon: "⚡", value: ".js" },
  { label: "ZIP", icon: "🗜️", value: ".zip" },
  { label: "JPG", icon: "🖼️", value: ".jpg" },
  { label: "PNG", icon: "🖼️", value: ".png" },
  { label: "GIF", icon: "🖼️", value: ".gif" },
  { label: "MP4", icon: "🎬", value: ".mp4" },
  { label: "MP3", icon: "🎵", value: ".mp3" },
];

interface FileResearchFormProps {
  onSearchComplete: (data: FileResearchResponse) => void;
}

export default function FileResearchForm({
  onSearchComplete,
}: FileResearchFormProps) {
  const [keyword, setKeyword] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [useSiteUrl, setUseSiteUrl] = useState(false);
  const [site, setSite] = useState("");

  const searchMutation = useMutation({
    mutationFn: async (searchData: {
      type?: string;
      keyword: string;
      site?: string;
    }) => {
      const response = await instance.post(
        "/api/upload-file/results",
        searchData
      );
      return response.data;
    },
    onSuccess: (data: FileResearchResponse) => {
      toast.success("File search completed successfully!");
      onSearchComplete(data);
    },
    onError: () => {
      toast.error("Failed to complete file search. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchMutation.mutate({
      type: selectedType || undefined,
      keyword,
      site: useSiteUrl && site ? site : undefined,
    });
  };

  const handleClear = () => {
    setKeyword("");
    setSelectedType("");
    setUseSiteUrl(false);
    setSite("");
  };

  return (
    <div className="border-2 border-black bg-white p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-black">
          File Research
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
              placeholder="Enter your search keyword..."
              className="w-full font-mono text-base text-black placeholder-black/40 bg-transparent border-none outline-none"
              required
              disabled={searchMutation.isPending}
            />
          </div>
        </div>

        <div>
          <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
            File Type
          </label>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {fileTypes.map((type) => (
              <button
                key={type.label}
                type="button"
                onClick={() => setSelectedType(type.value)}
                disabled={searchMutation.isPending}
                className={`border-2 p-3 font-mono text-xs font-bold uppercase transition-all flex flex-col items-center justify-center gap-1 disabled:opacity-50 ${
                  selectedType === type.value
                    ? "border-black bg-black text-white"
                    : "border-black bg-white text-black hover:bg-black hover:text-white"
                }`}
              >
                <span className="text-2xl">{type.icon}</span>
                <span className="text-[10px]">{type.label}</span>
              </button>
            ))}
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
            Failed to complete file search. Please try again.
          </p>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 border-2 border-black bg-black text-white font-mono text-sm font-bold uppercase tracking-wider py-4 hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={searchMutation.isPending}
          >
            {searchMutation.isPending ? "Searching..." : "Find Files →"}
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
