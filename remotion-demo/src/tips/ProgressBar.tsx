import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { useTheme } from "./theme";

// Story-style progress bar so viewers know how much is left.
export const ProgressBar: React.FC = () => {
  const theme = useTheme();
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 60,
        right: 60,
        height: 10,
        borderRadius: 5,
        backgroundColor: `rgba(${theme.inkRgb},0.15)`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          backgroundColor: theme.ink,
          width: `${interpolate(frame, [0, durationInFrames - 1], [0, 100])}%`,
        }}
      />
    </div>
  );
};
