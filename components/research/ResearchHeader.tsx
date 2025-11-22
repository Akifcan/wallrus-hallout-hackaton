"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResearchHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Features", "Technology", "Storage", "Pricing"];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled
          ? "bg-[#f5f5f3] border-b-2 border-black"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="flex items-center justify-between h-28">
          {/* Logo - Side by side layout */}
          <motion.a
            href="/"
            className="flex items-center gap-6 group"
            whileHover={{ x: 4 }}
          >
            <div className="relative">
              <div className="w-16 h-16 border-[3px] border-black bg-white flex items-center justify-center rotate-[-4deg] group-hover:rotate-0 transition-transform duration-300 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                <span className="font-serif text-4xl font-black text-black">D</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-black rounded-full" />
            </div>
            <div>
              <div className="font-serif text-3xl font-black text-black leading-none mb-1">
                DOCSCOUT
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-12 bg-black" />
                <span className="font-mono text-[9px] text-black/60 uppercase tracking-[0.3em]">
                  RESEARCH
                </span>
              </div>
            </div>
          </motion.a>

          {/* Center Navigation - Horizontal line style */}
          <nav className="hidden xl:flex items-center gap-12">
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 border-2 border-black bg-white group-hover:bg-black transition-colors" />
                  <span className="font-mono text-sm font-bold uppercase tracking-[0.15em] text-black">
                    {item}
                  </span>
                </div>
                <motion.div
                  className="absolute -bottom-2 left-0 h-[3px] bg-black"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Right side - CTA */}
          <div className="flex items-center gap-6">
            <motion.button
              className="relative px-10 py-4 bg-black text-white font-mono text-sm font-bold uppercase tracking-wider border-2 border-black group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Start</span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 text-black opacity-0 group-hover:opacity-100 transition-opacity">
                Start
              </span>
            </motion.button>

            {/* Mobile Menu */}
            <button
              className="xl:hidden w-12 h-12 border-2 border-black bg-white flex items-center justify-center group"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  className="w-6 h-0.5 bg-black"
                  animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-black"
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-black"
                  animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-[#f5f5f3] border-t-2 border-black overflow-hidden"
          >
            <nav className="px-8 py-8 flex flex-col gap-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="flex items-center gap-4 font-mono text-base font-bold uppercase tracking-wider text-black border-b-2 border-black/20 pb-4"
                  onClick={() => setMenuOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-3 h-3 border-2 border-black bg-white" />
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom accent line when scrolled */}
      {scrolled && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="h-1 bg-black origin-left"
        />
      )}
    </motion.header>
  );
}
