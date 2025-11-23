import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import instance from "@/lib/api";

interface PublicSummariesProps {
  slug: string;
}

export default function PublicSummaries({ slug }: PublicSummariesProps) {
  const [expandedSummary, setExpandedSummary] = useState<number | null>(null);

  const { data: summariesData, isLoading } = useQuery({
    queryKey: ["public-summaries", slug],
    queryFn: async () => {
      const response = await instance.get(`/api/publications/${slug}/summaries`);
      return response.data;
    },
  });

  const summaries = summariesData?.summaries || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold uppercase tracking-wider border-b-2 border-black pb-2">
          Summaries
        </h2>
        <div className="border-2 border-black bg-white p-8 text-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  if (!summaries || summaries.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold uppercase tracking-wider border-b-2 border-black pb-2">
          Summaries
        </h2>
        <div className="border-2 border-black bg-white p-8 text-center">
          <p className="font-mono text-sm text-black/60">No summaries available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-mono text-lg font-bold uppercase tracking-wider border-b-2 border-black pb-2">
        Summaries ({summaries.length})
      </h2>
      <div className="space-y-3">
        {summaries.map((summary: any) => (
          <motion.div
            key={summary.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-2 border-black bg-white p-4"
          >
            <p
              className={`font-mono text-sm text-black/80 ${
                expandedSummary === summary.id ? "" : "line-clamp-3"
              }`}
            >
              {summary.content?.result}
            </p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/10">
              <span className="font-mono text-xs text-black/40">
                {new Date(summary.created_at).toLocaleDateString()}
              </span>
              <button
                onClick={() =>
                  setExpandedSummary(expandedSummary === summary.id ? null : summary.id)
                }
                className="font-mono text-xs font-bold uppercase border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors"
              >
                {expandedSummary === summary.id ? "Less" : "More"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
