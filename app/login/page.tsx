"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f3] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Link href="/" className="inline-block mb-6">
            <div className="flex items-center gap-4 justify-center">
              <div className="w-16 h-16 border-[3px] border-black bg-white flex items-center justify-center rotate-[-4deg]">
                <span className="font-serif text-4xl font-black text-black">DS</span>
              </div>
              <div>
                <div className="font-serif text-3xl font-black text-black leading-none">
                  DOCSCOUT
                </div>
                <div className="font-mono text-[10px] text-black/50 uppercase tracking-[0.3em]">
                  RESEARCH
                </div>
              </div>
            </div>
          </Link>
          <div className="h-1 w-24 bg-black mx-auto" />
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-2 border-black bg-white p-8"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-mono text-2xl font-bold uppercase tracking-wider text-black">
                Sign In
              </h1>
              <div className="w-6 h-6 border-2 border-black bg-black" />
            </div>
            <div className="h-1 w-16 bg-black" />
          </div>

          {/* Description */}
          <p className="font-mono text-sm text-black/70 mb-8 leading-relaxed">
            Connect your Sui wallet to access the research platform and start
            your investigation.
          </p>

          {/* Sui Wallet Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full border-2 border-black bg-black text-white font-mono text-sm font-bold uppercase tracking-wider py-4 px-6 hover:bg-white hover:text-black transition-all duration-200 flex items-center justify-center gap-3 group mb-4"
          >
            <div className="w-6 h-6 border-2 border-white bg-white group-hover:bg-black group-hover:border-black transition-colors flex items-center justify-center">
              <span className="text-xs font-black text-black group-hover:text-white transition-colors">
                S
              </span>
            </div>
            <span>Connect Sui Wallet</span>
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-0.5 bg-black" />
            <span className="font-mono text-xs text-black/60 uppercase tracking-wider">
              OR
            </span>
            <div className="flex-1 h-0.5 bg-black" />
          </div>

          {/* Alternative Options */}
          <div className="space-y-3">
            <button className="w-full border-2 border-black bg-white text-black font-mono text-xs font-bold uppercase tracking-wider py-3 px-4 hover:bg-black hover:text-white transition-all duration-200 text-left flex items-center justify-between group">
              <span>Use Email</span>
              <motion.svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path
                  d="M1 6H11M11 6L7 2M11 6L7 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </button>
            <button className="w-full border-2 border-black bg-white text-black font-mono text-xs font-bold uppercase tracking-wider py-3 px-4 hover:bg-black hover:text-white transition-all duration-200 text-left flex items-center justify-between group">
              <span>Guest Access</span>
              <motion.svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path
                  d="M1 6H11M11 6L7 2M11 6L7 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t-2 border-black">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-black/50 uppercase tracking-wider">
                New User?
              </span>
              <Link
                href="/signup"
                className="font-mono text-xs font-bold uppercase tracking-wider text-black hover:underline"
              >
                Create Account
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 border-2 border-black bg-white p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 border-2 border-black bg-black flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-mono text-xs text-black/70 leading-relaxed">
                By connecting your wallet, you agree to our Terms of Service and
                Privacy Policy. Your wallet connection is secure and encrypted.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Link
            href="/"
            className="font-mono text-xs text-black/60 uppercase tracking-wider hover:text-black transition-colors inline-flex items-center gap-2"
          >
            <motion.svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="inline-block"
            >
              <path
                d="M11 6H1M1 6L5 2M1 6L5 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
            Back to Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

