"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion, useInView } from "framer-motion";
import { walrusNetworkVertexShader, walrusNetworkFragmentShader } from "./shaders";

function WalrusNetworkPlane() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uNodeCount: { value: 10247 },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[8, 6, 128, 128]} />
      <shaderMaterial
        vertexShader={walrusNetworkVertexShader}
        fragmentShader={walrusNetworkFragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 30;

  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const radius = 2 + Math.random() * 1;
      pos.push({
        x: Math.cos(theta) * radius,
        y: Math.sin(theta) * radius,
        z: (Math.random() - 0.5) * 2,
      });
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, idx) => (
        <mesh key={idx} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>
      ))}
    </group>
  );
}

interface StatCardProps {
  value: string;
  label: string;
  delay: number;
}

function StatCard({ value, label, delay }: StatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay }}
      className="relative"
    >
      <div className="border-4 border-black bg-white p-6 text-center hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
        <div className="font-serif text-4xl font-bold text-black mb-2">
          {value}
        </div>
        <div className="w-12 h-1 bg-black mx-auto mb-2" />
        <div className="font-mono text-xs uppercase tracking-wider text-black/70">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export default function WalrusSection() {
  const benefits = [
    {
      title: "Permanent Storage",
      description:
        "One-time payment for infinite data retention. Your research lives forever on the blockchain, accessible across generations.",
      icon: "∞",
    },
    {
      title: "Decentralized Security",
      description:
        "10,247 global nodes ensure 99.999% uptime. No single point of failure, no corporate gatekeepers, no censorship.",
      icon: "🔐",
    },
    {
      title: "Cryptographic Integrity",
      description:
        "Immutable hashing guarantees data hasn't been tampered with. Every document carries mathematical proof of authenticity.",
      icon: "⚡",
    },
    {
      title: "Cost Efficiency",
      description:
        "Pay once, store forever. No monthly subscriptions, no surprise fees, no vendor lock-in. True ownership of your data.",
      icon: "💎",
    },
  ];

  return (
    <section className="py-24 bg-[#f5f5f3] relative overflow-hidden">
      {/* Dithered background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h2v2H0zm4 4h2v2H4zm-4 4h2v2H0zm4-4h2v2H4z' fill='%23000'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block border-4 border-black bg-white px-6 py-2 mb-6">
            <span className="font-mono text-sm uppercase tracking-widest">
              Blockchain Infrastructure
            </span>
          </div>

          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6">
            Walrus Decentralized Storage
          </h2>

          <div className="w-24 h-1 bg-black mx-auto mb-6" />

          <p className="font-mono text-lg text-black/80 max-w-3xl mx-auto leading-relaxed">
            Your research deserves immortality. DocScout leverages Walrus blockchain
            technology to provide permanent, censorship-resistant, and cryptographically
            secure storage across a global network of 10,247 nodes.
          </p>
        </div>

        {/* 3D Network Visualization */}
        <div className="mb-16">
          <div className="relative h-[500px] border-4 border-black bg-white overflow-hidden">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
              <color attach="background" args={["#f5f5f3"]} />
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={0.4} />
              <WalrusNetworkPlane />
              <NetworkNodes />
            </Canvas>

            {/* Overlay title */}
            <div className="absolute top-6 left-6 border-2 border-black bg-white px-4 py-2">
              <span className="font-mono text-xs uppercase tracking-wider">
                Live Network Topology
              </span>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <StatCard value="10,247" label="Active Nodes" delay={0} />
          <StatCard value="99.999%" label="Uptime SLA" delay={0.1} />
          <StatCard value="∞" label="Retention" delay={0.2} />
          <StatCard value="2.4PB" label="Stored Data" delay={0.3} />
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="border-4 border-black bg-white p-8 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl">{benefit.icon}</div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-black mb-3">
                    {benefit.title}
                  </h3>
                  <div className="w-12 h-1 bg-black mb-3" />
                  <p className="font-mono text-sm text-black/80 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How it works section */}
        <div className="border-4 border-black bg-white p-12">
          <h3 className="font-serif text-3xl font-bold text-black mb-8 text-center">
            How Walrus Storage Works
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Upload",
                desc: "Submit research documents to DocScout interface",
              },
              {
                step: "2",
                title: "Fragment",
                desc: "Data is encrypted and split into redundant shards",
              },
              {
                step: "3",
                title: "Distribute",
                desc: "Shards replicate across 10,247 global nodes",
              },
              {
                step: "4",
                title: "Verify",
                desc: "Cryptographic hashing ensures permanent integrity",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 border-4 border-black bg-[#f5f5f3] font-serif text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h4 className="font-mono font-bold text-black mb-2">
                  {item.title}
                </h4>
                <p className="font-mono text-xs text-black/70">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom border */}
        <div className="mt-16 border-t-4 border-black pt-8">
          <div className="flex items-center justify-between font-mono text-xs text-black/60">
            <span>WALRUS PROTOCOL v2.1</span>
            <span>POWERED BY BLOCKCHAIN TECHNOLOGY</span>
            <span>BUILT FOR PERMANENCE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
