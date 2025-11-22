"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { Search, Sparkles, Save } from "lucide-react";

interface MorphingShapeProps {
  step: number;
  color: string;
}

function MorphingShape({ step, color }: MorphingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  const getGeometry = () => {
    switch (step) {
      case 0:
        return <boxGeometry args={[2, 2, 2]} />;
      case 1:
        return <octahedronGeometry args={[1.5, 0]} />;
      case 2:
        return <torusKnotGeometry args={[1, 0.3, 100, 16]} />;
      default:
        return <sphereGeometry args={[1.5, 32, 32]} />;
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        {getGeometry()}
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.4}
          radius={1}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        {getGeometry()}
        <meshBasicMaterial color={color} wireframe opacity={0.2} transparent />
      </mesh>
    </Float>
  );
}

function StepScene({ activeStep }: { activeStep: number }) {
  const colors = ["#3b82f6", "#6366f1", "#8b5cf6"];

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6366f1" />

      <MorphingShape step={activeStep} color={colors[activeStep]} />

      {/* Particle ring */}
      <group rotation={[Math.PI / 4, 0, 0]}>
        {Array.from({ length: 50 }).map((_, i) => {
          const angle = (i / 50) * Math.PI * 2;
          const radius = 3;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                0,
                Math.sin(angle) * radius,
              ]}
            >
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshBasicMaterial
                color={colors[activeStep]}
                transparent
                opacity={0.6}
              />
            </mesh>
          );
        })}
      </group>
    </>
  );
}

interface StepCardProps {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
  gradient: string;
}

function StepCard({
  number,
  icon: Icon,
  title,
  description,
  isActive,
  onClick,
  gradient,
}: StepCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`cursor-pointer transition-all duration-500 ${
        isActive ? "scale-105" : "scale-100 opacity-70 hover:opacity-100"
      }`}
    >
      {/* Glow */}
      {isActive && (
        <div
          className={`absolute -inset-2 bg-gradient-to-r ${gradient} rounded-2xl blur-2xl opacity-50`}
        />
      )}

      {/* Card */}
      <div
        className={`relative bg-slate-900/90 backdrop-blur-xl border rounded-2xl p-8 transition-all duration-500 ${
          isActive
            ? "border-white/30 shadow-[0_0_50px_rgba(59,130,246,0.3)]"
            : "border-white/10"
        }`}
      >
        {/* Number badge */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`text-6xl font-bold bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}
          >
            {number}
          </div>
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${gradient} ${
              isActive ? "animate-pulse" : ""
            }`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-blue-100/70 leading-relaxed">{description}</p>

        {/* Active indicator */}
        {isActive && (
          <div className="absolute top-4 right-4">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping" />
            <div className="absolute top-0 right-0 w-3 h-3 bg-blue-400 rounded-full" />
          </div>
        )}

        {/* Scanline effect */}
        {isActive && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scan-down rounded-2xl pointer-events-none" />
        )}
      </div>
    </div>
  );
}

export default function HowItWorks3D() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Input Research Query",
      description:
        "Enter your research topic, question, or keywords. Our neural interface understands natural language and research intent.",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      number: "02",
      icon: Sparkles,
      title: "AI Optimization Engine",
      description:
        "Advanced algorithms rewrite queries, apply Google dorks, scan multiple sources, and rank results by relevance in milliseconds.",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      number: "03",
      icon: Save,
      title: "Store to Walrus",
      description:
        "AI-generated summaries, extracted data, and original documents are encrypted and saved to decentralized Walrus storage forever.",
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] animate-grid-flow" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[128px] animate-pulse-slow delay-1000" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-8">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-indigo-200">
              Three-Step Process
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            How DocScout{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>

          <p className="text-xl text-blue-100/70 max-w-3xl mx-auto">
            From query to knowledge in three seamless, AI-powered steps
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Visualization */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-900/50 backdrop-blur-xl border border-white/10">
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <StepScene activeStep={activeStep} />
              </Canvas>

              {/* Step indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeStep
                        ? "bg-blue-400 w-12"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="order-1 lg:order-2 space-y-6">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                {...step}
                isActive={activeStep === index}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>
        </div>

        {/* Timeline connector */}
        <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-1 h-64 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 opacity-20" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scan-down {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .animate-scan-down {
          animation: scan-down 2s ease-in-out infinite;
        }

        @keyframes grid-flow {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(3rem);
          }
        }

        .animate-grid-flow {
          animation: grid-flow 20s linear infinite;
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
