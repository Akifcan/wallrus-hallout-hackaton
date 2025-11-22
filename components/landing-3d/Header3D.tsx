"use client";

import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

export default function Header3D() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => scrollToSection("hero")}
          >
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              <Search className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              DocScout
            </span>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse ml-1" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("features")}
              className="relative text-blue-100 hover:text-white transition-colors font-medium group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="relative text-blue-100 hover:text-white transition-colors font-medium group"
            >
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="relative text-blue-100 hover:text-white transition-colors font-medium group"
            >
              Benefits
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300" />
            </button>
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all border-0">
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="bg-slate-950/95 backdrop-blur-xl border-t border-white/10 p-6 space-y-4">
          <button
            onClick={() => scrollToSection("features")}
            className="block w-full text-left text-blue-100 hover:text-white transition-colors font-medium py-3 px-4 rounded-lg hover:bg-white/5"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="block w-full text-left text-blue-100 hover:text-white transition-colors font-medium py-3 px-4 rounded-lg hover:bg-white/5"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection("benefits")}
            className="block w-full text-left text-blue-100 hover:text-white transition-colors font-medium py-3 px-4 rounded-lg hover:bg-white/5"
          >
            Benefits
          </button>
          <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
}
