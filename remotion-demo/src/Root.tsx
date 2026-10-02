import { Composition, Folder } from "remotion";
import { CtaScene } from "./CtaScene";
import { FeaturesScene } from "./FeaturesScene";
import { HookScene } from "./HookScene";
import { SocialReel } from "./SocialReel";
import { MistakeScene } from "./tips/MistakeScene";
import { aiMistakesContent, reelMistakesContent } from "./tips/content";
import { TIPS_REEL_DURATION, TipsReel } from "./tips/TipsReel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SocialReel"
        component={SocialReel}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1920}
      />
      <Folder name="Scenes">
        <Composition id="Hook" component={HookScene} durationInFrames={105} fps={30} width={1080} height={1920} />
        <Composition id="Features" component={FeaturesScene} durationInFrames={150} fps={30} width={1080} height={1920} />
        <Composition id="CTA" component={CtaScene} durationInFrames={135} fps={30} width={1080} height={1920} />
      </Folder>
      <Composition
        id="TipsReel"
        component={TipsReel}
        durationInFrames={TIPS_REEL_DURATION}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={reelMistakesContent}
      />
      <Composition
        id="AiTipsReel"
        component={TipsReel}
        durationInFrames={TIPS_REEL_DURATION}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={aiMistakesContent}
      />
      <Folder name="TipsScenes">
        <Composition
          id="Mistake"
          component={MistakeScene}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            number: 1,
            mistake: "Inizio troppo lento",
            fix: "cattura l'attenzione nei primi 2 secondi.",
          }}
        />
      </Folder>
    </>
  );
};
