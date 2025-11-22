"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
  stats: Array<{ label: string; value: string }>;
  delay: number;
}

function FeatureCard({ number, title, description, stats, delay }: FeatureCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div
        className={`border-2 border-black bg-white p-8 transition-all duration-200 ${
          isHovered ? "bg-black text-white" : ""
        }`}
      >
        {/* Number badge */}
        <div className="flex items-center justify-between mb-6">
          <div
            className={`w-12 h-12 border-2 border-black flex items-center justify-center ${
              isHovered ? "bg-white" : "bg-black"
            }`}
          >
            <span
              className={`font-mono text-lg font-black ${
                isHovered ? "text-black" : "text-white"
              }`}
            >
              {number}
            </span>
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 border border-black bg-black" />
            <div className="w-2 h-2 border border-black bg-white" />
          </div>
        </div>

        {/* Title */}
        <h3
          className={`font-mono text-xl font-bold uppercase tracking-wider mb-4 ${
            isHovered ? "text-white" : "text-black"
          }`}
        >
          {title}
        </h3>

        {/* Divider */}
        <div
          className={`h-1 w-16 mb-6 ${isHovered ? "bg-white" : "bg-black"}`}
        />

        {/* Description */}
        <p
          className={`font-mono text-sm leading-relaxed mb-8 ${
            isHovered ? "text-white/90" : "text-black/80"
          }`}
        >
          {description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-6 border-t-2 border-black">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <div
                className={`font-mono text-3xl font-black leading-none ${
                  isHovered ? "text-white" : "text-black"
                }`}
              >
                {stat.value}
              </div>
              <div
                className={`h-0.5 w-full ${
                  isHovered ? "bg-white" : "bg-black"
                }`}
              />
              <div
                className={`font-mono text-[10px] uppercase tracking-wider ${
                  isHovered ? "text-white/70" : "text-black/60"
                }`}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturesGrid() {
  const features = [
    {
      number: "01",
      title: "Search Intelligence Core",
      description:
        "Advanced query optimization using Google dork techniques combined with AI-powered semantic understanding for precision targeting across 50+ academic repositories.",
      stats: [
        { label: "Precision", value: "98.7%" },
        { label: "Response", value: "0.34s" },
      ],
    },
    {
      number: "02",
      title: "AI Analysis Engine",
      description:
        "128-layer transformer architecture trained on 500TB of academic literature, providing context-aware abstractive summarization and citation network mapping.",
      stats: [
        { label: "Accuracy", value: "94.3%" },
        { label: "Training", value: "500TB" },
      ],
    },
    {
      number: "03",
      title: "Neural Network Nexus",
      description:
        "Hybrid CNN-RNN architecture with attention mechanisms for pattern recognition across diverse academic formats, enabling semantic comprehension beyond keywords.",
      stats: [
        { label: "Formats", value: "50+" },
        { label: "Layers", value: "128" },
      ],
    },
    {
      number: "04",
      title: "Secure Data Vault",
      description:
        "Enterprise-grade storage with AES-256 encryption and multi-region redundancy, featuring cryptographic key management through secure hardware modules.",
      stats: [
        { label: "Uptime", value: "99.97%" },
        { label: "Security", value: "AES-256" },
      ],
    },
    {
      number: "05",
      title: "Walrus Blockchain",
      description:
        "Decentralized permanent storage across 10,247 global nodes with immutable cryptographic hashing, eliminating single points of failure and ensuring data permanence.",
      stats: [
        { label: "Nodes", value: "10,247" },
        { label: "Uptime", value: "99.999%" },
      ],
    },
    {
      number: "06",
      title: "Research Integration",
      description:
        "Unified workspace with automated citation generation (APA, MLA, Chicago, IEEE), real-time collaboration, and analytics dashboard for 12.5K+ active researchers.",
      stats: [
        { label: "Users", value: "12.5K" },
        { label: "Citations", value: "847K" },
      ],
    },
  ];

  return (
    <section className="py-32 bg-[#f5f5f3] relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8 relative z-10">
        {/* Section header - Brutalist style */}
        <div className="mb-20">
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-3 border-2 border-black bg-white px-4 py-2 mb-6">
                <div className="w-3 h-3 bg-black" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-black">
                  System Architecture
                </span>
              </div>
              <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl font-black text-black leading-[0.9] mb-6">
                Research
                <br />
                Infrastructure
              </h2>
              <div className="h-2 w-32 bg-black mb-6" />
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 border-2 border-black bg-black rotate-[-4deg]" />
            </div>
          </div>

          <div className="max-w-2xl">
            <p className="font-mono text-base text-black/80 leading-relaxed">
              Six interconnected modules powering the world's most advanced
              academic research platform, processing 584,000 queries daily with
              military-grade security and AI precision.
            </p>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              delay={idx * 0.08}
              {...feature}
            />
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-24 border-t-4 border-black pt-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 border-2 border-black bg-black" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                  Platform
                </span>
              </div>
              <p className="font-mono text-sm text-black/60">
                DOCSCOUT RESEARCH
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 border-2 border-black bg-white" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                  Purpose
                </span>
              </div>
              <p className="font-mono text-sm text-black/60">
                ACADEMIC EXCELLENCE
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 border-2 border-black bg-black" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                  Established
                </span>
              </div>
              <p className="font-mono text-sm text-black/60">EST. 2025</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
