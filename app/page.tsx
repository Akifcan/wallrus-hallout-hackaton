"use client";

import { useState } from "react";
import SpatialCanvas from "@/components/spatial/SpatialCanvas";
import FloatingTerminal from "@/components/spatial/FloatingTerminal";
import NavigationOrbs from "@/components/spatial/NavigationOrbs";
import HUD from "@/components/spatial/HUD";

export default function Home() {
  const [activeZone, setActiveZone] = useState(0);

  const zones = [
    {
      title: "// SEARCH_PROTOCOL",
      glitchText: "QUANTUM_SEARCH",
      position: "left" as const,
      content: [
        "Initializing neural search matrix...",
        "Loading Google dork optimization engine...",
        "AI query rewriter: ACTIVE",
        "Multi-source scanner: ONLINE",
        "Deep web indexer: READY",
        "",
        "CAPABILITIES:",
        "→ Advanced boolean operators",
        "→ File type targeting (PDF, DOC, XLS)",
        "→ Domain-specific searches",
        "→ Temporal filtering",
        "→ Language detection",
        "",
        "SEARCH PRECISION: 98.7%",
        "AVG RESPONSE TIME: 0.34s",
      ],
    },
    {
      title: "// AI_ENGINE",
      glitchText: "NEURAL_CORE",
      position: "right" as const,
      content: [
        "Booting artificial intelligence systems...",
        "Neural network layers: 128",
        "Training data: 500TB academic corpus",
        "Model: GPT-4 + Custom fine-tuning",
        "",
        "FEATURES:",
        "→ Context-aware summarization",
        "→ Multi-document synthesis",
        "→ Citation extraction",
        "→ Relevance scoring",
        "→ Semantic understanding",
        "→ Auto-categorization",
        "",
        "ACCURACY RATE: 94.3%",
        "PROCESSING SPEED: 1000 docs/min",
      ],
    },
    {
      title: "// WALRUS_STORAGE",
      glitchText: "DECENTRALIZED_VAULT",
      position: "center" as const,
      content: [
        "Connecting to Walrus blockchain...",
        "Decentralized nodes: 10,247 active",
        "Storage capacity: UNLIMITED",
        "Redundancy factor: 99.999%",
        "",
        "STORAGE PROTOCOL:",
        "→ Immutable document storage",
        "→ Cryptographic encryption (AES-256)",
        "→ IPFS integration",
        "→ Version control system",
        "→ Metadata indexing",
        "→ Instant retrieval",
        "",
        "UPTIME: 99.97%",
        "DATA PERMANENCE: ∞ GUARANTEED",
        "SECURITY LEVEL: MILITARY-GRADE",
      ],
    },
    {
      title: "// SYSTEM_FEATURES",
      glitchText: "CAPABILITIES",
      position: "top" as const,
      content: [
        "DocScout Research Platform v2.1",
        "Next-generation academic research tool",
        "",
        "CORE MODULES:",
        "→ Quantum Search Engine",
        "→ AI Summarization Matrix",
        "→ Walrus Blockchain Storage",
        "→ Citation Generator",
        "→ Collaboration Hub",
        "→ Real-time Analytics",
        "",
        "USERS: 10,000+ researchers",
        "DOCUMENTS INDEXED: 1,000,000+",
        "QUERIES PROCESSED: 5M+/month",
        "",
        "STATUS: FULLY OPERATIONAL",
        "NEXT UPDATE: Q2 2025",
      ],
    },
  ];

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      {/* 3D Background */}
      <SpatialCanvas activeZone={activeZone} onZoneChange={setActiveZone} />

      {/* HUD Overlay */}
      <HUD />

      {/* Navigation Orbs */}
      <NavigationOrbs activeZone={activeZone} onZoneChange={setActiveZone} />

      {/* Floating Terminal Windows */}
      {zones.map((zone, index) => (
        <FloatingTerminal
          key={index}
          title={zone.title}
          glitchText={zone.glitchText}
          content={zone.content}
          position={zone.position}
          isActive={activeZone === index}
        />
      ))}

      {/* CRT Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 mix-blend-overlay opacity-10">
        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)]" />
      </div>

      {/* Chromatic Aberration on Edges */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyan-500/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-500/5 to-transparent" />
      </div>
    </main>
  );
}
