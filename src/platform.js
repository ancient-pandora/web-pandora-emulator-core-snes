import { SNES_CORE_ID, SNES_CORE_VERSION, installSnesRuntimeGlobals } from "./snes-core.js";

export const snesPlatform = Object.freeze({
  id: "snes",
  name: "SNES / Super Famicom",
  kind: "console",
  defaultCore: SNES_CORE_ID,
  media: Object.freeze({
    model: "single-media",
    extensions: Object.freeze([".smc", ".sfc", ".fig", ".swc"]),
    accept: ".smc,.sfc,.fig,.swc,application/octet-stream",
  }),
  capabilities: Object.freeze({
    audio: true,
    keyboard: true,
    gamepad: true,
    batterySave: true,
    snapshots: true,
    screenshot: true,
  }),
  core: Object.freeze({
    id: SNES_CORE_ID,
    version: SNES_CORE_VERSION,
    frontend: "EmulatorJS",
    upstream: "https://github.com/libretro/snes9x",
    license: "GPL-2.0",
  }),
});

export function configureSnesCore(target, options) {
  return installSnesRuntimeGlobals(target, options);
}

