import type { TipsReelProps } from "./TipsReel";
import { brandTheme, creamTheme } from "./theme";

export const reelMistakesContent: TipsReelProps = {
  theme: creamTheme,
  music: null,
  hook: {
    count: 3,
    words: ["errori", "che", "rovinano", "i", "tuoi", "Reel"],
    highlightIndex: 2,
    subtitle: "(il numero 2 lo fanno quasi tutti)",
  },
  mistakes: [
    { mistake: "Inizio troppo lento", fix: "cattura l'attenzione nei primi 2 secondi." },
    {
      mistake: "Niente sottotitoli",
      fix: "tanti guardano senza audio: metti sempre il testo a schermo.",
    },
    {
      mistake: "Nessuna call to action",
      fix: "di' sempre cosa fare: salva, commenta o condividi.",
    },
  ],
  outro: {
    emoji: "📌",
    highlighted: "Salvalo",
    title: "per dopo",
    subtitle: "Segui per altri consigli ogni giorno",
  },
};

export const aiMistakesContent: TipsReelProps = {
  theme: brandTheme,
  music: "music/upbeat-loop.wav",
  hook: {
    count: 3,
    words: ["errori", "quando", "usi", "l'AI", "per", "i", "social"],
    highlightIndex: 3,
    subtitle: "(il numero 3 può costarti caro)",
  },
  mistakes: [
    {
      mistake: "Copiare il testo dell'AI così com'è",
      fix: "rileggilo e aggiungi la tua voce e le tue esperienze.",
    },
    {
      mistake: "Prompt troppo generici",
      fix: "indica pubblico, tono, formato e obiettivo del post.",
    },
    {
      mistake: "Pubblicare senza controllare",
      fix: "verifica fatti, immagini e diritti prima di andare online.",
    },
  ],
  outro: {
    emoji: "🤖",
    highlighted: "Salvalo",
    title: "per il prossimo post",
    subtitle: "Segui Tiziano Social AI",
  },
};
