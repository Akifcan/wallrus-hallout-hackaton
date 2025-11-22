"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion, useInView } from "framer-motion";
import { dorkQueryVertexShader, dorkQueryFragmentShader } from "./shaders";

interface AnimatedQueryProps {
  query: string;
  delay: number;
}

function AnimatedQuery({ query, delay }: AnimatedQueryProps) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setRevealed(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="font-mono text-sm border-l-4 border-black pl-4 py-2 bg-white/80"
    >
      <span className="text-black/50">$ </span>
      <span className="text-black">{query}</span>
    </motion.div>
  );
}

function DorkQueryPlane() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRevealProgress: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.elapsedTime;
      uniforms.uRevealProgress.value = Math.min(
        1.0,
        (Math.sin(state.clock.elapsedTime * 0.5) + 1) * 0.5
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[4, 3, 32, 32]} />
      <shaderMaterial
        vertexShader={dorkQueryVertexShader}
        fragmentShader={dorkQueryFragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function GoogleDorkSection() {
  const queries = [
    'site:edu filetype:pdf "machine learning"',
    'intitle:"research paper" AND "neural networks"',
    'inurl:papers site:.edu "deep learning" 2024',
    '"systematic review" filetype:pdf -site:researchgate',
    'site:arxiv.org "artificial intelligence" after:2024',
    'related:scholar.google.com "academic research"',
  ];

  const features = [
    {
      title: "Boolean Operators",
      description: "Automated AND, OR, NOT logic for precision targeting",
      icon: "∧∨¬",
    },
    {
      title: "Site Filtering",
      description: "Target .edu, .gov, and academic domains exclusively",
      icon: "🎯",
    },
    {
      title: "File Type Search",
      description: "PDF, DOC, PPT - extract knowledge from any format",
      icon: "📄",
    },
    {
      title: "Date Filtering",
      description: "Access latest publications with temporal constraints",
      icon: "📅",
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      {/* Background dither pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0zm2 2h1v1H2z' fill='%23000'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            {/* Label */}
            <div className="inline-block border-2 border-black px-4 py-1 mb-6">
              <span className="font-mono text-xs uppercase tracking-widest">
                Query Optimization
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Google Dork Intelligence
            </h2>

            <div className="w-16 h-1 bg-black mb-6" />

            {/* Description */}
            <p className="font-mono text-base text-black/80 leading-relaxed mb-8">
              DocScout transforms natural language queries into advanced search
              operators, leveraging Google dork techniques to penetrate deep web
              repositories and surface hidden academic treasures. Our AI rewrites,
              optimizes, and executes precision searches across 50+ databases.
            </p>

            {/* Features list */}
            <div className="space-y-4 mb-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 border-l-2 border-black pl-4"
                >
                  <div className="text-2xl min-w-[40px]">{feature.icon}</div>
                  <div>
                    <h4 className="font-mono font-bold text-black mb-1">
                      {feature.title}
                    </h4>
                    <p className="font-mono text-sm text-black/70">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Example queries */}
            <div className="border-4 border-black p-6 bg-[#f5f5f3]">
              <div className="font-mono text-xs uppercase tracking-wider mb-4 text-black/60">
                Example Queries ↓
              </div>
              <div className="space-y-2">
                {queries.slice(0, 3).map((query, idx) => (
                  <AnimatedQuery key={idx} query={query} delay={idx * 200} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: 3D Visualization */}
          <div className="relative h-[600px] border-4 border-black bg-[#f5f5f3]">
            <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
              <color attach="background" args={["#f5f5f3"]} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={0.5} />
              <DorkQueryPlane />
            </Canvas>

            {/* Overlay statistics */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Queries/Sec", value: "142" },
                  { label: "Accuracy", value: "98.7%" },
                  { label: "Sources", value: "50+" },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white border-2 border-black p-4 text-center">
                    <div className="font-mono text-2xl font-bold text-black">
                      {stat.value}
                    </div>
                    <div className="font-mono text-xs text-black/60 uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
