"use client";

import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">DocScout Analytics</h1>
              <p className="text-xs text-gray-500">Research Platform Dashboard</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Overview
            </a>
            <a href="#" className="text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Metrics
            </a>
            <a href="#" className="text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Reports
            </a>
          </nav>

          {/* CTA */}
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
            Access Platform
          </Button>
        </div>
      </div>
    </header>
  );
}
