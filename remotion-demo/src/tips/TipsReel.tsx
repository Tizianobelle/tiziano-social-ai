import { Audio } from "@remotion/media";
import { linearTiming, springTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { AbsoluteFill, interpolate, staticFile, useVideoConfig } from "remotion";
import { MistakeScene, type MistakeSceneProps } from "./MistakeScene";
import { ProgressBar } from "./ProgressBar";
import { type TipsTheme, TipsThemeContext } from "./theme";
import { TipsHook, type TipsHookProps } from "./TipsHook";
import { TipsOutro, type TipsOutroProps } from "./TipsOutro";

export type TipsReelProps = {
  readonly theme: TipsTheme;
  readonly hook: TipsHookProps;
  readonly mistakes: readonly [
    Omit<MistakeSceneProps, "number">,
    Omit<MistakeSceneProps, "number">,
    Omit<MistakeSceneProps, "number">,
  ];
  readonly outro: TipsOutroProps;
  /** File in public/ to use as background music, or null for silence. */
  readonly music: string | null;
};

// 90 + 3 * 120 + 90 frames minus four 12-frame transitions.
export const TIPS_REEL_DURATION = 492;

export const TipsReel: React.FC<TipsReelProps> = ({ theme, hook, mistakes, outro, music }) => {
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <TipsThemeContext.Provider value={theme}>
      <AbsoluteFill>
        {music ? (
          <Audio
            src={staticFile(music)}
            volume={(f) =>
              interpolate(f, [0, 10, durationInFrames - 30, durationInFrames], [0, 0.5, 0.5, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            }
          />
        ) : null}
        <TransitionSeries>
          <TransitionSeries.Sequence name="Hook" durationInFrames={90} premountFor={fps}>
            <TipsHook {...hook} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            presentation={slide({ direction: "from-right" })}
            timing={springTiming({ config: { damping: 200 }, durationInFrames: 12 })}
          />
          <TransitionSeries.Sequence name="Errore 1" durationInFrames={120} premountFor={fps}>
            <MistakeScene number={1} {...mistakes[0]} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            presentation={slide({ direction: "from-right" })}
            timing={springTiming({ config: { damping: 200 }, durationInFrames: 12 })}
          />
          <TransitionSeries.Sequence name="Errore 2" durationInFrames={120} premountFor={fps}>
            <MistakeScene number={2} {...mistakes[1]} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            presentation={slide({ direction: "from-right" })}
            timing={springTiming({ config: { damping: 200 }, durationInFrames: 12 })}
          />
          <TransitionSeries.Sequence name="Errore 3" durationInFrames={120} premountFor={fps}>
            <MistakeScene number={3} {...mistakes[2]} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            presentation={wipe({ direction: "from-bottom" })}
            timing={linearTiming({ durationInFrames: 12 })}
          />
          <TransitionSeries.Sequence name="Outro" durationInFrames={90} premountFor={fps}>
            <TipsOutro {...outro} />
          </TransitionSeries.Sequence>
        </TransitionSeries>
        <ProgressBar />
      </AbsoluteFill>
    </TipsThemeContext.Provider>
  );
};
