"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useCurrentAccount } from "@mysten/dapp-kit";
import instance from "@/lib/api";
import { toast } from "sonner";

interface GenerateSummaryResultsProps {
  summary: string;
  summaryId: string;
  content: string;
  language: string;
  summaryLength: string;
}

export default function GenerateSummaryResults({
  summary,
  summaryId,
  content,
  language,
  summaryLength,
}: GenerateSummaryResultsProps) {
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

  const saveSummaryMutation = useMutation({
    mutationFn: async (saveData: {
      summary_id: string;
      project_id: string;
    }) => {
      const response = await instance.post("/api/summary/save", saveData);
      return response.data;
    },
    onSuccess: () => {
      setProjectId("");
      toast.success("Summary saved successfully!");
    },
    onError: () => {
      toast.error("Failed to save summary. Please try again.");
    },
  });

  const handleSave = () => {
    if (!projectId) {
      toast.error("Please select a project");
      return;
    }

    saveSummaryMutation.mutate({
      summary_id: summaryId,
      project_id: projectId,
    });
  };

  return (
    <div className="space-y-8">
      {/* Summary Result */}
      <div className="border-2 border-black bg-white p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-black">
            Generated Summary
          </h3>
          <div className="w-4 h-4 border-2 border-black bg-black" />
        </div>
        <div className="h-1 w-16 bg-black mb-6" />

        <div className="border-2 border-black bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-black" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                {language} • {summaryLength}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-black mb-3">
                Original Text:
              </h4>
              <div className="border border-black bg-white p-4 max-h-40 overflow-y-auto">
                <p className="font-mono text-xs text-black/80 whitespace-pre-wrap">
                  {content}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-black mb-3">
                Summary:
              </h4>
              <div className="border-2 border-black bg-white p-4">
                <p className="font-mono text-sm text-black whitespace-pre-wrap">
                  {summary}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => {
                navigator.clipboard.writeText(summary);
                toast.success("Summary copied to clipboard!");
              }}
              className="flex-1 border-2 border-black bg-white text-black font-mono text-xs font-bold uppercase tracking-wider py-3 hover:bg-black hover:text-white transition-all"
            >
              Copy Summary
            </button>
          </div>
        </div>
      </div>

      {/* Save Section */}
      <div className="border-2 border-black bg-white p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-black">
            Save Summary
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
              disabled={saveSummaryMutation.isPending || projectsLoading}
            >
              <option value="">Select a project...</option>
              {projectsData?.projects?.map((project: any) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>

          {saveSummaryMutation.isError && (
            <p className="font-mono text-xs text-red-600">
              Failed to save summary. Please try again.
            </p>
          )}

          {saveSummaryMutation.isSuccess && (
            <p className="font-mono text-xs text-green-600">
              Summary saved successfully!
            </p>
          )}

          <button
            onClick={handleSave}
            className="w-full border-2 border-black bg-black text-white font-mono text-sm font-bold uppercase tracking-wider py-4 hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={saveSummaryMutation.isPending || !projectId}
          >
            {saveSummaryMutation.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
