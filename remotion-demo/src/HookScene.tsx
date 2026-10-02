import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "./font";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 90,
        fontFamily,
        color: "white",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 54,
          fontWeight: 500,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#f9a8d4",
          opacity: interpolate(frame, [0, 0.6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Tiziano Social AI
      </div>
      <div
        style={{
          marginTop: 40,
          fontSize: 140,
          fontWeight: 900,
          lineHeight: 1.05,
          scale: interpolate(frame, [0.3 * fps, 1.3 * fps], [0.6, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 12 }),
            output: "perceptual-scale",
          }),
          opacity: interpolate(frame, [0.3 * fps, 0.8 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Contenuti social in{" "}
        <span
          style={{
            background: "linear-gradient(90deg, #a78bfa, #f472b6)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          30 secondi
        </span>
      </div>
    </AbsoluteFill>
  );
};
