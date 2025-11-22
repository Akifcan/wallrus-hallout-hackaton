"use client";

import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { newspaperVertexShader, newspaperFragmentShader } from "./shaders";

interface NewspaperPlaneProps {
  position?: [number, number, number];
}

function NewspaperPlane({ position = [0, 0, 0] }: NewspaperPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWaveAmplitude: { value: 0.15 },
      uDitherScale: { value: 0.5 },
      uHalftoneScale: { value: 8.0 },
      uInkDensity: { value: 1.2 },
      uUseTexture: { value: false },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.elapsedTime;

      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[6, 8, 64, 64]} />
      <shaderMaterial
        vertexShader={newspaperVertexShader}
        fragmentShader={newspaperFragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function FloatingCitations() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 50;

  const { positions, sizes, alphas, rotations } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);
    const rotations = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Scattered around the scene
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      sizes[i] = Math.random() * 30 + 10;
      alphas[i] = Math.random() * 0.4 + 0.2;
      rotations[i] = Math.random() * Math.PI * 2;
    }

    return { positions, sizes, alphas, rotations };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      // Slow orbital rotation
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;

      // Gentle vertical movement
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-alpha"
          args={[alphas, 1]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-rotation"
          args={[rotations, 1]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={20}
        color="#1a1a1a"
        transparent
        opacity={0.6}
        sizeAttenuation
        alphaTest={0.01}
      />
    </points>
  );
}

function BackgroundGrid() {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} rotation={[0, 0, 0]}>
      <planeGeometry args={[50, 50, 100, 100]} />
      <meshBasicMaterial
        color="#e5e5e5"
        wireframe
        transparent
        opacity={0.1}
      />
    </mesh>
  );
}

export default function ResearchHero() {
  return (
    <div className="relative w-full min-h-screen bg-[#f5f5f3] pt-28">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 opacity-40">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={["#f5f5f3"]} />
          <fog attach="fog" args={["#f5f5f3", 8, 20]} />

          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffffff" />
          <directionalLight position={[-10, -5, -5]} intensity={0.3} color="#cccccc" />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.2}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />

          <BackgroundGrid />
          <NewspaperPlane />
          <FloatingCitations />
        </Canvas>
      </div>

      {/* Content - Brutalist Layout */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 border-2 border-black bg-white px-4 py-2">
              <div className="w-3 h-3 bg-black" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-black">
                RESEARCH PLATFORM
              </span>
            </div>

            {/* Main Headline - Split Layout */}
            <div className="space-y-4">
              <h1 className="font-serif text-8xl md:text-9xl lg:text-[12rem] font-black text-black leading-[0.85] tracking-tight">
                DOC
                <br />
                SCOUT
              </h1>
              <div className="h-2 w-32 bg-black" />
            </div>

            {/* Description */}
            <div className="max-w-lg space-y-6">
              <p className="font-mono text-base text-black/80 leading-relaxed">
                Your AI-powered research companion that aggregates scattered information from across the web.
                Discover PDFs, papers, and documents using intelligent search techniques, then summarize
                and refine them with artificial intelligence—all in one powerful platform.
              </p>
              <div className="flex items-center gap-4">
                <div className="h-1 w-16 bg-black" />
                <span className="font-mono text-xs text-black/60 uppercase tracking-wider">
                  EST. 2025
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-10 py-5 bg-black text-white font-mono text-sm font-bold uppercase tracking-wider border-2 border-black hover:bg-white hover:text-black transition-all duration-200">
                Start Research
              </button>
            </div>
          </div>

          {/* Right Column - Research Paper Preview */}
          <div className="lg:sticky lg:top-32">
            <div className="border-2 border-black bg-white p-8 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-black pb-4">
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-black">
                  Recent Discovery
                </h3>
                <div className="w-4 h-4 border-2 border-black bg-black" />
              </div>

              {/* Paper Preview */}
              <div className="space-y-4">
                <div>
                  <div className="font-serif text-lg font-bold text-black mb-2 leading-tight">
                    AI-Powered Research Methodology: A Comprehensive Analysis
                  </div>
                  <div className="font-mono text-xs text-black/60 mb-3">
                    Smith, J. et al. • Journal of Research Intelligence • 2025
                  </div>
                  <p className="font-mono text-xs text-black/70 leading-relaxed line-clamp-3">
                    This paper presents a novel approach to academic research using
                    artificial intelligence and blockchain technology. Our methodology
                    demonstrates significant improvements in citation accuracy...
                  </p>
                </div>

                {/* Citation Preview */}
                <div className="pt-4 border-t-2 border-black">
                  <div className="font-mono text-[10px] text-black/60 uppercase tracking-wider mb-2">
                    Citation (APA)
                  </div>
                  <div className="bg-black/5 p-3 border border-black/20">
                    <p className="font-mono text-[10px] text-black/80 leading-relaxed">
                      Smith, J., Doe, A., & Johnson, B. (2025). AI-powered research
                      methodology: A comprehensive analysis.{" "}
                      <span className="italic">Journal of Research Intelligence</span>,{" "}
                      <span className="font-bold">1</span>(1), 45-67.
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {["AI", "Research", "Blockchain"].map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 border border-black bg-white font-mono text-[10px] text-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t-2 border-black">
                <button className="w-full border-2 border-black bg-black text-white font-mono text-xs font-bold uppercase tracking-wider py-3 hover:bg-white hover:text-black transition-all duration-200">
                  View Full Paper →
                </button>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t-2 border-black">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-black/50 uppercase tracking-wider">
                    From Library
                  </span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-black" />
                    <div className="w-1.5 h-1.5 bg-black/40" />
                    <div className="w-1.5 h-1.5 bg-black/20" />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="mt-6 flex gap-4">
              <div className="w-16 h-16 border-2 border-black bg-white rotate-[-4deg]" />
              <div className="w-16 h-16 border-2 border-black bg-black rotate-[4deg]" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-20 flex flex-col items-center gap-4">
          <span className="font-mono text-xs text-black/40 uppercase tracking-wider">Scroll</span>
          <div className="flex flex-col gap-2">
            <motion.div
              className="w-1 h-8 bg-black"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="w-1 h-8 bg-black/60"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
