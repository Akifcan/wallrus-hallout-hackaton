"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Text } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

interface BookProps {
  position: [number, number, number];
  title: string;
  color: string;
  index: number;
  onClick: () => void;
  isSelected: boolean;
}

function Book({ position, title, color, index, onClick, isSelected }: BookProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current && !isSelected) {
      if (hovered) {
        meshRef.current.position.z = THREE.MathUtils.lerp(
          meshRef.current.position.z,
          position[2] + 0.3,
          0.1
        );
      } else {
        meshRef.current.position.z = THREE.MathUtils.lerp(
          meshRef.current.position.z,
          position[2],
          0.1
        );
      }
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Book spine */}
      <mesh castShadow>
        <boxGeometry args={[0.15, 1.5, 1]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Book cover (front) */}
      <mesh position={[0.075, 0, 0]} castShadow>
        <boxGeometry args={[0.01, 1.5, 1]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>

      {/* Book title on spine */}
      <Text
        position={[0, 0, 0.51]}
        rotation={[0, 0, Math.PI / 2]}
        fontSize={0.08}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={0.8}
      >
        {title}
      </Text>

      {/* Gold accent line */}
      <mesh position={[0, 0.65, 0.51]}>
        <boxGeometry args={[0.12, 0.02, 0.001]} />
        <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, -0.65, 0.51]}>
        <boxGeometry args={[0.12, 0.02, 0.001]} />
        <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={0.5} />
      </mesh>

      {/* Glow when selected */}
      {isSelected && (
        <pointLight position={[0.3, 0, 0]} intensity={2} distance={2} color={color} />
      )}
    </group>
  );
}

function Bookshelf() {
  return (
    <>
      {/* Shelf surface */}
      <mesh position={[0, -0.9, -0.5]} receiveShadow>
        <boxGeometry args={[6, 0.1, 1.5]} />
        <meshStandardMaterial color="#8b4513" roughness={0.8} />
      </mesh>

      {/* Shelf back */}
      <mesh position={[0, 0, -1]} receiveShadow>
        <boxGeometry args={[6, 2, 0.1]} />
        <meshStandardMaterial color="#5d3a1a" roughness={0.9} />
      </mesh>

      {/* Side supports */}
      <mesh position={[-3, 0, -0.5]} castShadow>
        <boxGeometry args={[0.1, 2, 1.5]} />
        <meshStandardMaterial color="#6b3410" />
      </mesh>
      <mesh position={[3, 0, -0.5]} castShadow>
        <boxGeometry args={[0.1, 2, 1.5]} />
        <meshStandardMaterial color="#6b3410" />
      </mesh>
    </>
  );
}

interface LibraryShelfProps {
  selectedBook: number;
  onBookSelect: (index: number) => void;
}

export default function LibraryShelf({ selectedBook, onBookSelect }: LibraryShelfProps) {
  const books = [
    { title: "SEARCH INTELLIGENCE", color: "#1e40af" },
    { title: "AI ANALYSIS", color: "#7c3aed" },
    { title: "NEURAL NETWORKS", color: "#db2777" },
    { title: "DATA STORAGE", color: "#059669" },
    { title: "WALRUS BLOCKCHAIN", color: "#0891b2" },
    { title: "RESEARCH TOOLS", color: "#ea580c" },
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={["#fef3c7"]} />
        <fog attach="fog" args={["#fef3c7", 8, 15]} />

        <PerspectiveCamera makeDefault position={[0, 0.5, 4]} />

        {/* Lighting - warm library atmosphere */}
        <ambientLight intensity={0.4} color="#fff5e6" />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          color="#ffe4b5"
        />
        <pointLight position={[-3, 2, 3]} intensity={0.5} color="#ffd700" />
        <pointLight position={[3, 2, 3]} intensity={0.5} color="#ffa500" />

        {/* Bookshelf */}
        <Bookshelf />

        {/* Books */}
        {books.map((book, i) => (
          <Book
            key={i}
            position={[-2.5 + i * 0.9, 0, -0.4]}
            title={book.title}
            color={book.color}
            index={i}
            onClick={() => onBookSelect(i)}
            isSelected={selectedBook === i}
          />
        ))}

        {/* Desk lamp */}
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
          <group position={[3.5, -0.5, 0]}>
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
              <meshStandardMaterial color="#2c1810" />
            </mesh>
            <mesh position={[0, 1, 0]}>
              <coneGeometry args={[0.3, 0.4, 8]} />
              <meshStandardMaterial
                color="#f4d03f"
                emissive="#f4d03f"
                emissiveIntensity={0.3}
              />
            </mesh>
            <pointLight position={[0, 0.8, 0]} intensity={1.5} distance={3} color="#fff8dc" />
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
