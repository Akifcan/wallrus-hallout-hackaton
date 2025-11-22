"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { waveVertexShader, waveFragmentShader } from "./shaders";
import { Clock, Target, FolderOpen, Shield, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

function WavePlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useRef({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color("#1e40af") }, // blue-800
    uColor2: { value: new THREE.Color("#4f46e5") }, // indigo-600
    uWaveAmplitude: { value: 0.3 },
    uWaveFrequency: { value: 2.0 },
  });

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={waveVertexShader}
        fragmentShader={waveFragmentShader}
        uniforms={uniforms.current}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particlesCount = 1000;

  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

    const color = new THREE.Color();
    color.setHSL(0.6 + Math.random() * 0.1, 0.7, 0.6);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function BenefitScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#3b82f6" />
      <WavePlane />
      <ParticleField />
    </>
  );
}

interface BenefitCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  index: number;
}

function BenefitCard({ icon: Icon, title, description, stat, statLabel, index }: BenefitCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: index * 0.15,
        ease: "power3.out",
      });
    }
  }, [index]);

  return (
    <div ref={cardRef} className="group relative">
      {/* Glow on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

      {/* Card */}
      <div className="relative h-full bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-all duration-500 group-hover:border-white/30 group-hover:transform group-hover:-translate-y-2">
        {/* Holographic effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative flex items-start gap-6">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <Icon className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-200 group-hover:to-indigo-200 group-hover:bg-clip-text transition-all duration-300">
              {title}
            </h3>
            <p className="text-blue-100/70 mb-4 leading-relaxed">{description}</p>

            {/* Stat */}
            <div className="inline-flex items-baseline gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg border border-blue-400/30">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                {stat}
              </span>
              <span className="text-sm font-medium text-blue-200/80">{statLabel}</span>
            </div>
          </div>
        </div>

        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-border-flow" />
        </div>
      </div>
    </div>
  );
}

export default function Benefits3D() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const benefits = [
    {
      icon: Clock,
      title: "Accelerated Research",
      description:
        "AI-powered optimization reduces research time by 70%, letting you focus on insights instead of searching.",
      stat: "70%",
      statLabel: "Faster",
    },
    {
      icon: Target,
      title: "Precision Results",
      description:
        "Advanced algorithms deliver 5x more relevant results compared to traditional search methods.",
      stat: "5x",
      statLabel: "Relevance",
    },
    {
      icon: FolderOpen,
      title: "Perfect Organization",
      description:
        "Neural categorization keeps 100% of your research structured and instantly accessible.",
      stat: "100%",
      statLabel: "Organized",
    },
    {
      icon: Shield,
      title: "Eternal Security",
      description:
        "Walrus blockchain ensures your research is permanently stored with cryptographic security.",
      stat: "∞",
      statLabel: "Permanent",
    },
  ];

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
          <BenefitScene />
        </Canvas>
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-8">
            <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-sm font-semibold text-blue-200">Why DocScout</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Built for{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Research Excellence
            </span>
          </h2>

          <p className="text-xl text-blue-100/70 max-w-3xl mx-auto">
            Join the next generation of researchers leveraging AI to push the boundaries of
            knowledge
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative">
          {/* Glow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-purple-500/30 rounded-3xl blur-3xl" />

          {/* Card */}
          <div className="relative bg-gradient-to-r from-blue-900/50 via-indigo-900/50 to-purple-900/50 backdrop-blur-xl border border-white/20 rounded-3xl p-12 overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-shimmer" />
            </div>

            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 group">
                <TrendingUp className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Research?
              </h3>

              <p className="text-lg md:text-xl text-blue-100/80 mb-8 max-w-2xl mx-auto">
                Join 10,000+ researchers already using DocScout to accelerate their academic
                success
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-7 text-lg font-semibold shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all group"
                >
                  <span className="relative z-10">Start Free Trial</span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-xl px-10 py-7 text-lg font-semibold"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -250% 0;
          }
          100% {
            background-position: 250% 0;
          }
        }

        .animate-shimmer {
          animation: shimmer 8s ease-in-out infinite;
        }

        @keyframes border-flow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-border-flow {
          animation: border-flow 3s linear infinite;
        }
      `}</style>
    </section>
  );
}
