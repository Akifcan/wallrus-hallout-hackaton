"use client";

import { Telescope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function CosmicHeader() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-30 bg-black/20 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-lg opacity-50 rounded-full" />
              <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-full">
                <Telescope className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                DocScout
              </h1>
              <p className="text-xs text-blue-300/60">Research Constellation</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
              Explore
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
              Discover
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
              Learn
            </a>
          </nav>

          {/* CTA */}
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 shadow-lg shadow-blue-500/50"
          >
            Begin Journey
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
