"use client";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { useParams, useRouter } from "next/navigation";
import ProjectSummaries from "@/components/project/ProjectSummaries";
import ProjectNotes from "@/components/project/ProjectNotes";
import ProjectWordResearch from "@/components/project/ProjectWordResearch";

export default function Project() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  return (
    <DashboardLayout title="Project Archive">
      <div className="space-y-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="font-mono text-sm font-bold uppercase tracking-wider border-4 border-black bg-white px-6 py-3 hover:bg-black hover:text-white transition-colors flex items-center gap-2"
        >
          ← BACK TO DASHBOARD
        </button>

        <ProjectSummaries />
        <ProjectNotes />
        <ProjectWordResearch />
      </div>
    </DashboardLayout>
  );
}