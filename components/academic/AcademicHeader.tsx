"use client";

import { BookOpen, Library } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AcademicHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-lg shadow-md">
              <Library className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-gray-900">DocScout</h1>
              <p className="text-xs text-gray-500">Academic Research Platform</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Research Tools
            </a>
            <a href="#" className="text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Documentation
            </a>
            <a href="#" className="text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Support
            </a>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Sign In
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md">
              <BookOpen className="w-4 h-4 mr-2" />
              Start Research
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
