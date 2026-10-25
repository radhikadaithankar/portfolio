"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei/core/ContactShadows";
import {
  useEffect,
  useMemo,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import {
  Group,
  MathUtils,
  Vector3,
  type InterleavedBufferAttribute,
} from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { motion } from "@/lib/motion";

const enamel = "#f6e7d3";
const beige = "#c9a98f";
const accent = "#5a1226";
const lengths = [0.32, 1, 0.18, 1.03, 0.18, 0.35, 0.18];
const pose = [0, 0.48, 0, -1.75, 0.25, -1, 0];
const ink = "#7b1c34";
const trailPoints = 720;
const scratch = new Vector3();
const drawSeconds = 7;
const fadeSeconds = 2.4;

/** Shared between DOM pointer handlers and the render loop. */
type Controls = {
  spin: number;
  velocity: number;
  dragging: boolean;
  lastX: number;
  downX: number;
  downY: number;
  drawRequested: boolean;
};

/**
 * A five-petal rose traced by the shoulder and elbow, so it lies in the plane
 * facing the camera. This echoes the Panda drawing routine. The trail records
 * the gripper's real position, so it shows whatever the joints actually trace.
 */
function drawingOffsets(progress: number) {
  const s = progress * Math.PI * 2;
  const r = 0.55 + 0.45 * Math.cos(5 * s);
  const ease = Math.min(progress * 12, 1, (1 - progress) * 12);
  return {
    // The arm is turned three-quarters, so base yaw adds the sideways width.
    yaw: 0.45 * r * Math.sin(s) * ease,
    shoulder: 0.12 * r * Math.sin(s) * ease,
    elbow: 0.34 * r * Math.cos(s) * ease,
  };
}

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

function Arm({ controlsRef }: { controlsRef: RefObject<Controls> }) {
  const joints = useRef<(Group | null)[]>([]);
  const turntable = useRef<Group>(null);
  const tip = useRef<Group>(null);
  const pen = useRef<Group>(null);
  const draw = useRef({ elapsed: -1, count: 0, fade: 0 });
  const trailRef = useRef<Line2>(null);
  const last = useRef(new Vector3());
  const trailObject = useMemo(() => {
    // Allocate every segment once; frames write into the buffer in place.
    const geometry = new LineGeometry();
    geometry.setPositions(new Float32Array(trailPoints * 3));
    geometry.instanceCount = 0;
    const line = new Line2(
      geometry,
      new LineMaterial({
        color: ink,
        linewidth: 3,
        transparent: true,
        opacity: 0.9,
      }),
    );
    line.frustumCulled = false;
    return line;
  }, []);
  useEffect(
    () => () => {
      trailObject.geometry.dispose();
      trailObject.material.dispose();
    },
    [trailObject],
  );
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
    const control = controlsRef.current;
    time.current += dt * motion.idleSpeed;

    // Turntable: drag sets velocity directly, release coasts to a stop.
    if (!control.dragging) {
      control.spin += control.velocity * dt;
      control.velocity = MathUtils.damp(control.velocity, 0, 2.2, dt);
      // Once the fling slows, ease back to the home pose (nearest full turn)
      // so the arm never stays facing away.
      if (Math.abs(control.velocity) < 0.6) {
        const home = Math.round(control.spin / (Math.PI * 2)) * Math.PI * 2;
        control.spin = MathUtils.damp(control.spin, home, 2.4, dt);
      }
    }
    if (turntable.current) turntable.current.rotation.y = control.spin;

    // Drawing routine: start on click, trace, then let the ink fade.
    const state = draw.current;
    const trail = trailRef.current;
    if (!trail) return;
    if (control.drawRequested) {
      control.drawRequested = false;
      if (state.elapsed < 0) {
        state.elapsed = 0;
        state.count = 0;
        state.fade = 0;
        trail.visible = false;
        trail.geometry.instanceCount = 0;
        trail.material.opacity = 0.9;
      }
    }
    const drawing = state.elapsed >= 0 && state.elapsed < drawSeconds;
    const offsets = drawing
      ? drawingOffsets(state.elapsed / drawSeconds)
      : { yaw: 0, shoulder: 0, elbow: 0 };
    if (state.elapsed >= 0) {
      state.elapsed += dt;
      if (state.elapsed >= drawSeconds) {
        state.fade += dt;
        const opacity = 0.9 * (1 - state.fade / fadeSeconds);
        trail.material.opacity = Math.max(opacity, 0);
        if (state.fade >= fadeSeconds) {
          state.elapsed = -1;
          trail.visible = false;
        }
      }
    }
    const penDown = drawing && state.elapsed > 0.6;
    if (pen.current)
      pen.current.scale.setScalar(
        MathUtils.damp(pen.current.scale.x, penDown ? 1 : 0, 10, dt),
      );

    const following = drawing ? 0 : 1;
    joints.current.forEach((joint, index) => {
      if (!joint) return;
      const axis = index % 2 === 0 ? "y" : "z";
      const follow =
        following *
        (index === 0
          ? pointer.current.x * 0.14
          : index === 1
            ? pointer.current.y * 0.04
            : index === 3
              ? -pointer.current.y * 0.05
              : 0);
      const routine =
        index === 0
          ? offsets.yaw
          : index === 1
            ? offsets.shoulder
            : index === 3
              ? offsets.elbow
              : 0;
      const idle =
        Math.sin(time.current + index * 0.6) *
        (index === 0 ? 0.012 : 0.02) *
        (drawing ? 0.2 : 1);
      joint.rotation[axis] = MathUtils.damp(
        joint.rotation[axis],
        pose[index] + follow + routine + idle,
        drawing ? 9 : motion.damping,
        dt,
      );
    });

    // Record the gripper's real position in turntable space, so the drawing
    // turns with the robot like paper on a lazy Susan.
    if (
      penDown &&
      tip.current &&
      turntable.current &&
      state.count < trailPoints
    ) {
      tip.current.getWorldPosition(scratch);
      turntable.current.worldToLocal(scratch);
      if (state.count > 0) {
        const segments = (
          trail.geometry.getAttribute(
            "instanceStart",
          ) as InterleavedBufferAttribute
        ).data;
        const previous = last.current;
        segments.array.set(
          [previous.x, previous.y, previous.z, scratch.x, scratch.y, scratch.z],
          (state.count - 1) * 6,
        );
        segments.needsUpdate = true;
        trail.geometry.instanceCount = state.count;
        trail.visible = true;
      }
      last.current.copy(scratch);
      state.count += 1;
    }
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
          <group ref={tip} position={[0, 0.34, 0]}>
            <group ref={pen} scale={0}>
              <mesh>
                <sphereGeometry args={[0.045, 12, 12]} />
                <meshStandardMaterial
                  color={ink}
                  emissive={ink}
                  emissiveIntensity={0.4}
                />
              </mesh>
            </group>
          </group>
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
    <group position={[-0.112, -1.15, 0.06]} rotation={[0, -0.6, 0]}>
      <group ref={turntable}>
        <primitive ref={trailRef} object={trailObject} visible={false} />
        <ArmBody>{segment(0)}</ArmBody>
      </group>
    </group>
  );
}

function ArmBody({ children }: { children: ReactNode }) {
  return (
    <>
      <mesh position={[0, -0.07, 0]} receiveShadow>
        <cylinderGeometry args={[0.48, 0.54, 0.15, 12]} />
        <meshStandardMaterial color={beige} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.29, 0.38, 0.13, 12]} />
        <meshStandardMaterial color={enamel} roughness={0.7} />
      </mesh>
      <group position={[0, 0.15, 0]}>{children}</group>
    </>
  );
}

export default function RobotArmScene({
  active,
  onReady,
  onFailure,
}: {
  active: boolean;
  onReady: () => void;
  onFailure: () => void;
}) {
  const controls = useRef<Controls>({
    spin: 0,
    velocity: 0,
    dragging: false,
    lastX: 0,
    downX: 0,
    downY: 0,
    drawRequested: false,
  });
  const lastMove = useRef(0);

  // A resize returns the arm to its home pose immediately.
  useEffect(() => {
    function reset() {
      const control = controls.current;
      control.dragging = false;
      control.velocity = 0;
      control.spin = 0;
    }
    window.addEventListener("resize", reset);
    return () => window.removeEventListener("resize", reset);
  }, []);

  function down(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    const control = controls.current;
    control.dragging = true;
    control.velocity = 0;
    control.lastX = control.downX = event.clientX;
    control.downY = event.clientY;
    lastMove.current = event.timeStamp;
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function move(event: ReactPointerEvent<HTMLDivElement>) {
    const control = controls.current;
    if (!control.dragging) return;
    const dx = event.clientX - control.lastX;
    const elapsed = Math.max(event.timeStamp - lastMove.current, 1) / 1000;
    control.spin += dx * 0.012;
    control.velocity = MathUtils.clamp((dx * 0.012) / elapsed, -9, 9);
    control.lastX = event.clientX;
    lastMove.current = event.timeStamp;
  }
  function up(event: ReactPointerEvent<HTMLDivElement>) {
    const control = controls.current;
    if (!control.dragging) return;
    control.dragging = false;
    // A drag that stalls before release should not fling the arm.
    if (event.timeStamp - lastMove.current > 90) control.velocity = 0;
    const distance = Math.hypot(
      event.clientX - control.downX,
      event.clientY - control.downY,
    );
    if (distance < 6) control.drawRequested = true;
  }

  return (
    <div
      className="robot-canvas"
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={() => {
        controls.current.dragging = false;
      }}
    >
      <Canvas
        aria-hidden="true"
        dpr={[1, window.matchMedia("(pointer: coarse)").matches ? 1.5 : 2]}
        frameloop={active ? "always" : "never"}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        camera={{ position: [3.2, 1.8, 6], fov: 24 }}
        onCreated={({ camera }) => {
          camera.lookAt(0, -0.1, 0);
        }}
      >
        <ambientLight intensity={0.8} />
        <hemisphereLight args={["#fff4df", "#c9a98f", 1.6]} />
        <directionalLight
          position={[-3, 5, 4]}
          intensity={2.4}
          color="#fff3dc"
        />
        <directionalLight
          position={[4, 1, -2]}
          intensity={1.1}
          color="#fff3dc"
        />
        <Lifecycle onReady={onReady} onFailure={onFailure} />
        <Arm controlsRef={controls} />
        <ContactShadows
          position={[0, -1.3, 0]}
          opacity={0.3}
          scale={6}
          blur={2.5}
          far={4}
          resolution={256}
          frames={1}
          color="#3a1420"
        />
      </Canvas>
    </div>
  );
}

function Lifecycle({
  onReady,
  onFailure,
}: {
  onReady: () => void;
  onFailure: () => void;
}) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", onFailure);
    onReady();
    return () => canvas.removeEventListener("webglcontextlost", onFailure);
  }, [gl, onReady, onFailure]);
  return null;
}
