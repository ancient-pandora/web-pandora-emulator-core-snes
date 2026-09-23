export const SNES_CORE_ID = "snes9x";
export const SNES_CORE_VERSION = "4.2.3";

export function configureSnesRuntime({ player, gameName, gameUrl, dataPath = "./runtime/" }) {
  if (typeof player !== "string" || !player) throw new TypeError("An EmulatorJS player selector is required");
  if (typeof gameUrl !== "string" || !gameUrl) throw new TypeError("An SNES ROM URL is required");
  const normalizedPath = dataPath.endsWith("/") ? dataPath : `${dataPath}/`;
  return Object.freeze({
    EJS_player: player,
    EJS_core: "snes",
    EJS_gameName: gameName || "SNES Game",
    EJS_gameUrl: gameUrl,
    EJS_pathtodata: normalizedPath,
    EJS_startOnLoaded: true,
    EJS_threads: false,
    EJS_defaultOptions: Object.freeze({ retroarch_core: SNES_CORE_ID }),
  });
}

export function installSnesRuntimeGlobals(target, options) {
  if (!target || typeof target !== "object") throw new TypeError("A global target is required");
  Object.assign(target, configureSnesRuntime(options));
  return target;
}

