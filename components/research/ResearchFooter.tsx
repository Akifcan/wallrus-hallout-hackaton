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
            <div className="flex gap-4">
              {["Twitter", "GitHub", "LinkedIn", "Discord"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  <span className="font-mono text-xs">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-mono text-sm uppercase tracking-wider mb-4 border-b-2 border-white pb-2">
                {category}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="font-mono text-sm text-white/80 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="border-4 border-white p-8 mb-12">
          <div className="max-w-2xl">
            <h3 className="font-serif text-2xl font-bold mb-4">
              Research Intelligence Digest
            </h3>
            <p className="font-mono text-sm text-white/80 mb-6">
              Weekly insights on AI research tools, search optimization, and
              academic technology. Join 12,500+ researchers.
            </p>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="your.email@university.edu"
                className="flex-1 px-4 py-3 bg-white text-black font-mono text-sm border-2 border-white focus:outline-none focus:border-white/60"
              />
              <button className="px-8 py-3 bg-white text-black font-mono text-sm uppercase tracking-wider border-2 border-white hover:bg-black hover:text-white transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t-2 border-white pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-mono text-sm text-white/60">
              © {currentYear} DocScout Research Bureau. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <div className="font-mono text-xs text-white/60">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                All Systems Operational
              </div>
              <div className="font-mono text-xs text-white/60">
                Version 2.1.0
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative strip */}
      <div className="border-t-4 border-white bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center justify-between font-mono text-xs">
            <span>BUILT WITH ACADEMIC RIGOR</span>
            <span>●</span>
            <span>POWERED BY AI & BLOCKCHAIN</span>
            <span>●</span>
            <span>DESIGNED FOR RESEARCHERS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
