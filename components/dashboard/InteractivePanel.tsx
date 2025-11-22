"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Sparkles, Database, Brain, Lock, Zap } from "lucide-react";

interface PanelData {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  metrics: Array<{ label: string; value: string }>;
  details: string[];
  color: string;
}

export default function InteractivePanel() {
  const [expandedPanel, setExpandedPanel] = useState<number | null>(0);

  const panels: PanelData[] = [
    {
      icon: Search,
      title: "Search Intelligence",
      subtitle: "Advanced Query Optimization",
      color: "blue",
      metrics: [
        { label: "Precision Rate", value: "98.7%" },
        { label: "Avg Response", value: "0.34s" },
        { label: "Daily Queries", value: "584K" },
      ],
      details: [
        "Google dork mastery with automated operator application",
        "Multi-database simultaneous querying across 50+ repositories",
        "Real-time indexing with predictive caching algorithms",
        "Semantic intent analysis for context-aware search refinement",
      ],
    },
    {
      icon: Brain,
      title: "AI Analysis Engine",
      subtitle: "Neural Network Processing",
      color: "purple",
      metrics: [
        { label: "Accuracy", value: "94.3%" },
        { label: "Processing", value: "1K docs/min" },
        { label: "Model Size", value: "128 layers" },
      ],
      details: [
        "Transformer architecture with 500TB academic corpus training",
        "Context-aware abstractive summarization preserving key findings",
        "Citation network mapping with relationship classification",
        "Continuous learning from latest research publications",
      ],
    },
    {
      icon: Database,
      title: "Walrus Blockchain",
      subtitle: "Decentralized Storage",
      color: "green",
      metrics: [
        { label: "Node Count", value: "10,247" },
        { label: "Redundancy", value: "99.999%" },
        { label: "Uptime", value: "99.97%" },
      ],
      details: [
        "Distributed across global nodes eliminating single points of failure",
        "Immutable cryptographic hashing ensures permanent data integrity",
        "One-time storage transactions with no recurring subscription costs",
        "Military-grade AES-256 encryption for all stored documents",
      ],
    },
    {
      icon: Sparkles,
      title: "Smart Features",
      subtitle: "Integrated Research Tools",
      color: "orange",
      metrics: [
        { label: "Active Users", value: "12.5K" },
        { label: "Citations", value: "847K" },
        { label: "Collaborations", value: "2.1K" },
      ],
      details: [
        "Automated citation generation in APA, MLA, Chicago, IEEE formats",
        "Real-time collaborative workspaces with synchronized annotations",
        "Analytics dashboard tracking research productivity patterns",
        "Unified interface integrating search, read, annotate, and organize",
      ],
    },
  ];

  const colorClasses = {
    blue: {
      bg: "from-blue-500 to-blue-600",
      border: "border-blue-200",
      text: "text-blue-700",
      light: "bg-blue-50",
    },
    purple: {
      bg: "from-purple-500 to-purple-600",
      border: "border-purple-200",
      text: "text-purple-700",
      light: "bg-purple-50",
    },
    green: {
      bg: "from-green-500 to-green-600",
      border: "border-green-200",
      text: "text-green-700",
      light: "bg-green-50",
    },
    orange: {
      bg: "from-orange-500 to-orange-600",
      border: "border-orange-200",
      text: "text-orange-700",
      light: "bg-orange-50",
    },
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Platform Capabilities
          </h2>
          <p className="text-xl text-gray-600">
            Click to explore detailed metrics and features
          </p>
        </motion.div>

        <div className="space-y-4">
          {panels.map((panel, index) => {
            const Icon = panel.icon;
            const isExpanded = expandedPanel === index;
            const colors = colorClasses[panel.color as keyof typeof colorClasses];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <button
                  onClick={() => setExpandedPanel(isExpanded ? null : index)}
                  className={`w-full text-left bg-white rounded-2xl border-2 ${
                    isExpanded ? colors.border : "border-gray-200"
                  } transition-all hover:shadow-lg`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${colors.bg}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {panel.title}
                          </h3>
                          <p className="text-sm text-gray-600">{panel.subtitle}</p>
                        </div>

                        {/* Metrics pills */}
                        <div className="hidden lg:flex items-center gap-3">
                          {panel.metrics.map((metric, i) => (
                            <div
                              key={i}
                              className={`px-3 py-1.5 ${colors.light} rounded-lg`}
                            >
                              <div className={`text-xs font-semibold ${colors.text}`}>
                                {metric.value}
                              </div>
                              <div className="text-xs text-gray-600">{metric.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-4"
                      >
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      </motion.div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className={`p-6 pt-0 border-t ${colors.border}`}>
                          {/* Mobile metrics */}
                          <div className="grid grid-cols-3 gap-3 lg:hidden mb-6">
                            {panel.metrics.map((metric, i) => (
                              <div
                                key={i}
                                className={`p-3 ${colors.light} rounded-lg text-center`}
                              >
                                <div className={`text-lg font-bold ${colors.text}`}>
                                  {metric.value}
                                </div>
                                <div className="text-xs text-gray-600">{metric.label}</div>
                              </div>
                            ))}
                          </div>

                          {/* Details */}
                          <div className="space-y-3">
                            {panel.details.map((detail, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-3"
                              >
                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${colors.bg} mt-2 flex-shrink-0`} />
                                <p className="text-gray-700 leading-relaxed">{detail}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
