import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../font";
import { useTheme } from "./theme";

export type MistakeSceneProps = {
  readonly number: number;
  readonly mistake: string;
  readonly fix: string;
};

export const MistakeScene: React.FC<MistakeSceneProps> = ({ number, mistake, fix }) => {
  const theme = useTheme();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const strikeAt = 1.1 * fps;
  const fixAt = 1.6 * fps;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.background,
        padding: 90,
        justifyContent: "center",
        fontFamily,
        color: theme.ink,
      }}
    >
      <div
        style={{
          position: "absolute",
          right: 60,
          bottom: 40,
          fontSize: 560,
          fontWeight: 900,
          lineHeight: 1,
          color: theme.ink,
          opacity: 0.06,
          translate: interpolate(frame, [0, 4 * fps], ["0px 60px", "0px -60px"]),
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontSize: 44,
          fontWeight: 800,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: theme.accent,
          opacity: interpolate(frame, [0, 6], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Errore #{number}
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 104,
          fontWeight: 900,
          lineHeight: 1.15,
          translate: interpolate(frame, [0, 0.6 * fps], ["-80px 0px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          opacity: interpolate(frame, [0, 0.3 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        ❌{" "}
        {/* Strike-through drawn as a background so it follows every wrapped line. */}
        <span
          style={{
            WebkitBoxDecorationBreak: "clone",
            boxDecorationBreak: "clone",
            backgroundImage: `linear-gradient(${theme.strike}, ${theme.strike})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 58%",
            backgroundSize: `${interpolate(frame, [strikeAt, strikeAt + 10], [0, 100], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.65, 0, 0.35, 1),
            })}% 12px`,
            color: `rgba(${theme.inkRgb},${interpolate(frame, [strikeAt, strikeAt + 10], [1, 0.45], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })})`,
          }}
        >
          {mistake}
        </span>
      </div>
      <div
        style={{
          marginTop: 80,
          padding: "48px 56px",
          borderRadius: 40,
          backgroundColor: theme.card,
          color: theme.cardInk,
          fontSize: 66,
          fontWeight: 700,
          lineHeight: 1.25,
          opacity: interpolate(frame, [fixAt, fixAt + 6], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [fixAt, fixAt + 0.6 * fps], ["0px 100px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 15 }),
          }),
        }}
      >
        <span style={{ color: theme.good }}>✓ Fai così:</span> {fix}
      </div>
    </AbsoluteFill>
  );
};
