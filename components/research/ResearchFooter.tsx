"use client";

export default function ResearchFooter() {
  const currentYear = new Date().getFullYear();

  const links = {
    Product: ["Features", "Pricing", "API", "Documentation"],
    Company: ["About", "Blog", "Careers", "Press Kit"],
    Resources: ["Community", "Support", "Status", "GitHub"],
    Legal: ["Privacy", "Terms", "Security", "Compliance"],
  };

  return (
    <footer className="bg-black text-white border-t-4 border-black">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 border-4 border-white bg-black flex items-center justify-center">
                <span className="font-serif text-2xl font-bold text-white">D</span>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold leading-none">
                  DOCSCOUT
                </div>
                <div className="font-mono text-xs text-white/60 uppercase tracking-wider">
                  Research Bureau
                </div>
              </div>
            </div>
            <p className="font-mono text-sm text-white/80 leading-relaxed mb-6">
              AI-powered research intelligence platform combining Google dork
              techniques, neural analysis, and blockchain storage for academic
              excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom decorative strip */}
      <div className="border-t-4 border-white bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center justify-between font-mono text-xs">
            <span>BUILT By Overblock</span>
            <span>●</span>
            <span>POWERED BY Warlus</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
