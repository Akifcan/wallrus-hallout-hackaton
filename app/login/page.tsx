"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f3] flex">
      {/* Left Side - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 bg-black text-white flex-col justify-between p-12 relative overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 border-2 border-white/20 rotate-45 translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-2 border-white/20 rotate-[-45] -translate-x-16 translate-y-16" />

        {/* Logo */}
        <div>
          <Link href="/" className="inline-block mb-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 border-4 border-white bg-white flex items-center justify-center">
                <span className="font-serif text-5xl font-black text-black">DS</span>
              </div>
              <div>
                <div className="font-serif text-4xl font-black leading-none">
                  DOCSCOUT
                </div>
                <div className="font-mono text-xs text-white/60 uppercase tracking-[0.3em]">
                  RESEARCH PLATFORM
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Content */}
        <div className="space-y-8 max-w-md">
          <div>
            <div className="h-2 w-24 bg-white mb-6" />
            <h2 className="font-serif text-5xl font-black leading-tight mb-6">
              Research
              <br />
              Intelligence
            </h2>
            <p className="font-mono text-sm text-white/80 leading-relaxed">
              Connect with your Sui wallet to access advanced research tools,
              AI-powered analysis, and decentralized storage.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center gap-4">
          <div className="w-4 h-4 border-2 border-white bg-white" />
          <span className="font-mono text-xs text-white/60 uppercase tracking-wider">
            Powered By Walrus • Decentralized
          </span>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden mb-12 text-center">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center gap-3 justify-center">
                <div className="w-14 h-14 border-3 border-black bg-white flex items-center justify-center">
                  <span className="font-serif text-3xl font-black text-black">DS</span>
                </div>
                <div>
                  <div className="font-serif text-2xl font-black text-black leading-none">
                    DOCSCOUT
                  </div>
                  <div className="font-mono text-[9px] text-black/50 uppercase tracking-[0.3em]">
                    RESEARCH
                  </div>
                </div>
              </div>
            </Link>
            <div className="h-1 w-20 bg-black mx-auto" />
          </div>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 border-2 border-black bg-black" />
              <h1 className="font-mono text-3xl font-black uppercase tracking-wider text-black">
                Sign In
              </h1>
            </div>
            <div className="h-1 w-20 bg-black" />
          </div>

          {/* Sui Wallet Button - Large */}
          <motion.button
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="w-full border-2 border-black bg-black text-white font-mono text-base font-bold uppercase tracking-wider py-5 px-8 hover:bg-white hover:text-black transition-all duration-200 flex items-center justify-center gap-4 group mb-6"
          >
            <div className="w-8 h-8 border-2 border-white bg-white group-hover:bg-black group-hover:border-black transition-colors flex items-center justify-center">
              <span className="text-sm font-black text-black group-hover:text-white transition-colors">
                SUI
              </span>
            </div>
            <span>Connect Sui Wallet</span>
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="group-hover:translate-x-2 transition-transform"
            >
              <path
                d="M4 10H16M16 10L12 6M16 10L12 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.button>

          {/* Footer Links */}
          <div className="space-y-4 pt-6 border-t-2 border-black">
            <Link
              href="/"
              className="font-mono text-xs text-black/50 uppercase tracking-wider hover:text-black transition-colors inline-flex items-center gap-2"
            >
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

