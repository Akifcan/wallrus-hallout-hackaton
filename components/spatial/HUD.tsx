"use client";

import { useEffect, useState } from "react";

export default function HUD() {
  const [time, setTime] = useState(new Date());
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let lastTime = performance.now();
    let frames = 0;

    const measureFPS = () => {
      frames++;
      const currentTime = performance.now();
      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frames * 1000) / (currentTime - lastTime)));
        frames = 0;
        lastTime = currentTime;
      }
      requestAnimationFrame(measureFPS);
    };

    measureFPS();
  }, []);

  return (
    <>
      {/* Top HUD */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="flex justify-between items-start p-6">
          {/* Logo */}
          <div className="pointer-events-auto">
            <div className="bg-black/80 backdrop-blur-xl border border-cyan-500/50 rounded-lg px-6 py-3">
              <h1 className="text-2xl font-mono font-bold">
                <span className="text-cyan-400 glitch-text" data-text="DOC">
                  DOC
                </span>
                <span className="text-purple-400 glitch-text" data-text="SCOUT">
                  SCOUT
                </span>
                <span className="ml-2 text-green-400 animate-pulse">_</span>
              </h1>
              <div className="text-xs text-cyan-500/70 font-mono mt-1">
                NEURAL_RESEARCH_INTERFACE_v2.1
              </div>
            </div>
          </div>

          {/* System Stats */}
          <div className="bg-black/80 backdrop-blur-xl border border-cyan-500/50 rounded-lg px-4 py-2 font-mono text-xs">
            <div className="flex gap-6">
              <div>
                <span className="text-cyan-500">TIME:</span>{" "}
                <span className="text-green-400">
                  {time.toLocaleTimeString("en-US", { hour12: false })}
                </span>
              </div>
              <div>
                <span className="text-cyan-500">FPS:</span>{" "}
                <span className={fps > 50 ? "text-green-400" : "text-yellow-400"}>{fps}</span>
              </div>
              <div>
                <span className="text-cyan-500">STATUS:</span>{" "}
                <span className="text-green-400 animate-pulse">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
        <div className="p-6">
          {/* Instructions */}
          <div className="bg-black/80 backdrop-blur-xl border border-cyan-500/50 rounded-lg px-6 py-3 font-mono text-sm max-w-2xl mx-auto">
            <div className="flex items-center gap-4 text-cyan-400/70">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border border-cyan-500/50 rounded flex items-center justify-center text-xs">
                  <span className="animate-pulse">◆</span>
                </div>
                <span>CLICK CUBES TO NAVIGATE</span>
              </div>
              <div className="h-4 w-px bg-cyan-500/30" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border border-cyan-500/50 rounded flex items-center justify-center text-xs">
                  🖱
                </div>
                <span>MOUSE TO EXPLORE 3D SPACE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corner Brackets */}
      <div className="fixed top-6 left-6 w-20 h-20 border-t-2 border-l-2 border-cyan-500/30 pointer-events-none z-50" />
      <div className="fixed top-6 right-6 w-20 h-20 border-t-2 border-r-2 border-cyan-500/30 pointer-events-none z-50" />
      <div className="fixed bottom-6 left-6 w-20 h-20 border-b-2 border-l-2 border-cyan-500/30 pointer-events-none z-50" />
      <div className="fixed bottom-6 right-6 w-20 h-20 border-b-2 border-r-2 border-cyan-500/30 pointer-events-none z-50" />

      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10">
        <div className="w-full h-full bg-[linear-gradient(0deg,transparent_50%,rgba(0,255,255,0.1)_50%)] bg-[length:100%_4px] animate-scanlines" />
      </div>

      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      <style jsx>{`
        .glitch-text {
          position: relative;
          display: inline-block;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
        }

        .glitch-text::before {
          animation: glitch-1 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
          color: #00ffff;
          z-index: -1;
        }

        .glitch-text::after {
          animation: glitch-2 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
          color: #ff00ff;
          z-index: -2;
        }

        @keyframes glitch-1 {
          0%,
          100% {
            transform: translate(0);
          }
          20% {
            transform: translate(-1px, 1px);
          }
          40% {
            transform: translate(-1px, -1px);
          }
          60% {
            transform: translate(1px, 1px);
          }
          80% {
            transform: translate(1px, -1px);
          }
        }

        @keyframes glitch-2 {
          0%,
          100% {
            transform: translate(0);
          }
          20% {
            transform: translate(1px, -1px);
          }
          40% {
            transform: translate(1px, 1px);
          }
          60% {
            transform: translate(-1px, -1px);
          }
          80% {
            transform: translate(-1px, 1px);
          }
        }

        @keyframes scanlines {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(4px);
          }
        }

        .animate-scanlines {
          animation: scanlines 0.1s linear infinite;
        }
      `}</style>
    </>
  );
}
