"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function WalrusCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="border-4 border-black bg-black text-white mt-8"
    >
      <div className="grid md:grid-cols-2 gap-0">
        {/* Left - Content */}
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 border-2 border-white flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <div>
              <h3 className="font-mono text-xl font-bold uppercase tracking-wider">
                Create Your Research
              </h3>
              <p className="font-mono text-xs text-white/60 uppercase tracking-wider">
                Free & Decentralized
              </p>
            </div>
          </div>

          <div className="h-1 w-24 bg-white" />

          <p className="font-mono text-sm text-white/80 leading-relaxed">
            Start building your own research archive with DocScout. Search the web for documents,
            summarize content with AI, take notes, and store everything permanently on Walrus
            decentralized storage.
          </p>

          {/* Features List */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border border-white flex items-center justify-center text-xs">✓</div>
              <span className="font-mono text-sm text-white/90">Advanced web search with file type filters</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border border-white flex items-center justify-center text-xs">✓</div>
              <span className="font-mono text-sm text-white/90">AI-powered text summarization</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border border-white flex items-center justify-center text-xs">✓</div>
              <span className="font-mono text-sm text-white/90">Permanent decentralized storage</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border border-white flex items-center justify-center text-xs">✓</div>
              <span className="font-mono text-sm text-white/90">Share your research publicly</span>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <Link
              href="/login"
              className="border-2 border-white bg-white text-black font-mono text-sm font-bold uppercase tracking-wider px-6 py-3 hover:bg-transparent hover:text-white transition-all"
            >
              Get Started Free →
            </Link>
            <Link
              href="/#features"
              className="border-2 border-white bg-transparent text-white font-mono text-sm font-bold uppercase tracking-wider px-6 py-3 hover:bg-white hover:text-black transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right - Walrus Branding */}
        <div className="bg-white text-black p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-8 bg-black" />
              <span className="font-mono text-xs uppercase tracking-wider text-black/60">
                Powered By
              </span>
            </div>
            <Image
              src="/1_primary_logo_black_RGB.png"
              alt="Walrus"
              width={180}
              height={54}
              className="object-contain mb-6"
            />
            <p className="font-mono text-sm text-black/70 leading-relaxed">
              Your research data is stored on Walrus, a decentralized storage network.
              This means your documents are permanent, censorship-resistant, and always accessible.
            </p>
          </div>

          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="border-2 border-black p-3 text-center">
                <div className="font-mono text-2xl font-bold">∞</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-black/60">
                  Permanent
                </div>
              </div>
              <div className="border-2 border-black p-3 text-center">
                <div className="font-mono text-2xl font-bold">🔒</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-black/60">
                  Secure
                </div>
              </div>
              <div className="border-2 border-black p-3 text-center">
                <div className="font-mono text-2xl font-bold">🌐</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-black/60">
                  Global
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t-2 border-black">
              <div className="flex items-center gap-2">
                <Image
                  src="/4_icon_token_RGB.png"
                  alt="Walrus Token"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="font-mono text-xs text-black/60 uppercase tracking-wider">
                  Walrus Testnet
                </span>
              </div>
              <a
                href="https://walrus.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs font-bold uppercase tracking-wider text-black hover:underline"
              >
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
