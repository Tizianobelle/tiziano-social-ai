import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "./font";

const Feature: React.FC<{
  readonly emoji: string;
  readonly label: string;
  readonly delay: number;
}> = ({ emoji, label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 36,
        padding: "40px 48px",
        borderRadius: 36,
        backgroundColor: "rgba(255,255,255,0.08)",
        border: "2px solid rgba(255,255,255,0.15)",
        fontSize: 64,
        fontWeight: 800,
        opacity: interpolate(frame, [delay, delay + 0.4 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(frame, [delay, delay + 0.8 * fps], ["-300px 0px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      <span style={{ fontSize: 96 }}>{emoji}</span>
      {label}
    </div>
  );
};

export const FeaturesScene: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        padding: 90,
        gap: 48,
        fontFamily,
        color: "white",
      }}
    >
      <div style={{ fontSize: 88, fontWeight: 900, marginBottom: 30 }}>
        Con un solo prompt:
      </div>
      <Feature emoji="🎨" label="Immagini AI" delay={0.3 * fps} />
      <Feature emoji="🎬" label="Video e Reel" delay={0.7 * fps} />
      <Feature emoji="✍️" label="Caption e hashtag" delay={1.1 * fps} />
      <Feature emoji="📅" label="Pubblicazione" delay={1.5 * fps} />
    </AbsoluteFill>
  );
};
