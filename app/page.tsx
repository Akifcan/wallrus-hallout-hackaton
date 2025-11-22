"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NetworkScene from "@/components/network/NetworkScene";
import NetworkPanel from "@/components/network/NetworkPanel";
import NetworkHeader from "@/components/network/NetworkHeader";

export default function Home() {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const nodeData = [
    {
      title: "Search Intelligence Core",
      description: "Advanced query optimization using Google dork techniques and AI-powered semantic understanding",
      color: "#3b82f6",
      metrics: [
        { label: "Precision", value: "98.7%" },
        { label: "Response", value: "0.34s" },
        { label: "Queries", value: "584K/day" },
      ],
      details: [
        "Automated boolean operator application for precision targeting",
        "Real-time multi-database querying across 50+ repositories",
        "Semantic intent analysis with contextual understanding",
        "Predictive caching and distributed query infrastructure",
      ],
    },
    {
      title: "AI Analysis Engine",
      description: "128-layer transformer architecture trained on 500TB of academic literature",
      color: "#8b5cf6",
      metrics: [
        { label: "Accuracy", value: "94.3%" },
        { label: "Processing", value: "1K/min" },
        { label: "Layers", value: "128" },
      ],
      details: [
        "Context-aware abstractive summarization preserving key findings",
        "Citation network mapping with relationship classification",
        "Multi-document synthesis for automated literature reviews",
        "Continuous learning from latest research publications",
      ],
    },
    {
      title: "Neural Network Nexus",
      description: "Hybrid architecture combining CNNs, RNNs, and attention mechanisms",
      color: "#ec4899",
      metrics: [
        { label: "Accuracy", value: "94.3%" },
        { label: "Training", value: "500TB" },
        { label: "Formats", value: "50+" },
      ],
      details: [
        "Pattern recognition across diverse academic document formats",
        "Sequential processing for methodological understanding",
        "Semantic comprehension beyond keyword matching",
        "Transfer learning with domain-specific fine-tuning",
      ],
    },
    {
      title: "Secure Data Vault",
      description: "Enterprise-grade storage with military-level encryption and multi-region redundancy",
      color: "#10b981",
      metrics: [
        { label: "Encryption", value: "AES-256" },
        { label: "Redundancy", value: "99.999%" },
        { label: "Uptime", value: "99.97%" },
      ],
      details: [
        "Cryptographic key management through secure hardware modules",
        "Multi-region replication ensuring disaster recovery",
        "Immutable audit trails for collaborative research",
        "Intelligent auto-categorization evolving with research",
      ],
    },
    {
      title: "Walrus Blockchain Network",
      description: "Decentralized permanent storage across 10,247 global nodes",
      color: "#06b6d4",
      metrics: [
        { label: "Nodes", value: "10,247" },
        { label: "Redundancy", value: "99.999%" },
        { label: "Permanence", value: "∞" },
      ],
      details: [
        "Distributed architecture eliminating single points of failure",
        "Immutable cryptographic hashing for data integrity",
        "One-time storage transactions with no recurring costs",
        "Decentralized access independent of corporate infrastructure",
      ],
    },
    {
      title: "Integrated Research Tools",
      description: "Complete academic workspace unifying search, analysis, and collaboration",
      color: "#f59e0b",
      metrics: [
        { label: "Users", value: "12.5K" },
        { label: "Citations", value: "847K" },
        { label: "Teams", value: "2.1K" },
      ],
      details: [
        "Automated citation generation in APA, MLA, Chicago, IEEE",
        "Real-time collaborative workspaces with synchronized annotations",
        "Analytics dashboard tracking productivity patterns",
        "Unified interface integrating all research workflows",
      ],
    },
  ];

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Header */}
      <NetworkHeader />

      {/* Hero Text Overlay */}
      <div className="fixed top-32 left-0 right-0 z-20 pointer-events-none">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                AI-Powered Research
              </span>
              <br />
              <span className="text-white/90">Platform Network</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100/80 mb-8 max-w-2xl mx-auto">
              Explore our interconnected research ecosystem powered by advanced AI, blockchain technology, and intelligent search
            </p>
          </motion.div>
        </div>
      </div>

      {/* 3D Network Scene */}
      <NetworkScene
        activeNode={activeNode}
        onNodeClick={(index) => setActiveNode(index === activeNode ? null : index)}
      />

      {/* Info Panel */}
      {activeNode !== null && (
        <NetworkPanel
          isOpen={activeNode !== null}
          title={nodeData[activeNode].title}
          description={nodeData[activeNode].description}
          metrics={nodeData[activeNode].metrics}
          details={nodeData[activeNode].details}
          color={nodeData[activeNode].color}
          onClose={() => setActiveNode(null)}
        />
      )}

      {/* Instructions */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="bg-slate-900/80 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20 shadow-xl"
        >
          <p className="text-white/80 text-sm flex items-center gap-3">
            <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span>Click nodes for details • Drag to rotate • Scroll to zoom</span>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
