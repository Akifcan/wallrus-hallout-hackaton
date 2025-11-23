"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import NewFolderDialog from "./NewFolderDialog";
import { useQuery } from "@tanstack/react-query";
import { useCurrentAccount } from "@mysten/dapp-kit";

export default function FoldersProjects() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const currentAccount = useCurrentAccount();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects", currentAccount?.address],
    queryFn: async () => {
      const response = await fetch("/api/get-projects", {
        headers: {
          "x-wallet-address": currentAccount?.address || "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      return response.json();
    },
    enabled: !!currentAccount?.address,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-black">
          Folders & Projects
        </h2>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="px-6 py-3 border-2 border-black bg-black text-white font-mono text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all"
        >
          + New Folder
        </button>
      </div>

      <NewFolderDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />

      {/* Folders Grid */}
      {isLoading && (
        <div className="border-2 border-black bg-white p-8">
          <p className="font-mono text-sm text-black text-center">
            Loading projects...
          </p>
        </div>
      )}

      {isError && (
        <div className="border-2 border-black bg-white p-8">
          <p className="font-mono text-sm text-red-600 text-center">
            Failed to load projects. Please try again.
          </p>
        </div>
      )}

      {!isLoading && !isError && data?.projects && (
        <>
          {data.projects.length === 0 ? (
            <div className="border-2 border-black bg-white p-8">
              <p className="font-mono text-sm text-black/60 text-center">
                No projects yet. Create your first project!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.projects.map((project: any, idx: number) => {
                const colors = ["bg-black", "bg-white"];
                const color = colors[idx % 2];

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="border-2 border-black bg-white p-6 hover:bg-black hover:text-white transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 border-2 border-black ${color} group-hover:bg-white group-hover:border-white flex items-center justify-center`}
                      >
                        <span
                          className={`font-mono text-lg font-black ${
                            color === "bg-black" ? "text-white" : "text-black"
                          } group-hover:text-black`}
                        >
                          📁
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 border border-black bg-black group-hover:bg-white" />
                        <div className="w-2 h-2 border border-black bg-white group-hover:bg-black" />
                      </div>
                    </div>
                    <h3 className="font-mono text-lg font-bold uppercase tracking-wider mb-2">
                      {project.title}
                    </h3>
                    <div className="h-1 w-12 bg-black group-hover:bg-white mb-4" />
                    <p className="font-mono text-sm text-black/60 group-hover:text-white/80">
                      0 items
                    </p>
                  </motion.div>
                );
              })}
            </div>
          )}
        </>
      )}

    </motion.div>
  );
}
