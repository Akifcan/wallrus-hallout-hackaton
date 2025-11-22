"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Scanline } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import gsap from "gsap";

interface FloatingDataCubeProps {
  position: [number, number, number];
  index: number;
  onClick: () => void;
  isActive: boolean;
}

function FloatingDataCube({ position, index, onClick, isActive }: FloatingDataCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 + index * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + index * 0.2;

      const hover = hovered ? 0.2 : 0;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.3 + hover;
    }
  });

  useEffect(() => {
    if (meshRef.current && isActive) {
      gsap.to(meshRef.current.scale, {
        x: 1.3,
        y: 1.3,
        z: 1.3,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    } else if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
      });
    }
  }, [isActive]);

  const colors = ["#00ffff", "#ff00ff", "#ffff00", "#00ff00"];

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={colors[index % colors.length]}
        emissive={colors[index % colors.length]}
        emissiveIntensity={isActive ? 1 : 0.3}
        wireframe={!isActive}
        transparent
        opacity={isActive ? 1 : 0.6}
      />
    </mesh>
  );
}

function GridPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshBasicMaterial
        color="#00ffff"
        wireframe
        transparent
        opacity={0.1}
      />
    </mesh>
  );
}

function DataParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2000;

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

    const color = new THREE.Color();
    color.setHSL(0.5 + Math.random() * 0.5, 1, 0.5);
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
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CameraController({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const { camera } = useThree();

  useFrame(() => {
    const targetX = mousePosition.x * 2;
    const targetY = -mousePosition.y * 2;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY + 2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

interface Scene3DProps {
  activeZone: number;
  onZoneChange: (zone: number) => void;
  mousePosition: { x: number; y: number };
}

function Scene3D({ activeZone, onZoneChange, mousePosition }: Scene3DProps) {
  const zones = [
    [-4, 0, -2],
    [0, 0, -2],
    [4, 0, -2],
    [0, 2, -2],
  ] as [number, number, number][];

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 10, 30]} />

      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />

      <CameraController mousePosition={mousePosition} />

      <GridPlane />
      <DataParticles />

      {zones.map((pos, i) => (
        <FloatingDataCube
          key={i}
          position={pos}
          index={i}
          onClick={() => onZoneChange(i)}
          isActive={activeZone === i}
        />
      ))}

      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
        <ChromaticAberration
          offset={new THREE.Vector2(0.001, 0.001)}
          blendFunction={BlendFunction.NORMAL}
        />
        <Scanline density={1.5} opacity={0.05} />
      </EffectComposer>
    </>
  );
}

interface SpatialCanvasProps {
  activeZone: number;
  onZoneChange: (zone: number) => void;
}

export default function SpatialCanvas({ activeZone, onZoneChange }: SpatialCanvasProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0">
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        <Scene3D
          activeZone={activeZone}
          onZoneChange={onZoneChange}
          mousePosition={mousePosition}
        />
      </Canvas>
    </div>
  );
}
