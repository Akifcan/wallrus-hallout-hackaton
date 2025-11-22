"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Sparkles, Save, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Enter Your Research Query",
      description:
        "Simply type in what you're looking for. Whether it's a specific topic, document type, or research question, DocScout understands your intent.",
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      number: "02",
      icon: Sparkles,
      title: "AI Optimizes & Searches",
      description:
        "Our AI engine rewrites your query using advanced search techniques, scours multiple sources, and intelligently filters results for maximum relevance.",
      color: "indigo",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      number: "03",
      icon: Save,
      title: "Save & Organize to Walrus",
      description:
        "Review AI-generated summaries, extract key information, and save everything to decentralized Walrus storage for permanent, secure access.",
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-20 md:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-100/40 to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200 mb-6">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-blue-700">
              Simple Process
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How DocScout Works
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to transform your research workflow and
            accelerate information discovery
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8 md:space-y-12"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                <div
                  className={`flex flex-col ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-8 md:gap-12`}
                >
                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-6xl md:text-7xl font-bold bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent`}
                      >
                        {step.number}
                      </span>
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${step.gradient} shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {step.title}
                    </h3>

                    <p className="text-lg text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Visual Element */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 max-w-md"
                  >
                    <div
                      className={`bg-gradient-to-br ${step.gradient} rounded-2xl p-8 shadow-2xl`}
                    >
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                        <Icon className="w-16 h-16 md:w-20 md:h-20 text-white mx-auto mb-4" />
                        <div className="space-y-2">
                          <div className="h-3 bg-white/40 rounded-full w-3/4 mx-auto" />
                          <div className="h-3 bg-white/30 rounded-full w-1/2 mx-auto" />
                          <div className="h-3 bg-white/20 rounded-full w-2/3 mx-auto" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.4 }}
                    className="hidden md:flex justify-center my-8"
                  >
                    <div className="p-3 bg-white rounded-full shadow-lg">
                      <ArrowRight className="w-6 h-6 text-blue-600 rotate-90" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
