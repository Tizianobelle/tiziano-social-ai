import { linearTiming, springTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { MistakeScene } from "./MistakeScene";
import { ProgressBar } from "./ProgressBar";
import { TipsHook } from "./TipsHook";
import { TipsOutro } from "./TipsOutro";

export const TipsReel: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence name="Hook" durationInFrames={90} premountFor={fps}>
          <TipsHook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 12 })}
        />
        <TransitionSeries.Sequence name="Errore 1" durationInFrames={120} premountFor={fps}>
          <MistakeScene
            number={1}
            mistake="Inizio troppo lento"
            fix="cattura l'attenzione nei primi 2 secondi."
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 12 })}
        />
        <TransitionSeries.Sequence name="Errore 2" durationInFrames={120} premountFor={fps}>
          <MistakeScene
            number={2}
            mistake="Niente sottotitoli"
            fix="tanti guardano senza audio: metti sempre il testo a schermo."
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 12 })}
        />
        <TransitionSeries.Sequence name="Errore 3" durationInFrames={120} premountFor={fps}>
          <MistakeScene
            number={3}
            mistake="Nessuna call to action"
            fix="di' sempre cosa fare: salva, commenta o condividi."
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: 12 })}
        />
        <TransitionSeries.Sequence name="Outro" durationInFrames={90} premountFor={fps}>
          <TipsOutro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <ProgressBar />
    </AbsoluteFill>
  );
};
