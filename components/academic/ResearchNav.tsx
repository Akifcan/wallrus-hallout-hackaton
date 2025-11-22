"use client";

import { Search, Sparkles, Database, BookOpen } from "lucide-react";

interface ResearchNavProps {
  activeSection: number;
  onSectionChange: (section: number) => void;
}

export default function ResearchNav({ activeSection, onSectionChange }: ResearchNavProps) {
  const sections = [
    {
      icon: Search,
      title: "Search Intelligence",
      subtitle: "Advanced Query System",
    },
    {
      icon: Sparkles,
      title: "AI Analysis",
      subtitle: "Neural Summarization",
    },
    {
      icon: Database,
      title: "Walrus Storage",
      subtitle: "Decentralized Archive",
    },
    {
      icon: BookOpen,
      title: "Research Tools",
      subtitle: "Complete Platform",
    },
  ];

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40">
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-64">
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h3 className="text-sm font-serif font-semibold text-gray-900">Table of Contents</h3>
          <p className="text-xs text-gray-500 mt-1">Select a section to explore</p>
        </div>

        <nav className="space-y-2">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = activeSection === index;

            return (
              <button
                key={index}
                onClick={() => onSectionChange(index)}
                className={`w-full flex items-start gap-3 p-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600"
                    : "hover:bg-gray-50 border-l-4 border-transparent"
                }`}
              >
                <div
                  className={`flex-shrink-0 p-2 rounded-lg ${
                    isActive
                      ? "bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg"
                      : "bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-600"}`}
                  />
                </div>

                <div className="flex-1 text-left">
                  <div
                    className={`text-sm font-medium ${
                      isActive ? "text-blue-900" : "text-gray-700"
                    }`}
                  >
                    {section.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{section.subtitle}</div>
                </div>

                {isActive && (
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Section {activeSection + 1} of {sections.length}</span>
            <div className="flex gap-1">
              {sections.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i === activeSection ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
