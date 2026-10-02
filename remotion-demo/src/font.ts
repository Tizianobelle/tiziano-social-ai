import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Montserrat is a variable font: one file covers every weight used here.
export const fontFamily = "Montserrat";

loadFont({
  family: fontFamily,
  url: staticFile("fonts/Montserrat-latin.woff2"),
  weight: "100 900",
});
