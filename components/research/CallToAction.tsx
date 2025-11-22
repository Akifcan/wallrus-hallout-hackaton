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
          Join 12,500+ students and researchers who trust DocScout for homework support
          and academic research. Discover documents faster, summarize smarter, and store
          permanently with blockchain technology.
        </motion.p>

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
