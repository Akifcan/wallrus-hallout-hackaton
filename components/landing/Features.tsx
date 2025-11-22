"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Search,
  FileText,
  Sparkles,
  Database,
  Zap,
  Shield,
} from "lucide-react";

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const features = [
    {
      icon: Search,
      title: "Smart Query Optimization",
      description:
        "Leverage advanced Google dork techniques to find exactly what you need. Our AI rewrites and optimizes your search queries for maximum precision and relevance.",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: FileText,
      title: "Multi-Format Search",
      description:
        "Search across PDFs, documents, research papers, and various file types. Filter by specific formats, domains, and content types for targeted results.",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      icon: Sparkles,
      title: "AI Summarization & Extraction",
      description:
        "Automatically summarize lengthy documents, extract key information, and structure data intelligently. Save hours of reading and note-taking.",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: Database,
      title: "Decentralized Storage",
      description:
        "Save your research documents and findings securely to Walrus decentralized storage. Access your data anywhere, anytime with guaranteed permanence.",
      gradient: "from-violet-500 to-violet-600",
    },
  ];

  return (
    <section
      id="features"
      ref={ref}
      className="py-20 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              Powerful Features
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need for
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Efficient Research
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            DocScout combines cutting-edge AI technology with powerful search
            capabilities to revolutionize how you gather and organize
            information.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group"
              >
                <div className="h-full bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6" />
            <h3 className="text-2xl md:text-3xl font-bold">
              Built for Academic Excellence
            </h3>
          </div>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Trusted by students, researchers, and academics worldwide for
            reliable, efficient, and secure information gathering
          </p>
        </motion.div>
      </div>
    </section>
  );
}
