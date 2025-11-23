"use client";

import ResearchFooter from "@/components/research/ResearchFooter";
import ResearchHeader from "@/components/research/ResearchHeader";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import instance from "@/lib/api";
import { motion } from "framer-motion";
import PublicSummaries from "@/components/publishments/PublicSummaries";
import PublicNotes from "@/components/publishments/PublicNotes";
import PublicWordResearch from "@/components/publishments/PublicWordResearch";

interface Publication {
  title: string;
  wallet: string;
  slug: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_number: string | null;
  is_public: string;
  created_at: string;
}

export default function PublicationDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["publication", slug],
    queryFn: async () => {
      const response = await instance.get(`/api/publications/${slug}`);
      return response.data;
    },
  });

  const publication: Publication | null = data?.publication || null;

  return (
    <main className="bg-[#f5f5f3] min-h-screen">
      <ResearchHeader />

      <div className="max-w-5xl mx-auto px-4 py-8 pt-28 min-h-[80vh]">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/publishments")}
          className="font-mono text-sm font-bold uppercase tracking-wider border-2 border-black bg-white px-4 py-2 hover:bg-black hover:text-white transition-colors mb-6"
        >
          Back to Archives
        </motion.button>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-black border-t-transparent animate-spin mx-auto" />
              <p className="font-mono text-sm uppercase tracking-wider">Loading publication...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-4 border-black bg-white p-16 text-center"
          >
            <div className="text-6xl mb-6">X</div>
            <h3 className="font-mono text-xl font-bold uppercase tracking-wider text-black mb-2">
              Publication Not Found
            </h3>
            <p className="font-mono text-sm text-black/60">
              This publication does not exist or is not public.
            </p>
          </motion.div>
        )}

        {/* Publication Detail */}
        {!isLoading && !isError && publication && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header Card */}
            <div className="border-4 border-black bg-white">
              <div className="border-b-4 border-black bg-black p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border-2 border-white flex items-center justify-center">
                      <span className="text-2xl text-white">*</span>
                    </div>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider text-white/60">
                        Public Research Archive
                      </div>
                      <div className="font-mono text-sm font-bold text-white">
                        {publication.slug}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider px-3 py-1 bg-white text-black">
                    PUBLIC
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h1 className="font-mono text-2xl md:text-3xl font-bold uppercase tracking-wider text-black">
                  {publication.title}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-black p-4">
                    <div className="font-mono text-xs uppercase tracking-wider text-black/60 mb-1">
                      Author
                    </div>
                    <div className="font-mono text-sm font-bold text-black">
                      {publication.contact_name || "Anonymous"}
                    </div>
                  </div>

                  {publication.contact_email && (
                    <div className="border-2 border-black p-4">
                      <div className="font-mono text-xs uppercase tracking-wider text-black/60 mb-1">
                        Email
                      </div>
                      <div className="font-mono text-sm font-bold text-black">
                        {publication.contact_email}
                      </div>
                    </div>
                  )}

                  {publication.contact_number && (
                    <div className="border-2 border-black p-4">
                      <div className="font-mono text-xs uppercase tracking-wider text-black/60 mb-1">
                        Phone
                      </div>
                      <div className="font-mono text-sm font-bold text-black">
                        {publication.contact_number}
                      </div>
                    </div>
                  )}

                  <div className="border-2 border-black p-4">
                    <div className="font-mono text-xs uppercase tracking-wider text-black/60 mb-1">
                      Wallet
                    </div>
                    <div className="font-mono text-xs text-black truncate">
                      {publication.wallet}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Research Content */}
            <div className="border-4 border-black bg-white p-6 space-y-8">
              <PublicSummaries slug={slug} />
              <PublicNotes slug={slug} />
              <PublicWordResearch slug={slug} />
            </div>
          </motion.div>
        )}
      </div>

      <ResearchFooter />
    </main>
  );
}
