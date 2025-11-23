"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface FloatingPaperProps {
  position: [number, number, number];
  rotation: [number, number, number];
  index: number;
  onClick: () => void;
  isActive: boolean;
}

function FloatingPaper({ position, rotation, index, onClick, isActive }: FloatingPaperProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && !isActive) {
      meshRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime + index) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        onClick={onClick}
        scale={isActive ? 1.2 : 1}
      >
        <boxGeometry args={[1.5, 2, 0.02]} />
        <meshStandardMaterial
          color={isActive ? "#3b82f6" : "#ffffff"}
          roughness={0.3}
          metalness={0.1}
          emissive={isActive ? "#3b82f6" : "#000000"}
          emissiveIntensity={isActive ? 0.2 : 0}
        />

        {/* Paper lines decoration */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[0, 0.6 - i * 0.15, 0.011]}>
            <boxGeometry args={[1.2, 0.02, 0.001]} />
            <meshBasicMaterial color="#e5e7eb" />
          </mesh>
        ))}
      </mesh>
    </Float>
  );
}

function DeskScene({ activeSection, onSectionChange }: { activeSection: number; onSectionChange: (n: number) => void }) {
  const papers = [
    { position: [-2, 0, 0], rotation: [0, 0.3, 0] },
    { position: [0, 0, 0], rotation: [0, 0, 0] },
    { position: [2, 0, 0], rotation: [0, -0.3, 0] },
    { position: [0, 0.5, -1.5], rotation: [0, 0, 0] },
  ] as const;

  const particlesArray = useMemo(() => new Float32Array(
    Array.from({ length: 300 }, () => (Math.random() - 0.5) * 10)
  ), []);

  return (
    <>
      <color attach="background" args={["#f8fafc"]} />
      <fog attach="fog" args={["#f8fafc", 5, 15]} />

      <PerspectiveCamera makeDefault position={[0, 3, 6]} fov={50} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <directionalLight position={[-3, 3, -3]} intensity={0.3} />

      {/* Desk surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[15, 10]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.8} />
      </mesh>

      {/* Floating papers */}
      {papers.map((paper, i) => (
        <FloatingPaper
          key={i}
          position={paper.position as any}
          rotation={paper.rotation as any}
          index={i}
          onClick={() => onSectionChange(i)}
          isActive={activeSection === i}
        />
      ))}

      {/* Ambient particles (dust in light) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={100}
            array={particlesArray}
            itemSize={3} args={[] as any}          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#cbd5e1" transparent opacity={0.3} />
      </points>
    </>
  );
}

interface ResearchDeskProps {
  activeSection: number;
  onSectionChange: (section: number) => void;
}

export default function ResearchDesk({ activeSection, onSectionChange }: ResearchDeskProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-50 to-blue-50">
      <Canvas shadows>
        <DeskScene activeSection={activeSection} onSectionChange={onSectionChange} />
      </Canvas>
    </div>
  );
}
