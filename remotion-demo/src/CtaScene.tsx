import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "./font";

export const CtaScene: React.FC = () => {
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
        gap: 70,
      }}
    >
      <div
        style={{
          fontSize: 120,
          fontWeight: 900,
          lineHeight: 1.1,
          translate: interpolate(frame, [0, 0.8 * fps], ["0px 80px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Provalo gratis oggi
      </div>
      <div
        style={{
          padding: "44px 90px",
          borderRadius: 999,
          background: "linear-gradient(90deg, #7c3aed, #ec4899)",
          fontSize: 64,
          fontWeight: 800,
          boxShadow: "0 20px 80px rgba(236,72,153,0.5)",
          scale: interpolate(
            frame,
            [0.6 * fps, 1.2 * fps, 2 * fps, 2.4 * fps, 2.8 * fps],
            [0, 1, 1, 1.08, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.34, 1.56, 0.64, 1),
              output: "perceptual-scale",
            },
          ),
        }}
      >
        👉 Link in bio
      </div>
    </AbsoluteFill>
  );
};
