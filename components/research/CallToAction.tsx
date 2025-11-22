"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CallToAction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background dither pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0zm2 2h1v1H2zm-2 4h1v1H0zm4-2h1v1H4z' fill='%23fff'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        {/* Top border */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          className="w-full h-1 bg-white mb-12 origin-center"
        />

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2 }}
          className="inline-block border-4 border-white px-6 py-2 mb-8"
        >
          <span className="font-mono text-sm uppercase tracking-widest">
            Join The Research Revolution
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.3 }}
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
        >
          Ready to Transform
          <br />
          Your Research?
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4 }}
          className="font-mono text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Join 12,500+ researchers leveraging AI-powered search intelligence and
          blockchain storage. Start your free trial today—no credit card required.
        </motion.p>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-12"
        >
          {[
            { value: "98.7%", label: "Search Precision" },
            { value: "0.34s", label: "Avg Response" },
            { value: "∞", label: "Storage Time" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="font-serif text-4xl font-bold mb-2">{stat.value}</div>
              <div className="w-12 h-1 bg-white mx-auto mb-2" />
              <div className="font-mono text-xs uppercase tracking-wider text-white/60">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button className="group relative px-10 py-5 bg-white text-black font-mono text-sm uppercase tracking-wider border-4 border-white hover:bg-black hover:text-white transition-all duration-300">
            <span className="relative z-10">Start Free Trial</span>
            <div className="absolute inset-0 bg-white transform group-hover:translate-x-2 group-hover:translate-y-2 transition-transform -z-10" />
          </button>

          <button className="group px-10 py-5 bg-transparent text-white font-mono text-sm uppercase tracking-wider border-4 border-white hover:bg-white hover:text-black transition-all duration-300">
            Schedule Demo
          </button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 pt-12 border-t-2 border-white/20"
        >
          <div className="font-mono text-xs text-white/60 uppercase tracking-wider mb-6">
            Trusted by Researchers At
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {["MIT", "Stanford", "Oxford", "Harvard", "Cambridge"].map((uni) => (
              <div
                key={uni}
                className="font-serif text-2xl font-bold text-white/40 hover:text-white transition-colors"
              >
                {uni}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom border */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          className="w-full h-1 bg-white mt-12 origin-center"
        />
      </div>
    </section>
  );
}
