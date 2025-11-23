"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useCurrentAccount } from "@mysten/dapp-kit";
import instance from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LastCreatedProjects() {
  const currentAccount = useCurrentAccount();
  const router = useRouter()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["recent-projects", currentAccount?.address],
    queryFn: async () => {
      const response = await instance.get("/api/get-recent-projects");
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="border-2 border-black bg-white p-3">
        <p className="font-mono text-xs text-black/60 text-center">
          Loading...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="border-2 border-black bg-white p-3">
        <p className="font-mono text-xs text-red-600 text-center">
          Failed to load
        </p>
      </div>
    );
  }

  if (!data?.projects || data.projects.length === 0) {
    return (
      <div className="border-2 border-black bg-white p-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-black" />
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-black">
            Recent Projects
          </h3>
          <span className="font-mono text-xs text-black/60">
            - No projects yet
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-black bg-white p-3">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {data.projects.map((project: any, idx: number) => (
          <motion.div
            onClick={() => router.push(`/project/${project.slug}`)}
            key={project.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="border border-black bg-white px-3 py-2 hover:bg-black hover:text-white transition-all cursor-pointer group min-w-[160px]"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-black group-hover:text-white">
                📁
              </span>
              <span className="font-mono text-xs font-bold text-black group-hover:text-white truncate">
                {project.title}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
