"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WordResearch from "@/components/dashboard/WordResearch";
import FileResearch from "@/components/dashboard/FileResearch";
import GenerateSummary from "@/components/dashboard/GenerateSummary";
import FoldersProjects from "@/components/dashboard/FoldersProjects";
import Notes from "@/components/dashboard/Notes";
import LastCreatedProjects from "@/components/dashboard/LastCreatedProjects";
import DashboardLayout from "@/components/layouts/dashboard-layout";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("search");
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);

  return (
    <DashboardLayout title="Dashboard">
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
      <div className="mb-8 border-2 border-black bg-white">
        <button
          onClick={() => setIsProjectsOpen(!isProjectsOpen)}
          className="w-full p-4 flex items-center justify-between hover:bg-black hover:text-white transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-current flex items-center justify-center">
              <span className="font-mono text-xs font-bold">📁</span>
            </div>
            <span className="font-mono text-sm font-bold uppercase tracking-wider">
              Recent Projects
            </span>
          </div>
          <motion.div
            animate={{ rotate: isProjectsOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-xs font-bold"
          >
            ▼
          </motion.div>
        </button>

        <AnimatePresence>
          {isProjectsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t-2 border-black"
            >
              <div className="p-4">
                <LastCreatedProjects />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === "search" && <WordResearch />}
        {activeTab === "file" && <FileResearch />}
        {activeTab === "summary" && <GenerateSummary />}
        {activeTab === "folders" && <FoldersProjects />}
        {activeTab === "notes" && <Notes />}
      </div>
    </DashboardLayout>
  );
}
