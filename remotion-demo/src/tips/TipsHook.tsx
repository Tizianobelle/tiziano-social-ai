import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../font";
import { Highlight } from "./Highlight";
import { theme } from "./theme";

const Word: React.FC<{ readonly children: React.ReactNode; readonly at: number }> = ({
  children,
  at,
}) => {
  const frame = useCurrentFrame();

  return (
    <span
      style={{
        display: "inline-block",
        marginRight: "0.25em",
        opacity: interpolate(frame, [at, at + 4], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(frame, [at, at + 10], ["0px 60px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      {children}
    </span>
  );
};

export const TipsHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.background,
        justifyContent: "center",
        padding: 90,
        fontFamily,
        color: theme.ink,
      }}
    >
      <div
        style={{
          fontSize: 300,
          fontWeight: 900,
          lineHeight: 1,
          color: theme.accent,
          scale: interpolate(frame, [0, 0.5 * fps], [1.6, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 14 }),
            output: "perceptual-scale",
          }),
          transformOrigin: "left center",
          opacity: interpolate(frame, [0, 4], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        3
      </div>
      <div style={{ fontSize: 124, fontWeight: 900, lineHeight: 1.1, marginTop: 20 }}>
        <Word at={8}>errori</Word>
        <Word at={13}>che</Word>
        <Word at={18}>
          <Highlight from={30}>rovinano</Highlight>
        </Word>
        <Word at={23}>i</Word>
        <Word at={26}>tuoi</Word>
        <Word at={29}>Reel</Word>
      </div>
      <div
        style={{
          marginTop: 60,
          fontSize: 48,
          fontWeight: 600,
          opacity: interpolate(frame, [1.5 * fps, 2 * fps], [0, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        (il numero 2 lo fanno quasi tutti)
      </div>
    </AbsoluteFill>
  );
};
