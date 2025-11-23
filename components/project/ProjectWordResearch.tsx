import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import instance from "@/lib/api";
import Link from "next/link";
import { useParams } from "next/navigation";


export default function ProjectWordResearch() {
  const params = useParams();
  const slug = params.slug as string;

  const [selectedWordResearch, setSelectedWordResearch] = useState<
    number | null
  >(null);

  const { data: wordResearchData } = useQuery({
    queryKey: ["wordResearch", slug],
    queryFn: async () => {
      const response = await instance.get(`/api/project/${slug}/word-research`);
      return response.data;
    },
  });

  const wordResearch = wordResearchData?.wordResearch || [];

  if (!wordResearch || wordResearch.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="font-mono text-2xl font-bold uppercase tracking-wider border-b-4 border-black pb-2">
          📚 WORD RESEARCH
        </h2>
        <div className="border-4 border-black bg-white p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <p className="font-mono text-lg font-bold uppercase tracking-wider text-black">
            No Word Research Found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-mono text-2xl font-bold uppercase tracking-wider border-b-4 border-black pb-2">
        📚 WORD RESEARCH
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {wordResearch.map((research: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-4 border-black bg-white p-6"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-black/60">
                  {research.content?.count} SOURCES FOUND
                </span>
                <button
                  onClick={() =>
                    setSelectedWordResearch(
                      selectedWordResearch === index ? null : index
                    )
                  }
                  className="font-mono text-xs font-bold uppercase tracking-wider border-2 border-black bg-black text-white px-4 py-2 hover:bg-white hover:text-black transition-colors"
                >
                  {selectedWordResearch === index
                    ? "HIDE SOURCES"
                    : "VIEW ALL SOURCES"}
                </button>
              </div>

              {/* Preview - First Result */}
              {research.content?.results?.[0] &&
                selectedWordResearch !== index && (
                  <div className="pt-3 border-t-2 border-black/10">
                    <div className="border-2 border-black/20 p-4">
                      <a
                        href={research.content.results[0].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-sm font-bold text-black hover:underline"
                      >
                        {research.content.results[0].title}
                      </a>
                      <p className="font-mono text-xs text-black/60 mt-2">
                        {research.content.results[0].snippet}
                      </p>
                      <a
                        href={research.content.results[0].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-black/40 hover:text-black mt-1 inline-block break-all"
                      >
                        {research.content.results[0].link}
                      </a>
                    </div>
                  </div>
                )}

              {selectedWordResearch === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-4 border-t-2 border-black/10 space-y-3 flex flex-col gap-2"
                >
                  {research.content?.results?.map(
                    (result: any, resultIndex: number) => (
                      <Link href={result.link} target="_blank" key={resultIndex}>
                        <div className="border-2 border-black/20 p-4 hover:border-black transition-colors">
                          <p className="font-mono text-sm font-bold text-black hover:underline">
                            {result.title}
                          </p>
                          <p className="font-mono text-xs text-black/60 mt-2">
                            {result.snippet}
                          </p>
                          <p className="font-mono text-xs text-black/40 hover:text-black mt-1 inline-block break-all">
                            {result.link}
                          </p>
                        </div>
                      </Link>
                    )
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
