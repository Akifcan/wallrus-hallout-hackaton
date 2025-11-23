"use client";

import { useState } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import ResearchHeader from "@/components/research/ResearchHeader";
import ResearchFooter from "@/components/research/ResearchFooter";
import WordResearch from "@/components/dashboard/WordResearch";
import FileResearch from "@/components/dashboard/FileResearch";
import GenerateSummary from "@/components/dashboard/GenerateSummary";
import FoldersProjects from "@/components/dashboard/FoldersProjects";
import Notes from "@/components/dashboard/Notes";
import LastCreatedProjects from "@/components/dashboard/LastCreatedProjects";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <AuthGuard>
      <main className="min-h-screen bg-[#f5f5f3]">
        <ResearchHeader />
        <div className="max-w-[1600px] mx-auto px-8 py-12 pt-40">
          {/* Dashboard Header */}
          <div className="mb-12">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="inline-flex items-center gap-3 border-2 border-black bg-white px-4 py-2 mb-6">
                  <div className="w-3 h-3 bg-black" />
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-black">
                    Dashboard
                  </span>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-24 h-24 border-2 border-black bg-black rotate-[-4deg]" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8 flex flex-wrap gap-4 border-b-4 border-black">
            {[
              { id: "folders", label: "Folders/Projects" },
              { id: "search", label: "Word Research" },
              { id: "file", label: "File Research" },
              { id: "summary", label: "Generate Summary" },
              { id: "notes", label: "Notes" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 border-2 border-black font-mono text-sm font-bold uppercase tracking-wider transition-all ${activeTab === tab.id
                  ? "bg-black text-white border-b-4 border-b-transparent"
                  : "bg-white text-black hover:bg-black hover:text-white"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Recent Projects */}
          <div className="mb-8">
            <LastCreatedProjects />
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === "search" && <WordResearch />}
            {activeTab === "file" && <FileResearch />}
            {activeTab === "summary" && <GenerateSummary />}
            {activeTab === "folders" && <FoldersProjects />}
            {activeTab === "notes" && <Notes />}
          </div>
        </div>
        <ResearchFooter />
      </main>
    </AuthGuard>
  );
}
