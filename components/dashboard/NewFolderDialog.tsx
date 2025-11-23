"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAccount } from "@mysten/dapp-kit";
import instance from "@/lib/api";
import { toast } from "sonner";

interface NewFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NewFolderDialog({
  open,
  onOpenChange,
}: NewFolderDialogProps) {
  const [projectName, setProjectName] = useState("");
  const currentAccount = useCurrentAccount();
  const queryClient = useQueryClient();

  const createFolderMutation = useMutation({
    mutationFn: async (projectName: string) => {
      const response = await instance.post('/api/create-folder', {
        projectName
      })
      return response.data
    },
    onSuccess: () => {
      toast.success("Project created successfully!");
      setProjectName("");
      onOpenChange(false);
      queryClient.invalidateQueries({
        queryKey: ["projects", currentAccount?.address],
      });
      queryClient.invalidateQueries({
        queryKey: ["recent-projects", currentAccount?.address],
      });
    },
    onError: () => {
      toast.error("Failed to create project. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createFolderMutation.mutate(projectName);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-4 border-black bg-white p-8 max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between mb-6">
            <DialogTitle className="font-mono text-lg font-bold uppercase tracking-wider text-black">
              New Folder
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="h-1 w-16 bg-black mb-6" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3 block">
              Project Name
            </label>
            <div className="border-2 border-black bg-white p-4">
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name..."
                className="w-full font-mono text-base text-black placeholder-black/40 bg-transparent border-none outline-none"
                required
                disabled={createFolderMutation.isPending}
              />
            </div>
            {createFolderMutation.isError && (
              <p className="font-mono text-xs text-red-600 mt-2">
                Failed to create project. Please try again.
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-2 border-black bg-white text-black font-mono text-sm font-bold uppercase tracking-wider py-3 hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={createFolderMutation.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 border-2 border-black bg-black text-white font-mono text-sm font-bold uppercase tracking-wider py-3 hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={createFolderMutation.isPending}
            >
              {createFolderMutation.isPending ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
