"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { toast } from "sonner";
import instance from "@/lib/api";

interface FileResearchResultsProps {
  results: FileSearchResult[];
}

const getFileIcon = (url: string) => {
  const extension = url.split(".").pop()?.toLowerCase();

  const iconMap: Record<string, string> = {
    pdf: "📄",
    doc: "📝",
    docx: "📝",
    txt: "📃",
    md: "📋",
    xlsx: "📊",
    xls: "📊",
    csv: "📊",
    ppt: "📊",
    pptx: "📊",
    json: "🔧",
    xml: "🔧",
    html: "🌐",
    css: "🎨",
    js: "⚡",
    zip: "🗜️",
    rar: "🗜️",
    jpg: "🖼️",
    jpeg: "🖼️",
    png: "🖼️",
    gif: "🖼️",
    svg: "🖼️",
    mp4: "🎬",
    mp3: "🎵",
    wav: "🎵",
  };

  return iconMap[extension || ""] || "📁";
};

export default function FileResearchResults({
  results,
}: FileResearchResultsProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileSearchResult | null>(
    null
  );
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
    mutationFn: async (data: { url: string; projectId: string }) => {
      // Then save to database (you might need to create this endpoint)
      const saveResponse = await instance.post("/api/upload-file/save", {
        project_id: data.projectId,
        url: data.url,
      });

      return saveResponse.data;
    },
    onSuccess: () => {
      toast.success("File saved successfully!");
      setShowDialog(false);
      setSelectedFile(null);
      setProjectId("");
    },
    onError: () => {
      toast.error("Failed to save file. Please try again.");
    },
  });

  const handleSaveClick = (file: FileSearchResult) => {
    setSelectedFile(file);
    setShowDialog(true);
  };

  const handleConfirmSave = () => {
    if (!projectId) {
      toast.error("Please select a project");
      return;
    }

    if (!selectedFile) return;

    saveMutation.mutate({
      url: selectedFile.link,
      projectId,
    });
  };

  const handleCancel = () => {
    setShowDialog(false);
    setSelectedFile(null);
    setProjectId("");
  };

  return (
    <>
      <div className="space-y-8">
        {/* Search Results */}
        <div className="border-2 border-black bg-white p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-black">
              Files Found ({results.length})
            </h3>
            <div className="w-4 h-4 border-2 border-black bg-black" />
          </div>
          <div className="h-1 w-16 bg-black mb-6" />

          <div className="space-y-4">
            {results && Array.isArray(results) && results.length > 0 ? (
              results.map((result: FileSearchResult, idx: number) => (
                <div
                  key={idx}
                  className="border-2 border-black bg-white hover:bg-black hover:text-white transition-all group"
                >
                  <div className="flex items-start gap-4 p-4">
                    {/* File Icon */}
                    <div className="flex-shrink-0 w-12 h-12 border-2 border-current flex items-center justify-center">
                      <span className="text-2xl">
                        {getFileIcon(result.link)}
                      </span>
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <a
                        href={result.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <h4 className="font-mono text-sm font-bold mb-2 break-words">
                          {result.title}
                        </h4>
                        <p className="font-mono text-xs mb-2 opacity-70 break-words">
                          {result.snippet}
                        </p>
                        <span className="font-mono text-xs opacity-50 group-hover:opacity-100 break-all">
                          {result.link}
                        </span>
                      </a>
                    </div>

                    {/* Save Button */}
                    <div className="flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleSaveClick(result);
                        }}
                        disabled={saveMutation.isPending}
                        className="border-2 border-current bg-transparent px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed group-hover:border-white group-hover:text-white"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="font-mono text-sm text-black/60">No files found</p>
            )}
          </div>
        </div>
      </div>

      {/* Save Confirmation Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="border-4 border-black bg-white max-w-md w-full">
            <div className="border-b-4 border-black p-6">
              <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-black">
                Save File
              </h3>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <p className="font-mono text-sm text-black mb-4">
                  Do you want to save this file?
                </p>
                <div className="border-2 border-black bg-white p-3">
                  <p className="font-mono text-xs text-black/80 break-words">
                    {selectedFile?.title}
                  </p>
                </div>
              </div>

              <div>
                <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
                  Select Project
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
                  Failed to save file. Please try again.
                </p>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleConfirmSave}
                  disabled={saveMutation.isPending || !projectId}
                  className="flex-1 border-2 border-black bg-black text-white font-mono text-sm font-bold uppercase tracking-wider py-3 hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saveMutation.isPending ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={saveMutation.isPending}
                  className="flex-1 border-2 border-black bg-white text-black font-mono text-sm font-bold uppercase tracking-wider py-3 hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
