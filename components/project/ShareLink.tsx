"use client";

import { useState } from "react";

interface ShareLinkProps {
  slug: string;
  isPublic: boolean;
}

export default function ShareLink({ slug, isPublic }: ShareLinkProps) {
  const [copied, setCopied] = useState(false);

  if (!isPublic) {
    return null;
  }

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/publishments/${slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="border-4 border-black bg-white p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
          Public Research - Share Link
        </span>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="flex-1 font-mono text-sm bg-black/5 border-2 border-black px-4 py-2 text-black/80"
        />
        <button
          onClick={handleCopy}
          className={`font-mono text-xs font-bold uppercase tracking-wider border-2 border-black px-4 py-2 transition-colors ${
            copied
              ? "bg-green-500 text-white border-green-500"
              : "bg-black text-white hover:bg-white hover:text-black"
          }`}
        >
          {copied ? "✓ COPIED!" : "COPY LINK"}
        </button>
      </div>
    </div>
  );
}
