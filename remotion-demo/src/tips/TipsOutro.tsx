import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../font";
import { Highlight } from "./Highlight";
import { theme } from "./theme";

export const TipsOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.accent,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 90,
        fontFamily,
        color: "white",
      }}
    >
      <div
        style={{
          fontSize: 220,
          rotate: interpolate(frame, [0, 0.5 * fps, 0.8 * fps], ["-30deg", "12deg", "0deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [0, 0.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 10 }),
            output: "perceptual-scale",
          }),
        }}
      >
        📌
      </div>
      <div style={{ marginTop: 40, fontSize: 120, fontWeight: 900, lineHeight: 1.1, color: theme.ink }}>
        <Highlight from={0.6 * fps} color="white">
          Salvalo
        </Highlight>{" "}
        per dopo
      </div>
      <div
        style={{
          marginTop: 60,
          fontSize: 58,
          fontWeight: 700,
          opacity: interpolate(frame, [1.1 * fps, 1.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Segui per altri consigli ogni giorno
      </div>
    </AbsoluteFill>
  );
};
