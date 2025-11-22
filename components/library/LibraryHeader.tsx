"use client";

import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LibraryHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-amber-100/90 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-amber-700 to-orange-800 p-3 rounded-lg shadow-lg">
              <BookOpen className="w-6 h-6 text-amber-50" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-gray-800">DocScout</h1>
              <p className="text-xs text-amber-700">Digital Research Library</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm text-gray-700 hover:text-amber-700 transition-colors font-medium">
              Collections
            </a>
            <a href="#" className="text-sm text-gray-700 hover:text-amber-700 transition-colors font-medium">
              Archives
            </a>
            <a href="#" className="text-sm text-gray-700 hover:text-amber-700 transition-colors font-medium">
              Resources
            </a>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex text-gray-700 hover:text-amber-700 hover:bg-amber-100"
            >
              Sign In
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white shadow-lg"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Start Reading
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
