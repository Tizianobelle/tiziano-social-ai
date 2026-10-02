import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../font";
import { Highlight } from "./Highlight";
import { useTheme } from "./theme";

export type TipsHookProps = {
  readonly count: number;
  /** Headline after the big number, split into words that pop in one by one. */
  readonly words: readonly string[];
  /** Index in `words` of the word that gets the marker highlight. */
  readonly highlightIndex: number;
  readonly subtitle: string;
};

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

export const TipsHook: React.FC<TipsHookProps> = ({ count, words, highlightIndex, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();
  const lastWordAt = 8 + (words.length - 1) * 4;

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
        {count}
      </div>
      <div style={{ fontSize: 120, fontWeight: 900, lineHeight: 1.1, marginTop: 20 }}>
        {words.map((word, i) => (
          <Word key={i} at={8 + i * 4}>
            {i === highlightIndex ? <Highlight from={lastWordAt + 4}>{word}</Highlight> : word}
          </Word>
        ))}
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
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};
