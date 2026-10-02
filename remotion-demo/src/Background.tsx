import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0614", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 1400,
          height: 1400,
          borderRadius: "50%",
          background: "radial-gradient(circle, #7c3aed 0%, transparent 65%)",
          opacity: 0.55,
          translate: interpolate(frame, [0, 360], ["-500px -400px", "100px 200px"]),
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1200,
          height: 1200,
          borderRadius: "50%",
          background: "radial-gradient(circle, #ec4899 0%, transparent 65%)",
          opacity: 0.45,
          translate: interpolate(frame, [0, 360], ["300px 1100px", "-200px 700px"]),
        }}
      />
    </AbsoluteFill>
  );
};
