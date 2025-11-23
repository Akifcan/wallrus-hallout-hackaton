"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useCurrentAccount } from "@mysten/dapp-kit";

export default function Notes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [projectId, setProjectId] = useState("");
  const currentAccount = useCurrentAccount();

  const { data: projectsData, isLoading: projectsLoading } = useQuery({
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

  const createNoteMutation = useMutation({
    mutationFn: async (noteData: {
      title: string;
      content: string;
      project_id: string;
    }) => {
      const response = await fetch("/api/create-note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-wallet-address": currentAccount?.address || "",
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      return response.json();
    },
    onSuccess: () => {
      setTitle("");
      setContent("");
      setProjectId("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNoteMutation.mutate({
      title,
      content,
      project_id: projectId,
    });
  };

  const handleClear = () => {
    setTitle("");
    setContent("");
    setProjectId("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Create New Note */}
      <div className="border-2 border-black bg-white p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-black">
            Create Note
          </h2>
          <div className="w-6 h-6 border-2 border-black bg-black" />
        </div>
        <div className="h-1 w-16 bg-black mb-6" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
              Note Title
            </label>
            <div className="border-2 border-black bg-white p-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                className="w-full font-mono text-base text-black placeholder-black/40 bg-transparent border-none outline-none"
                required
                disabled={createNoteMutation.isPending}
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
              Note Content
            </label>
            <div className="border-2 border-black bg-white p-4">
              <textarea
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note here..."
                className="w-full font-mono text-base text-black placeholder-black/40 bg-transparent border-none outline-none resize-none"
                required
                disabled={createNoteMutation.isPending}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
                Project
              </label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full border-2 border-black bg-white p-4 font-mono text-base text-black"
                required
                disabled={createNoteMutation.isPending || projectsLoading}
              >
                <option value="">Select a project...</option>
                {projectsData?.projects?.map((project: any) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {createNoteMutation.isError && (
            <p className="font-mono text-xs text-red-600">
              Failed to create note. Please try again.
            </p>
          )}

          {createNoteMutation.isSuccess && (
            <p className="font-mono text-xs text-green-600">
              Note created successfully!
            </p>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 border-2 border-black bg-black text-white font-mono text-sm font-bold uppercase tracking-wider py-4 hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={createNoteMutation.isPending}
            >
              {createNoteMutation.isPending ? "Saving..." : "Save Note"}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-8 py-4 border-2 border-black bg-white text-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={createNoteMutation.isPending}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
