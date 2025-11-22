"use client";

import { Search, Twitter, Github, Linkedin, Mail } from "lucide-react";

export default function ModernFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg">
                <Search className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                DocScout
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              AI-powered research platform for modern academics.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
