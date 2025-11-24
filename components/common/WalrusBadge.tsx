"use client";

import Image from "next/image";

export default function WalrusBadge() {
  return (
    <div className="border-4 border-black bg-black p-6 mt-12">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Image
            src="/4_icon_token_RGB.png"
            alt="Walrus"
            width={48}
            height={48}
            className="object-contain"
          />
          <div>
            <p className="font-mono text-sm text-white/60 uppercase tracking-wider mb-1">
              Your research is stored on
            </p>
            <Image
              src="/1_primary_logo_monochrome_RGB.png"
              alt="Walrus"
              width={120}
              height={36}
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          <span className="font-mono text-xs text-white/80 uppercase tracking-wider">
            Decentralized • Permanent • Secure
          </span>
        </div>
      </div>
    </div>
  );
}
