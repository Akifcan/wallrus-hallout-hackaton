"use client";

import { motion } from "framer-motion";

interface ProjectFileDetailProps {
  file: {
    id: string;
    type: string;
    title: string;
    date: string;
    itemsCount: number;
    icon: string;
  };
  typeLabel: string;
  onBack: () => void;
}

export default function ProjectFileDetail({
  file,
  typeLabel,
  onBack,
}: ProjectFileDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Back Button */}
      <div className="border-4 border-black bg-white p-4">
        <button
          onClick={onBack}
          className="w-full border-2 border-black bg-white text-black font-mono text-sm font-bold uppercase tracking-wider py-3 hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
        >
          ← Back to Archive
        </button>
      </div>

      {/* File Detail Header */}
      <div className="border-4 border-black bg-white">
        {/* Decorative Header Bar */}
        <div className="border-b-4 border-black bg-black p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{file.icon}</span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                {typeLabel}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 border border-white bg-white" />
              <div className="w-2 h-2 border border-white" />
              <div className="w-2 h-2 border border-white bg-white" />
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-6">
            {/* Title Section */}
            <div>
              <h2 className="font-mono text-2xl font-bold uppercase tracking-wider text-black mb-4">
                {file.title}
              </h2>
              <div className="flex items-center gap-6 font-mono text-sm text-black/60">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-black" />
                  <span>ID: {file.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-black" />
                  <span>Added: {new Date(file.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-black" />
                  <span>{file.itemsCount} Items</span>
                </div>
              </div>
            </div>

            <div className="h-1 w-24 bg-black" />

            {/* Content Area */}
            <div className="border-2 border-black bg-white p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3">
                    Content Preview
                  </h3>
                  <p className="font-mono text-sm text-black/80 leading-relaxed">
                    This is where the actual content of the {typeLabel.toLowerCase()} would be displayed.
                    For word research, this would show the search results.
                    For summaries, the generated summary text would appear here.
                    For file research, links to uploaded files would be listed.
                    For notes, the note content would be shown.
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-black/10">
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-black mb-3">
                    Metadata
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-black p-3">
                      <div className="font-mono text-xs text-black/60 mb-1">
                        Type
                      </div>
                      <div className="font-mono text-sm font-bold text-black">
                        {typeLabel}
                      </div>
                    </div>
                    <div className="border border-black p-3">
                      <div className="font-mono text-xs text-black/60 mb-1">
                        Status
                      </div>
                      <div className="font-mono text-sm font-bold text-black">
                        Archived
                      </div>
                    </div>
                    <div className="border border-black p-3">
                      <div className="font-mono text-xs text-black/60 mb-1">
                        Format
                      </div>
                      <div className="font-mono text-sm font-bold text-black">
                        Digital
                      </div>
                    </div>
                    <div className="border border-black p-3">
                      <div className="font-mono text-xs text-black/60 mb-1">
                        Items Count
                      </div>
                      <div className="font-mono text-sm font-bold text-black">
                        {file.itemsCount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
