"use client";

import { motion } from "framer-motion";
import { Search, Sparkles, Database, Zap, Brain, Lock, TrendingUp, Users } from "lucide-react";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  size: "small" | "medium" | "large";
  index: number;
}

function BentoCard({ title, description, icon: Icon, gradient, size, index }: BentoCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 md:col-span-2 row-span-1",
    large: "col-span-1 md:col-span-2 row-span-2",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`${sizeClasses[size]} group relative overflow-hidden rounded-3xl bg-white/60 backdrop-blur-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer`}
    >
      {/* Background gradient on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col">
        {/* Icon */}
        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${gradient} mb-6 self-start shadow-lg group-hover:scale-110 transition-transform duration-500`}>
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Text */}
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed flex-1">{description}</p>

        {/* Hover arrow */}
        <div className="mt-6 flex items-center gap-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-sm font-medium">Learn more</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shine" />
      </div>
    </motion.div>
  );
}

export default function BentoGrid() {
  const cards = [
    {
      title: "Smart Search",
      description: "Advanced Google dork techniques combined with AI to find exactly what you need across academic databases and repositories.",
      icon: Search,
      gradient: "from-blue-500 to-blue-600",
      size: "large" as const,
    },
    {
      title: "AI Summarization",
      description: "Neural networks trained on academic papers provide context-aware summaries and key insight extraction.",
      icon: Brain,
      gradient: "from-purple-500 to-purple-600",
      size: "medium" as const,
    },
    {
      title: "Fast Results",
      description: "Get search results in under 0.5 seconds with 98% precision.",
      icon: Zap,
      gradient: "from-yellow-500 to-orange-500",
      size: "small" as const,
    },
    {
      title: "Multi-Format Support",
      description: "Search and analyze PDFs, DOCs, presentations, and more across all major file types.",
      icon: Sparkles,
      gradient: "from-indigo-500 to-indigo-600",
      size: "small" as const,
    },
    {
      title: "Secure Storage",
      description: "Military-grade encryption with decentralized Walrus blockchain ensures your research is safe forever.",
      icon: Lock,
      gradient: "from-green-500 to-emerald-600",
      size: "medium" as const,
    },
    {
      title: "Walrus Integration",
      description: "Permanent, immutable storage on the Walrus decentralized network. Your research, secured for eternity with 99.999% redundancy.",
      icon: Database,
      gradient: "from-teal-500 to-cyan-600",
      size: "large" as const,
    },
    {
      title: "Team Collaboration",
      description: "Work together with real-time sync, shared workspaces, and version control.",
      icon: Users,
      gradient: "from-pink-500 to-rose-600",
      size: "small" as const,
    },
    {
      title: "Analytics Dashboard",
      description: "Track your research progress with detailed insights and productivity metrics.",
      icon: TrendingUp,
      gradient: "from-violet-500 to-purple-600",
      size: "small" as const,
    },
  ];

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Everything you need
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A complete research platform with powerful features designed for modern academics
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px]">
          {cards.map((card, index) => (
            <BentoCard key={index} {...card} index={index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          from {
            transform: translateX(-100%) skewX(-12deg);
          }
          to {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        .animate-shine {
          animation: shine 1.5s ease-in-out;
        }
      `}</style>
    </section>
  );
}
