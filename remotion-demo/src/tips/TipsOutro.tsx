import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../font";
import { Highlight } from "./Highlight";
import { useTheme } from "./theme";

export type TipsOutroProps = {
  readonly emoji: string;
  readonly highlighted: string;
  readonly title: string;
  readonly subtitle: string;
};

export const TipsOutro: React.FC<TipsOutroProps> = ({ emoji, highlighted, title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.outroBackground,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 90,
        fontFamily,
        color: theme.outroInk,
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
        {emoji}
      </div>
      <div style={{ marginTop: 40, fontSize: 120, fontWeight: 900, lineHeight: 1.1 }}>
        <Highlight from={0.6 * fps} color={theme.outroMarker} textColor={theme.outroMarkerInk}>
          {highlighted}
        </Highlight>{" "}
        {title}
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
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};
