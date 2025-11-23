import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import instance from "@/lib/api";
import Link from "next/link";

interface PublicWordResearchProps {
  slug: string;
}

export default function PublicWordResearch({ slug }: PublicWordResearchProps) {
  const [expandedResearch, setExpandedResearch] = useState<number | null>(null);

  const { data: wordResearchData, isLoading } = useQuery({
    queryKey: ["public-word-research", slug],
    queryFn: async () => {
      const response = await instance.get(`/api/publications/${slug}/word-research`);
      return response.data;
    },
  });

  const wordResearch = wordResearchData?.wordResearch || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold uppercase tracking-wider border-b-2 border-black pb-2">
          Word Research
        </h2>
        <div className="border-2 border-black bg-white p-8 text-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  if (!wordResearch || wordResearch.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold uppercase tracking-wider border-b-2 border-black pb-2">
          Word Research
        </h2>
        <div className="border-2 border-black bg-white p-8 text-center">
          <p className="font-mono text-sm text-black/60">No word research available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-mono text-lg font-bold uppercase tracking-wider border-b-2 border-black pb-2">
        Word Research ({wordResearch.length})
      </h2>
      <div className="space-y-3">
        {wordResearch.map((research: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-2 border-black bg-white p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold text-black/60">
                {research.content?.count || 0} sources found
              </span>
              <button
                onClick={() => setExpandedResearch(expandedResearch === index ? null : index)}
                className="font-mono text-xs font-bold uppercase border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors"
              >
                {expandedResearch === index ? "Hide" : "Show All"}
              </button>
            </div>

            {/* Preview first result */}
            {research.content?.results?.[0] && expandedResearch !== index && (
              <div className="border border-black/20 p-3">
                <a
                  href={research.content.results[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm font-bold text-black hover:underline"
                >
                  {research.content.results[0].title}
                </a>
                <p className="font-mono text-xs text-black/60 mt-1 line-clamp-2">
                  {research.content.results[0].snippet}
                </p>
              </div>
            )}

            {/* All results */}
            {expandedResearch === index && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-2"
              >
                {research.content?.results?.map((result: any, resultIndex: number) => (
                  <Link href={result.link} target="_blank" key={resultIndex}>
                    <div className="border border-black/20 p-3 hover:border-black transition-colors">
                      <p className="font-mono text-sm font-bold text-black hover:underline">
                        {result.title}
                      </p>
                      <p className="font-mono text-xs text-black/60 mt-1">
                        {result.snippet}
                      </p>
                      <p className="font-mono text-xs text-black/40 mt-1 truncate">
                        {result.link}
                      </p>
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
