import { Easing, interpolate, useCurrentFrame } from "remotion";
import { useTheme } from "./theme";

// Marker-style highlight that sweeps from left to right starting at `from`.
export const Highlight: React.FC<{
  readonly children: React.ReactNode;
  readonly from: number;
  readonly color?: string;
  readonly textColor?: string;
}> = ({ children, from, color, textColor }) => {
  const theme = useTheme();
  const frame = useCurrentFrame();

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        style={{
          position: "absolute",
          left: -12,
          right: -12,
          top: "18%",
          bottom: "8%",
          backgroundColor: color ?? theme.marker,
          borderRadius: 10,
          rotate: "-1.5deg",
          transformOrigin: "left center",
          scale: interpolate(frame, [from, from + 12], ["0 1", "1 1"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.65, 0, 0.35, 1),
          }),
        }}
      />
      <span style={{ position: "relative", color: textColor }}>{children}</span>
    </span>
  );
};
