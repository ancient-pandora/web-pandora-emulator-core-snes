import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { configureSnesRuntime, installSnesRuntimeGlobals } from "../src/snes-core.js";
import { snesPlatform } from "../src/platform.js";

test("SNES platform contract identifies Snes9x and supported media", () => {
  assert.equal(snesPlatform.id, "snes");
  assert.equal(snesPlatform.defaultCore, "snes9x");
  assert.deepEqual(snesPlatform.media.extensions, [".smc", ".sfc", ".fig", ".swc"]);
});

test("runtime configuration is pinned and normalizes the data path", () => {
  const config = configureSnesRuntime({ player: "#game", gameName: "Test", gameUrl: "blob:rom", dataPath: "/core/snes/runtime" });
  assert.equal(config.EJS_core, "snes");
  assert.equal(config.EJS_pathtodata, "/core/snes/runtime/");
  assert.equal(config.EJS_defaultOptions.retroarch_core, "snes9x");
  assert.equal(config.EJS_threads, false);
});

test("runtime globals are installed onto the supplied target", () => {
  const target = {};
  installSnesRuntimeGlobals(target, { player: "#game", gameUrl: "blob:rom" });
  assert.equal(target.EJS_core, "snes");
});

test("manifest pins all deployable runtime artifacts", async () => {
  const manifest = JSON.parse(await readFile(new URL("../core-manifest.json", import.meta.url), "utf8"));
  assert.equal(manifest.frontendVersion, "4.2.3");
  assert.equal(manifest.core, "snes9x");
  assert.equal(Object.keys(manifest.sha256).length, 7);
});

