"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Html } from "@react-three/drei";
import * as THREE from "three";

interface NodeData {
  position: [number, number, number];
  title: string;
  subtitle: string;
  color: string;
  connections: number[];
}

interface NetworkNodeProps {
  data: NodeData;
  index: number;
  onClick: () => void;
  isActive: boolean;
}

function NetworkNode({ data, index, onClick, isActive }: NetworkNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = data.position[1] + Math.sin(time + index) * 0.15;
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <group position={data.position}>
      <Sphere
        ref={meshRef}
        args={[0.5, 32, 32]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={data.color}
          speed={2}
          distort={0.3}
          radius={1}
          emissive={data.color}
          emissiveIntensity={isActive || hovered ? 1 : 0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>

      {/* Glow ring */}
      <Sphere args={[0.65, 32, 32]}>
        <meshBasicMaterial
          color={data.color}
          transparent
          opacity={isActive || hovered ? 0.3 : 0.15}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Always visible label */}
      <Html
        center
        distanceFactor={6}
        style={{
          transition: 'all 0.3s',
          opacity: 1,
          pointerEvents: 'none',
        }}
      >
        <div className="text-center" style={{ width: '200px' }}>
          <div
            className="px-4 py-2 rounded-xl backdrop-blur-md border transition-all"
            style={{
              backgroundColor: isActive || hovered ? `${data.color}30` : 'rgba(15, 23, 42, 0.8)',
              borderColor: isActive || hovered ? data.color : 'rgba(255, 255, 255, 0.2)',
              transform: isActive || hovered ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <div className="text-white font-bold text-sm mb-1">{data.title}</div>
            <div className="text-white/60 text-xs">{data.subtitle}</div>
          </div>
        </div>
      </Html>

      {/* Particle orbit when active */}
      {isActive && <ParticleRing color={data.color} radius={1.2} />}
    </group>
  );
}

function ParticleRing({ color, radius }: { color: string; radius: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 30;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ConnectionLines({ nodes, activeNodeIndex }: { nodes: NodeData[]; activeNodeIndex: number | null }) {
  return (
    <>
      {nodes.map((node, i) =>
        node.connections.map((targetIndex) => {
          const target = nodes[targetIndex];
          if (!target) return null;

          const isActive = activeNodeIndex === i || activeNodeIndex === targetIndex;

          const points = [
            new THREE.Vector3(...node.position),
            new THREE.Vector3(...target.position),
          ];

          const geometry = new THREE.BufferGeometry().setFromPoints(points);

          return (
            <line key={`${i}-${targetIndex}`} geometry={geometry}>
              <lineBasicMaterial
                color={isActive ? node.color : "#64748b"}
                linewidth={2}
                opacity={isActive ? 0.8 : 0.4}
                transparent
              />
            </line>
          );
        })
      )}
    </>
  );
}

function BackgroundParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 500;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

interface NetworkSceneProps {
  activeNode: number | null;
  onNodeClick: (index: number) => void;
}

export default function NetworkScene({ activeNode, onNodeClick }: NetworkSceneProps) {
  const nodes: NodeData[] = [
    {
      position: [0, 2, 0],
      title: "Search Intelligence",
      subtitle: "98.7% Precision • 0.34s Response",
      color: "#3b82f6",
      connections: [1, 2, 5],
    },
    {
      position: [-2.5, 0, 1],
      title: "AI Analysis",
      subtitle: "128 Layers • 94.3% Accuracy",
      color: "#8b5cf6",
      connections: [0, 2, 3],
    },
    {
      position: [2.5, 0, 1],
      title: "Neural Network",
      subtitle: "500TB Training • Multi-Format",
      color: "#ec4899",
      connections: [0, 1, 4],
    },
    {
      position: [-2.5, -1.5, -1],
      title: "Data Vault",
      subtitle: "AES-256 • 99.999% Uptime",
      color: "#10b981",
      connections: [1, 4],
    },
    {
      position: [2.5, -1.5, -1],
      title: "Walrus Blockchain",
      subtitle: "10,247 Nodes • Permanent",
      color: "#06b6d4",
      connections: [2, 3, 5],
    },
    {
      position: [0, 0.5, -2.5],
      title: "Research Tools",
      subtitle: "12.5K Users • 847K Citations",
      color: "#f59e0b",
      connections: [0, 4],
    },
  ];

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-indigo-950">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <color attach="background" args={["#0f172a"]} />
        <fog attach="fog" args={["#0f172a", 5, 20]} />

        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#8b5cf6" />
        <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxDistance={15}
          minDistance={6}
        />

        <BackgroundParticles />
        <ConnectionLines nodes={nodes} activeNodeIndex={activeNode} />

        {nodes.map((node, i) => (
          <NetworkNode
            key={i}
            data={node}
            index={i}
            onClick={() => onNodeClick(i)}
            isActive={activeNode === i}
          />
        ))}
      </Canvas>
    </div>
  );
}
