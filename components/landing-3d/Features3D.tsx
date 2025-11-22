"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { Search, FileText, Sparkles, Database } from "lucide-react";

interface FeatureOrbProps {
  position: [number, number, number];
  color: string;
  delay?: number;
}

function FeatureOrb({ position, color, delay = 0 }: FeatureOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.5,
        delay,
        ease: "elastic.out(1, 0.5)",
      });
    }
  }, [delay]);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[0.5, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.3}
          radius={1}
          transparent
          opacity={0.8}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
}

function FeatureScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />

      <FeatureOrb position={[-2, 1, 0]} color="#3b82f6" delay={0} />
      <FeatureOrb position={[2, 1, 0]} color="#6366f1" delay={0.2} />
      <FeatureOrb position={[-2, -1, 0]} color="#8b5cf6" delay={0.4} />
      <FeatureOrb position={[2, -1, 0]} color="#7c3aed" delay={0.6} />
    </>
  );
}

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  index: number;
}

function FeatureCard({ icon: Icon, title, description, gradient, index }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
        },
      });
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-500`}
      />

      {/* Card */}
      <div className="relative h-full bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-all duration-500 group-hover:border-white/30">
        {/* Holographic overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon */}
        <div className="relative mb-6">
          <div
            className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${gradient} shadow-lg transition-transform duration-500 ${
              isHovered ? "scale-110 rotate-3" : ""
            }`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>

          {/* Icon glow */}
          <div
            className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${gradient} rounded-xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
          />
        </div>

        {/* Content */}
        <h3 className="relative text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 group-hover:bg-clip-text transition-all duration-300">
          {title}
        </h3>

        <p className="relative text-blue-100/70 leading-relaxed">{description}</p>

        {/* Scan line effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-full transition-transform duration-1000 ${
            isHovered ? "translate-y-full" : "-translate-y-full"
          }`}
          style={{ transform: isHovered ? "translateY(100%)" : "translateY(-100%)" }}
        />
      </div>
    </div>
  );
}

export default function Features3D() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Search,
      title: "Quantum Search",
      description:
        "Advanced Google dork techniques powered by AI to find exactly what you need across the vast digital universe.",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: FileText,
      title: "Multi-Format Intelligence",
      description:
        "Seamlessly search and analyze PDFs, documents, research papers, and any file type with neural precision.",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      icon: Sparkles,
      title: "Neural Summarization",
      description:
        "AI-powered extraction and summarization that understands context, saving hours of manual research.",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: Database,
      title: "Decentralized Vault",
      description:
        "Permanent, immutable storage on Walrus blockchain. Your research, secured forever in the decentralized cloud.",
      gradient: "from-violet-500 to-violet-600",
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { ScrollTrigger } = require("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <FeatureScene />
        </Canvas>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-8">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-blue-200">Core Capabilities</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Powered by{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Advanced AI
            </span>
          </h2>

          <p className="text-xl text-blue-100/70 max-w-3xl mx-auto">
            Cutting-edge technology meets intuitive design for the ultimate research experience
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
          <div className="relative bg-gradient-to-r from-blue-900/50 via-indigo-900/50 to-purple-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Built for the Next Generation
            </h3>
            <p className="text-lg text-blue-100/70 max-w-2xl mx-auto">
              Join thousands of researchers leveraging cutting-edge AI to push the boundaries of
              knowledge
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
