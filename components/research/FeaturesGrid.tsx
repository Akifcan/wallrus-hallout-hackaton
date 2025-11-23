"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
  stats: Array<{ label: string; value: string }>;
  delay: number;
  icon?: string;
}

function FeatureCard({ number, title, description, stats, delay, icon }: FeatureCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      <div
        className={`border-2 border-black bg-white p-8 transition-all duration-200 bg-black text-white`}
      >
        {/* Number badge */}
        <div className="flex items-center justify-between mb-6">
          <div
            className={`w-12 h-12 border-2 border-black flex items-center justify-center bg-black`}
          >
            {icon ? (
              <Image
                src={icon}
                alt=""
                width={32}
                height={32}
                className="object-contain"
              />
            ) : (
              <span className={`font-mono text-lg font-black text-white`}>
                {number}
              </span>
            )}
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 border border-black bg-black" />
            <div className="w-2 h-2 border border-black bg-white" />
          </div>
        </div>

        {/* Title */}
        <h3
          className={`font-mono text-xl font-bold uppercase tracking-wider mb-4 ${isHovered ? "text-white" : "text-black"
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
          className={`font-mono text-sm leading-relaxed mb-8 ${isHovered ? "text-white/90" : "text-black/80"
            }`}
        >
          {description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-6 border-t-2 border-black">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <div
                className={`font-mono text-3xl font-black leading-none ${isHovered ? "text-white" : "text-black"
                  }`}
              >
                {stat.value}
              </div>
              <div
                className={`h-0.5 w-full ${isHovered ? "bg-white" : "bg-black"
                  }`}
              />
              <div
                className={`font-mono text-[10px] uppercase tracking-wider ${isHovered ? "text-white/70" : "text-black/60"
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
      title: "Smart Search Engine",
      description:
        "Advanced search operators that discover PDFs, presentations, and academic documents from specific domains. Target .edu sites, filter by file type, and find exactly what you need with precision query optimization.",
      stats: [
        { label: "Precision", value: "98.7%" },
        { label: "File Types", value: "15+" },
      ],
    },
    {
      number: "02",
      title: "AI Text Processor",
      description:
        "Transform lengthy documents into concise summaries, rewrite content in different styles, and generate multiple variants. Our AI understands context and extracts key insights from complex research materials.",
      stats: [
        { label: "Accuracy", value: "94.3%" },
        { label: "Languages", value: "50+" },
      ],
    },
    {
      number: "03",
      title: "Document Discovery",
      description:
        "Automatically find research papers, presentations, spreadsheets, and more across the web. Filter by keywords, topics, domains, and publication dates to uncover hidden academic treasures.",
      stats: [
        { label: "Formats", value: "PDF, DOC, PPT" },
        { label: "Sources", value: "1000+" },
      ],
    },
    {
      number: "04",
      title: "Content Extraction",
      description:
        "Extract structured data from documents, identify key concepts, and organize information efficiently. Parse citations, references, and metadata automatically for comprehensive research organization.",
      stats: [
        { label: "Speed", value: "0.34s" },
        { label: "Accuracy", value: "96.2%" },
      ],
    },
    {
      number: "05",
      title: "Walrus Storage",
      description:
        "Store your research permanently on decentralized blockchain infrastructure. Save discovered documents, summaries, and outputs to Walrus for eternal, censorship-resistant preservation.",
      stats: [
        { label: "Nodes", value: "10,247" },
        { label: "Uptime", value: "99.999%" },
      ],
      icon: "/4_icon_token_RGB.png",
    },
    {
      number: "06",
      title: "Research Workspace",
      description:
        "Organize all your findings in one unified dashboard. Save searches, manage document collections, track research progress, and export data in multiple formats for homework and academic projects.",
      stats: [
        { label: "Users", value: "12.5K+" },
        { label: "Saved Docs", value: "847K" },
      ],
    },
  ];

  return (
    <section className="py-32 bg-[#f5f5f3] relative overflow-hidden" id="features">
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
              Six powerful features designed to accelerate your research workflow.
              From intelligent search to AI-powered summarization and blockchain storage,
              DocScout equips students and researchers with professional-grade tools.
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
