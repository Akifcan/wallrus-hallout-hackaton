"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { TrendingUp, Users, FileText, Zap } from "lucide-react";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function AnimatedNumber({ value, suffix = "", duration = 2 }: AnimatedNumberProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const controls = animate(count, value, { duration });

    return controls.stop;
  }, [value, duration]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest.toLocaleString());
    });

    return unsubscribe;
  }, [rounded]);

  return <span>{displayValue}{suffix}</span>;
}

export default function DashboardHero() {
  const metrics = [
    {
      icon: Users,
      label: "Active Researchers",
      value: 12547,
      suffix: "+",
      trend: "+23%",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: FileText,
      label: "Documents Analyzed",
      value: 1847293,
      suffix: "",
      trend: "+156%",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Zap,
      label: "Queries Per Day",
      value: 584920,
      suffix: "",
      trend: "+89%",
      color: "from-green-500 to-green-600",
    },
    {
      icon: TrendingUp,
      label: "Success Rate",
      value: 98.7,
      suffix: "%",
      trend: "+2.3%",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-6 py-20">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-blue-700">Live Research Analytics</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              DocScout
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Platform Insights
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real-time analytics powering the future of academic research
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative"
              >
                <div className="h-full bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all">
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${metric.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Value */}
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    <AnimatedNumber value={metric.value} suffix={metric.suffix} />
                  </div>

                  {/* Label */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">{metric.label}</p>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {metric.trend}
                    </span>
                  </div>

                  {/* Hover gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity pointer-events-none`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">All Systems Operational</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">99.97%</span>
                <span>Uptime</span>
              </div>
              <div className="h-4 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">0.34s</span>
                <span>Avg Response</span>
              </div>
              <div className="h-4 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">10,247</span>
                <span>Nodes Active</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
