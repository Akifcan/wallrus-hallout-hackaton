import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import instance from "@/lib/api";
import { useParams } from "next/navigation";

export default function ProjectSummaries() {
  const params = useParams();
  const slug = params.slug as string;
  const [expandedSummary, setExpandedSummary] = useState<number | null>(null);

  const { data: summariesData } = useQuery({
    queryKey: ["summaries", slug],
    queryFn: async () => {
      const response = await instance.get(`/api/project/${slug}/summaries`);
      return response.data;
    },
  });

  const summaries = summariesData?.summaries || [];

  if (!summaries || summaries.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="font-mono text-2xl font-bold uppercase tracking-wider border-b-4 border-black pb-2">
          📝 SUMMARIES
        </h2>
        <div className="border-4 border-black bg-white p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <p className="font-mono text-lg font-bold uppercase tracking-wider text-black">
            No Summaries Found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-mono text-2xl font-bold uppercase tracking-wider border-b-4 border-black pb-2">
        📝 SUMMARIES
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {summaries.map((summary: any) => (
          <motion.div
            key={summary.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-4 border-black bg-white p-6"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <p
                  className={`font-mono text-sm text-black/80 ${expandedSummary === summary.id ? "" : "line-clamp-2"
                    }`}
                >
                  {summary.content?.result}
                </p>
              </div>
              <button
                onClick={() =>
                  setExpandedSummary(
                    expandedSummary === summary.id ? null : summary.id
                  )
                }
                className="font-mono text-xs font-bold uppercase tracking-wider border-2 border-black bg-black text-white px-4 py-2 hover:bg-white hover:text-black transition-colors"
              >
                {expandedSummary === summary.id ? "COLLAPSE" : "VIEW"}
              </button>
              <div className="flex items-center gap-4 pt-2 border-t-2 border-black/10">
                <span className="font-mono text-xs text-black/60">
                  {new Date(summary.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
