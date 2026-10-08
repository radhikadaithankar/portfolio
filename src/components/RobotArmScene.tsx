"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei/core/ContactShadows";
import { useEffect, useRef, type ReactNode } from "react";
import { Group, MathUtils } from "three";
import { motion } from "@/lib/motion";

const enamel = "#f7f4ed";
const beige = "#d8cbbb";
const accent = "#4e2639";
const lengths = [0.32, 1, 0.18, 1.03, 0.18, 0.35, 0.18];
const pose = [0, 0.48, 0, -1.75, 0.25, -1, 0];

function LinkBody({
  length,
  slim = false,
}: {
  length: number;
  slim?: boolean;
}) {
  return (
    <mesh position={[0, length / 2, 0]} castShadow>
      <cylinderGeometry
        args={[slim ? 0.115 : 0.16, slim ? 0.13 : 0.19, length, 10]}
      />
      <meshStandardMaterial
        color={enamel}
        roughness={0.68}
        metalness={0.08}
        flatShading
      />
    </mesh>
  );
}

function Joint({ index, children }: { index: number; children: ReactNode }) {
  return (
    <>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry
          args={[index > 4 ? 0.145 : 0.21, index > 4 ? 0.145 : 0.21, 0.22, 12]}
        />
        <meshStandardMaterial color={accent} roughness={0.7} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[0, 0, side * 0.122]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry
            args={[
              index > 4 ? 0.095 : 0.145,
              index > 4 ? 0.095 : 0.145,
              0.04,
              12,
            ]}
          />
          <meshStandardMaterial color={beige} roughness={0.8} />
        </mesh>
      ))}
      {children}
    </>
  );
}

function Arm() {
  const joints = useRef<(Group | null)[]>([]);
  const pointer = useRef({ x: 0, y: 0 });
  const time = useRef(0);
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    function reset() {
      pointer.current = { x: 0, y: 0 };
    }
    function move(event: PointerEvent) {
      if (!fine.matches || event.pointerType !== "mouse") return;
      pointer.current.x = MathUtils.clamp(
        (event.clientX / innerWidth) * 2 - 1,
        -1,
        1,
      );
      pointer.current.y = MathUtils.clamp(
        (event.clientY / innerHeight) * 2 - 1,
        -1,
        1,
      );
    }
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    fine.addEventListener("change", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", reset);
      fine.removeEventListener("change", reset);
    };
  }, []);
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    time.current += dt * motion.idleSpeed;
    joints.current.forEach((joint, index) => {
      if (!joint) return;
      const axis = index % 2 === 0 ? "y" : "z";
      const follow =
        index === 0
          ? pointer.current.x * 0.22
          : index === 1
            ? pointer.current.y * 0.08
            : 0;
      const idle =
        Math.sin(time.current + index * 0.6) * (index === 0 ? 0.07 : 0.025);
      joint.rotation[axis] = MathUtils.damp(
        joint.rotation[axis],
        pose[index] + follow + idle,
        motion.damping,
        dt,
      );
    });
  });

  function segment(index: number): ReactNode {
    if (index === lengths.length)
      return (
        <group>
          <mesh position={[0, 0.04, 0]}>
            <boxGeometry args={[0.3, 0.14, 0.19]} />
            <meshStandardMaterial color={beige} roughness={0.7} />
          </mesh>
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 0.135, 0.16, 0]}>
              <mesh>
                <boxGeometry args={[0.055, 0.24, 0.085]} />
                <meshStandardMaterial color={accent} roughness={0.7} />
              </mesh>
              <mesh position={[-side * 0.025, 0.12, 0]}>
                <boxGeometry args={[0.1, 0.05, 0.085]} />
                <meshStandardMaterial color={accent} roughness={0.7} />
              </mesh>
            </group>
          ))}
        </group>
      );
    return (
      <group
        ref={(value) => {
          joints.current[index] = value;
        }}
        rotation={index % 2 === 0 ? [0, pose[index], 0] : [0, 0, pose[index]]}
      >
        <Joint index={index}>
          <LinkBody length={lengths[index]} slim={index > 4} />
        </Joint>
        <group position={[0, lengths[index], 0]}>{segment(index + 1)}</group>
      </group>
    );
  }
  return (
    <group position={[-0.45, -1.15, 0]} rotation={[0, -0.2, 0]}>
      <mesh position={[0, -0.07, 0]} receiveShadow>
        <cylinderGeometry args={[0.48, 0.54, 0.15, 12]} />
        <meshStandardMaterial color={beige} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.29, 0.38, 0.13, 12]} />
        <meshStandardMaterial color={enamel} roughness={0.7} />
      </mesh>
      <group position={[0, 0.15, 0]}>{segment(0)}</group>
    </group>
  );
}

export default function RobotArmScene({
  active,
  onReady,
}: {
  active: boolean;
  onReady: () => void;
}) {
  return (
    <div className="robot-canvas">
      <Canvas
        aria-hidden="true"
        dpr={[1, 2]}
        frameloop={active ? "always" : "never"}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        camera={{ position: [3.2, 1.8, 6], fov: 32 }}
        onCreated={({ camera }) => {
          camera.lookAt(0, -0.1, 0);
          onReady();
        }}
      >
        <ambientLight intensity={0.8} />
        <hemisphereLight args={["#fffaf0", "#d8cbbb", 1.6]} />
        <directionalLight
          position={[-3, 5, 4]}
          intensity={2.4}
          color="#fff8eb"
        />
        <directionalLight
          position={[4, 1, -2]}
          intensity={1.1}
          color="#f7f4ed"
        />
        <Arm />
        <ContactShadows
          position={[0, -1.3, 0]}
          opacity={0.3}
          scale={6}
          blur={2.5}
          far={4}
          resolution={256}
          frames={1}
          color="#33262c"
        />
      </Canvas>
    </div>
  );
}
