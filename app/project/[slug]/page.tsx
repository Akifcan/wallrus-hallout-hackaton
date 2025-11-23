"use client";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ProjectHeader from "@/components/project/ProjectHeader";
import ProjectFilters from "@/components/project/ProjectFilters";
import ProjectFileCard from "@/components/project/ProjectFileCard";
import ProjectFileDetail from "@/components/project/ProjectFileDetail";

// Mock data - will be replaced with actual API calls
const mockProject = {
  id: "1",
  title: "Machine Learning Research",
  description: "Comprehensive research on deep learning algorithms and neural networks",
  created_at: "2024-01-15",
  itemsCount: 24,
};

const mockFiles = [
  {
    id: "1",
    type: "word_research",
    title: "Deep Learning Fundamentals",
    date: "2024-01-20",
    itemsCount: 15,
    icon: "📚",
  },
  {
    id: "2",
    type: "summary",
    title: "Neural Networks Overview",
    date: "2024-01-19",
    itemsCount: 1,
    icon: "📝",
  },
  {
    id: "3",
    type: "file_research",
    title: "Research Papers Collection",
    date: "2024-01-18",
    itemsCount: 8,
    icon: "📄",
  },
  {
    id: "4",
    type: "note",
    title: "Important Notes and Ideas",
    date: "2024-01-17",
    itemsCount: 1,
    icon: "✍️",
  },
];

const typeLabels: Record<string, string> = {
  word_research: "Web Research",
  summary: "Summary",
  file_research: "File Archive",
  note: "Personal Note",
};

export default function Project() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedFile, setSelectedFile] = useState<typeof mockFiles[0] | null>(
    null
  );

  const filteredFiles =
    selectedType === "all"
      ? mockFiles
      : mockFiles.filter((file) => file.type === selectedType);

  const handleFileClick = (file: typeof mockFiles[0]) => {
    setSelectedFile(file);
  };

  const handleBack = () => {
    setSelectedFile(null);
  };

  return (
    <DashboardLayout title="Project Archive">
      <div className="space-y-8">
        {/* Inline File Detail or File List */}
        <AnimatePresence mode="wait">
          {selectedFile ? (
            <ProjectFileDetail
              key="detail"
              file={selectedFile}
              typeLabel={typeLabels[selectedFile.type]}
              onBack={handleBack}
            />
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Filter Tabs */}
              <ProjectFilters
                selectedType={selectedType}
                onTypeChange={setSelectedType}
              />

              {/* Files Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredFiles.map((file, idx) => (
                  <ProjectFileCard
                    key={file.id}
                    file={file}
                    typeLabel={typeLabels[file.type]}
                    index={idx}
                    onClick={() => handleFileClick(file)}
                  />
                ))}
              </motion.div>

              {/* Empty State */}
              {filteredFiles.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-4 border-black bg-white p-12 text-center"
                >
                  <div className="text-6xl mb-4">📭</div>
                  <p className="font-mono text-lg font-bold uppercase tracking-wider text-black">
                    No Items Found
                  </p>
                  <p className="font-mono text-sm text-black/60 mt-2">
                    This section is empty. Start by adding some research data.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}