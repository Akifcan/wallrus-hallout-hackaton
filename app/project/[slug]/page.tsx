"use client";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import instance from "@/lib/api";
import ProjectSummaries from "@/components/project/ProjectSummaries";
import ProjectNotes from "@/components/project/ProjectNotes";
import ProjectWordResearch from "@/components/project/ProjectWordResearch";
import ProjectPublicToggle from "@/components/project/ProjectPublicToggle";
import EditResearchMetaDialog from "@/components/publishments/EditResearchMetaDialog";

export default function Project() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: projectData } = useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      const response = await instance.get(`/api/project/${slug}`);
      return response.data;
    },
  });
  return (
    <DashboardLayout title="Project Archive">
      <div className="space-y-8">
        {/* Action Buttons */}
        <div className="flex gap-4 items-center flex-wrap">
          <button
            onClick={() => router.push("/dashboard")}
            className="font-mono text-sm font-bold uppercase tracking-wider border-4 border-black bg-white px-6 py-3 hover:bg-black hover:text-white transition-colors flex items-center gap-2"
          >
            ← BACK TO DASHBOARD
          </button>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="font-mono text-sm font-bold uppercase tracking-wider border-4 border-black bg-black text-white px-6 py-3 hover:bg-white hover:text-black transition-colors"
          >
            EDIT RESEARCH META
          </button>

          {projectData?.project && <ProjectPublicToggle defaultStatus={projectData?.project?.is_public === 'true' ? true : false} />}
        </div>

        <ProjectSummaries />
        <ProjectNotes />
        <ProjectWordResearch />

        <EditResearchMetaDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          slug={slug}
          initialData={{
            contact_name: projectData?.project?.contact_name,
            contact_email: projectData?.project?.contact_email,
            contact_number: projectData?.project?.contact_number,
          }}
        />
      </div>
    </DashboardLayout>
  );
}