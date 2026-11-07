/**
 * A still render of the 3D arm in its starting pose, present in the server
 * HTML. It is shown at the canvas height and centred, which is how the 3D
 * camera frames the arm, so the live scene replaces it without a jump.
 */
export function RobotArmFallback() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="robot-fallback"
      src="/robot-arm.webp"
      alt=""
      width={520}
      height={886}
      decoding="async"
      fetchPriority="high"
    />
  );
}
