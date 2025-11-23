"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import instance from "@/lib/api";
import { toast } from "sonner";

interface GenerateSummaryFormProps {
  onSummaryComplete: (data: {
    summary: string;
    summaryId: string;
    content: string;
    language: string;
    summaryLength: string;
  }) => void;
}

export default function GenerateSummaryForm({
  onSummaryComplete,
}: GenerateSummaryFormProps) {
  const [content, setContent] = useState("");
  const [summaryLength, setSummaryLength] = useState("short");
  const [language, setLanguage] = useState("English");

  const summarizeMutation = useMutation({
    mutationFn: async (data: {
      content: string;
      summaryLength: string;
      language: string;
    }) => {
      const response = await instance.post("/api/summary/results", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Summary generated successfully!");
      onSummaryComplete({
        summary: data.summary,
        summaryId: data.summaryId,
        content,
        language,
        summaryLength,
      });
    },
    onError: (e) => {
      console.log(e);
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
    <div className="border-2 border-black bg-white p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-black">
          Generate Summary
        </h2>
        <div className="w-6 h-6 border-2 border-black bg-black" />
      </div>
      <div className="h-1 w-16 bg-black mb-6" />

      <form onSubmit={handleSubmit} className="space-y-6">
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
      </form>
    </div>
  );
}
