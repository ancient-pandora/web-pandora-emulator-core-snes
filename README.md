# Pandora Emulator SNES Core

Pinned browser runtime for the SNES/Super Famicom product of Wenys Emulator.

## Runtime

- EmulatorJS `4.2.3`
- Snes9x libretro core
- Standard, threaded, legacy, and threaded-legacy WASM variants
- EmulatorJS compression workers required to unpack core artifacts at runtime
- No ROMs, BIOS files, save data, or game assets

The web product owns installation, browser persistence, Google Drive transfer,
localized UI, snapshots, and virtual controls. This repository owns the pinned
SNES runtime files and the small configuration contract used to start them.

## Layout

- `runtime/`: deployable EmulatorJS frontend and Snes9x artifacts
- `src/`: platform manifest and runtime configuration helper
- `demo/`: local user-owned ROM smoke test
- `test/`: contract tests
- `LICENSES/`: complete upstream license texts

## Test

```sh
npm test
python3 -m http.server 8092
```

Open `http://localhost:8092/demo/` and select a user-owned SNES ROM.

## Update policy

Never point production at an unversioned `stable` or `latest` URL. Update the
runtime, compression workers, and all four Snes9x variants together, refresh their SHA-256 values in
`core-manifest.json`, run the smoke test, and release a new core tag.
