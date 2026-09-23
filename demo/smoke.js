import { installSnesRuntimeGlobals } from "../src/snes-core.js";

document.querySelector("#rom").addEventListener("change", ({ target }) => {
  const file = target.files?.[0];
  if (!file) return;
  installSnesRuntimeGlobals(globalThis, {
    player: "#game",
    gameName: file.name.replace(/\.[^.]+$/, ""),
    gameUrl: URL.createObjectURL(file),
    dataPath: "../runtime/",
  });
  const loader = document.createElement("script");
  loader.src = "../runtime/loader.js";
  document.body.append(loader);
}, { once: true });

