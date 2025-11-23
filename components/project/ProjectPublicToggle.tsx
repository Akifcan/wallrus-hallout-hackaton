import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import instance from "@/lib/api";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { useParams } from "next/navigation";

export default function ProjectPublicToggle() {
  const params = useParams();
  const slug = params.slug as string;
  const [isPublic, setIsPublic] = useState(false);

  const { data: projectData } = useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      const response = await instance.get(`/api/project/${slug}`);
      return response.data;
    },
  });

  useEffect(() => {
    if (!projectData) {
      return
    }
    setIsPublic(projectData?.project?.is_public);
  }, [projectData]);

  const togglePublicMutation = useMutation({
    mutationFn: async (isPublic: boolean) => {
      const response = await instance.put(`/api/project/${slug}/toggle-public`, {
        is_public: isPublic,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Project visibility updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update project visibility");
      setIsPublic(!isPublic);
    },
  });

  const handleTogglePublic = (checked: boolean) => {
    setIsPublic(checked);
    togglePublicMutation.mutate(checked);
  };

  return (
    <>
      {/* Public Toggle */}
      <div className="flex items-center gap-3 border-4 border-black bg-white px-6 py-3">
        <label
          htmlFor="public-toggle"
          className="font-mono text-sm font-bold uppercase tracking-wider text-black cursor-pointer"
        >
          Public
        </label>
        <Switch
          id="public-toggle"
          checked={isPublic}
          onCheckedChange={handleTogglePublic}
          disabled={togglePublicMutation.isPending}
        />
      </div>

      {/* Public Indicator */}
      {isPublic && (
        <div className="border-4 border-green-600 bg-green-50 p-4 w-full">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌍</span>
            <div>
              <p className="font-mono text-sm font-bold uppercase tracking-wider text-green-800">
                PUBLIC RESEARCH
              </p>
              <p className="font-mono text-xs text-green-700 mt-1">
                This research is visible to everyone
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
