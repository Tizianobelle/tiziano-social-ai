import { createContext, useContext } from "react";

export type TipsTheme = {
  readonly background: string;
  readonly ink: string;
  /** Ink color as "r,g,b" so it can be used with varying alpha. */
  readonly inkRgb: string;
  readonly accent: string;
  readonly strike: string;
  readonly marker: string;
  readonly card: string;
  readonly cardInk: string;
  readonly good: string;
  readonly outroBackground: string;
  readonly outroInk: string;
  readonly outroMarker: string;
  readonly outroMarkerInk: string;
};

export const creamTheme: TipsTheme = {
  background: "#fdf6ec",
  ink: "#141414",
  inkRgb: "20,20,20",
  accent: "#ff5a36",
  strike: "#ff5a36",
  marker: "#ffd84d",
  card: "#141414",
  cardInk: "#fdf6ec",
  good: "#4ade80",
  outroBackground: "#ff5a36",
  outroInk: "#ffffff",
  outroMarker: "#ffffff",
  outroMarkerInk: "#141414",
};

// Colors taken from the Tiziano Social AI web app.
export const brandTheme: TipsTheme = {
  background: "#081523",
  ink: "#edf5ff",
  inkRgb: "237,245,255",
  accent: "#2585f5",
  strike: "#ff4d5e",
  marker: "#2585f5",
  card: "#dff4ff",
  cardInk: "#081523",
  good: "#157347",
  outroBackground: "#2585f5",
  outroInk: "#ffffff",
  outroMarker: "#081523",
  outroMarkerInk: "#ffffff",
};

export const TipsThemeContext = createContext<TipsTheme>(creamTheme);

export const useTheme = () => useContext(TipsThemeContext);
