"use client";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import instance from "@/lib/api";
import Link from "next/link";

const mockFiles = [
  {
    id: "1",
    type: "word_research",
    title: "Deep Learning Fundamentals",
    date: "2024-01-20",
    itemsCount: 15,
    icon: "📚",
  },
  {
    id: "2",
    type: "summary",
    title: "Neural Networks Overview",
    date: "2024-01-19",
    itemsCount: 1,
    icon: "📝",
  },
  {
    id: "3",
    type: "file_research",
    title: "Research Papers Collection",
    date: "2024-01-18",
    itemsCount: 8,
    icon: "📄",
  },
  {
    id: "4",
    type: "note",
    title: "Important Notes and Ideas",
    date: "2024-01-17",
    itemsCount: 1,
    icon: "✍️",
  },
];

const typeLabels: Record<string, string> = {
  word_research: "Web Research",
  summary: "Summary",
  file_research: "File Archive",
  note: "Personal Note",
};

export default function Project() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [expandedSummary, setExpandedSummary] = useState<number | null>(null);
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [selectedWordResearch, setSelectedWordResearch] = useState<number | null>(null);

  const { data: summariesData, isLoading: summariesLoading, isError: summariesError } = useQuery({
    queryKey: ["summaries", slug],
    queryFn: async () => {
      const response = await instance.get(`/api/project/${slug}/summaries`);
      return response.data;
    },
  });

  const { data: notesData, isLoading: notesLoading, isError: notesError } = useQuery({
    queryKey: ["notes", slug],
    queryFn: async () => {
      const response = await instance.get(`/api/project/${slug}/notes`);
      return response.data;
    },
  });

  const { data: wordResearchData, isLoading: wordResearchLoading, isError: wordResearchError } = useQuery({
    queryKey: ["wordResearch", slug],
    queryFn: async () => {
      const response = await instance.get(`/api/project/${slug}/word-research`);
      return response.data;
    },
  });


  if (summariesLoading || notesLoading || wordResearchLoading) {
    return (
      <DashboardLayout title="Project Archive">
        <div className="border-4 border-black bg-white p-12 text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="font-mono text-lg font-bold uppercase tracking-wider text-black">
            Loading...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (summariesError || notesError || wordResearchError) {
    return (
      <DashboardLayout title="Project Archive">
        <div className="border-4 border-black bg-red-50 p-12 text-center">
          <div className="text-6xl mb-4">❌</div>
          <p className="font-mono text-lg font-bold uppercase tracking-wider text-black">
            Error Loading Data
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Project Archive">
      <div className="space-y-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="font-mono text-sm font-bold uppercase tracking-wider border-4 border-black bg-white px-6 py-3 hover:bg-black hover:text-white transition-colors flex items-center gap-2"
        >
          ← BACK TO DASHBOARD
        </button>

        {/* Summaries Section */}
        <div className="space-y-4">
          <h2 className="font-mono text-2xl font-bold uppercase tracking-wider border-b-4 border-black pb-2">
            📝 SUMMARIES
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {summariesData?.summaries?.map((summary: any) => (
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

          {/* Empty State */}
          {(!summariesData?.summaries || summariesData.summaries.length === 0) && (
            <div className="border-4 border-black bg-white p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <p className="font-mono text-lg font-bold uppercase tracking-wider text-black">
                No Summaries Found
              </p>
            </div>
          )}
        </div>

        {/* Notes Section */}
        <div className="space-y-4">
          <h2 className="font-mono text-2xl font-bold uppercase tracking-wider border-b-4 border-black pb-2">
            ✍️ NOTES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notesData?.notes?.map((note: any) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-4 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                onClick={() => setSelectedNote(selectedNote === note.id ? null : note.id)}
              >
                <div className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-black">
                      {note.content?.title}
                    </h3>
                    <span className="text-2xl">📝</span>
                  </div>

                  {selectedNote === note.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-3 border-t-2 border-black/10"
                    >
                      <p className="font-mono text-sm text-black/80 whitespace-pre-wrap">
                        {note.content?.content}
                      </p>
                    </motion.div>
                  )}

                  <div className="flex items-center gap-4 pt-2 border-t-2 border-black/10">
                    <span className="font-mono text-xs text-black/60">
                      {new Date(note.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {(!notesData?.notes || notesData.notes.length === 0) && (
            <div className="border-4 border-black bg-white p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <p className="font-mono text-lg font-bold uppercase tracking-wider text-black">
                No Notes Found
              </p>
            </div>
          )}
        </div>

        {/* Word Research Section */}
        <div className="space-y-4">
          <h2 className="font-mono text-2xl font-bold uppercase tracking-wider border-b-4 border-black pb-2">
            📚 WORD RESEARCH
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {wordResearchData?.wordResearch?.map((research: any, index: number) => (
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
                      {selectedWordResearch === index ? "HIDE SOURCES" : "VIEW ALL SOURCES"}
                    </button>
                  </div>

                  {/* Preview - First Result */}
                  {research.content?.results?.[0] && selectedWordResearch !== index && (
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
                      {research.content?.results?.map((result: any, resultIndex: number) => (
                        <Link href={result.link} target="_blank">
                          <div
                            key={resultIndex}
                            className="border-2 border-black/20 p-4 hover:border-black transition-colors"
                          >
                            <p
                              className="font-mono text-sm font-bold text-black hover:underline"
                            >
                              {result.title}
                            </p>
                            <p className="font-mono text-xs text-black/60 mt-2">
                              {result.snippet}
                            </p>
                            <p
                              className="font-mono text-xs text-black/40 hover:text-black mt-1 inline-block break-all"
                            >
                              {result.link}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {(!wordResearchData?.wordResearch || wordResearchData.wordResearch.length === 0) && (
            <div className="border-4 border-black bg-white p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <p className="font-mono text-lg font-bold uppercase tracking-wider text-black">
                No Word Research Found
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}