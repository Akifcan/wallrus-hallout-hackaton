"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useCurrentAccount } from "@mysten/dapp-kit";
import instance from "@/lib/api";
import { toast } from "sonner";

interface WordResearchResultsProps {
  results: WordResearchResult[];
}

export default function WordResearchResults({
  results,
}: WordResearchResultsProps) {
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

  const saveMutation = useMutation({
    mutationFn: async (saveData: SaveWordResearchRequest) => {
      const response = await instance.post(
        "/api/word-research/save",
        saveData
      );
      return response.data;
    },
    onSuccess: () => {
      setProjectId("");
      toast.success("Word research saved successfully!");
    },
    onError: () => {
      toast.error("Failed to save word research. Please try again.");
    },
  });

  const handleSave = () => {
    if (!projectId) {
      toast.error("Please select a project");
      return;
    }

    saveMutation.mutate({
      results: {
        results,
        count: results.length,
      },
      project_id: projectId,
    });
  };

  return (
    <div className="space-y-8">
      {/* Search Results */}
      <div className="border-2 border-black bg-white p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-black">
            Search Results
          </h3>
          <div className="w-4 h-4 border-2 border-black bg-black" />
        </div>
        <div className="h-1 w-16 bg-black mb-6" />

        <div className="space-y-4">
          {results && Array.isArray(results) && results.length > 0 ? (
            results.map((result: WordResearchResult, idx: number) => (
              <div
                key={idx}
                className="border-2 border-black bg-white p-4 hover:bg-black hover:text-white transition-all group"
              >
                <a
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h4 className="font-mono text-sm font-bold mb-2">
                    {result.title}
                  </h4>
                  <p className="font-mono text-xs mb-2 opacity-70">
                    {result.snippet}
                  </p>
                  <span className="font-mono text-xs opacity-50 group-hover:opacity-100">
                    {result.link}
                  </span>
                </a>
              </div>
            ))
          ) : (
            <p className="font-mono text-sm text-black/60">
              No results found
            </p>
          )}
        </div>

      </div>

      {/* Save Section */}
      <div className="border-2 border-black bg-white p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-black">
            Save Research
          </h3>
          <div className="w-4 h-4 border-2 border-black bg-black" />
        </div>
        <div className="h-1 w-16 bg-black mb-6" />

        <div className="space-y-6">
          <div>
            <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
              Project
            </label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full border-2 border-black bg-white p-4 font-mono text-base text-black"
              disabled={saveMutation.isPending || projectsLoading}
            >
              <option value="">Select a project...</option>
              {projectsData?.projects?.map((project: any) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>

          {saveMutation.isError && (
            <p className="font-mono text-xs text-red-600">
              Failed to save word research. Please try again.
            </p>
          )}

          {saveMutation.isSuccess && (
            <p className="font-mono text-xs text-green-600">
              Word research saved successfully!
            </p>
          )}

          <button
            onClick={handleSave}
            className="w-full border-2 border-black bg-black text-white font-mono text-sm font-bold uppercase tracking-wider py-4 hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={saveMutation.isPending || !projectId}
          >
            {saveMutation.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
