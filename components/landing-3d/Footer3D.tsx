"use client";

import { Search, Twitter, Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export default function Footer3D() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Features", id: "features" },
      { label: "How It Works", id: "how-it-works" },
      { label: "Benefits", id: "benefits" },
    ],
    resources: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Support Center", href: "#" },
      { label: "Community", href: "#" },
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-white/10 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-indigo-950/30" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Glow orbs */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[128px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6 group cursor-pointer">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                <Search className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                DocScout
              </span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            </div>

            <p className="text-blue-100/60 mb-6 leading-relaxed max-w-sm">
              Next-generation AI research platform. Discover, analyze, and organize
              information with advanced search optimization and decentralized storage.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="group p-3 bg-white/5 hover:bg-gradient-to-br hover:from-blue-500 hover:to-indigo-600 rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
              Product
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-blue-100/70 hover:text-white transition-colors hover:translate-x-1 inline-flex items-center gap-2 transform duration-200 group"
                  >
                    <span className="w-0 h-px bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
              Resources
              <div className="w-1 h-1 bg-indigo-400 rounded-full animate-pulse" />
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-blue-100/70 hover:text-white transition-colors hover:translate-x-1 inline-flex items-center gap-2 transform duration-200 group"
                  >
                    <span className="w-0 h-px bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
              Company
              <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-blue-100/70 hover:text-white transition-colors hover:translate-x-1 inline-flex items-center gap-2 transform duration-200 group"
                  >
                    <span className="w-0 h-px bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-900/30 via-indigo-900/30 to-purple-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                Stay Updated
              </h3>
              <p className="text-blue-100/70 mb-6">
                Get the latest updates on AI research tools and features
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-blue-200/40 focus:outline-none focus:border-blue-400 transition-colors"
                />
                <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg font-medium shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all flex items-center justify-center gap-2 group">
                  Subscribe
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-100/50 text-sm">
              &copy; {currentYear} DocScout. Built with cutting-edge AI technology.
            </p>

            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-blue-100/50 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-blue-100/50 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-blue-100/50 hover:text-white transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
