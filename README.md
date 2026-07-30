# video-creation-with-avatar-and-hyperframes

A Claude plugin that builds bright, dense, kinetic-typography explainer videos with the **local HyperFrames exp-v9 engine** (0 render credits) plus optional **HeyGen avatar circles**. It ships one skill, `video-creation-flow`, the engine files, and a one-time YAML config.

## What you get
- `skills/video-creation-flow/SKILL.md` — the approval-gated workflow Claude follows.
- `skills/video-creation-flow/config.yaml` — fill this in ONCE (your ElevenLabs voice ID, HeyGen avatar ID, engine path, Drive links).
- `skills/video-creation-flow/engine/build.mjs` — the video generator (edit only its `S` scene array per video).
- `skills/video-creation-flow/engine/DESIGN.md` — the locked visual + motion language.

## Install (Claude Code / Cowork)
1. Add this repo as a plugin marketplace:
   `/plugin marketplace add YogiZoli/video-creation-with-avatar-and-hyperframes`
2. Install the plugin:
   `/plugin install video-creation-with-avatar-and-hyperframes`
3. Open `skills/video-creation-flow/config.yaml` and fill every empty value (each line says what to paste).
4. Say **"video creation flow"** (or `/` and pick it) to start.

Prefer a single skill instead of the whole plugin? Use the bundled `video-creation-flow.skill` file — open it in Claude and click **Save skill**.

## Prerequisites on the machine that runs it
The render is 100% local, so the machine needs:
- **Node.js 18+** (tested on v24). `node -v` must work.
- **ffmpeg / ffprobe** on the PATH (used for audio duration + `silencedetect` avatar timing).
- **HyperFrames** — no install needed; it runs through `npx --yes hyperframes@0.7.68 ...`.
- **Desktop Commander MCP** — so Claude can run `node`, the renderer, and git directly on the machine.
- **ElevenLabs MCP/API — OPTIONAL** — best-quality cloned voice. If you have no ElevenLabs, the flow falls back to a FREE voice automatically.
- **A free TTS for the fallback** — `edge-tts` (Microsoft free neural voices, no account, no key): `pip install edge-tts`. Only needed if you skip ElevenLabs.
- **HeyGen MCP/API — OPTIONAL** — the corner avatar circles. If you have no HeyGen, the video is made WITHOUT any avatar.
- **Google Drive MCP** — optional, for the DESIGN.md link and uploading finished deliverables.

**You can start with none of the optional services.** The motion graphics always render locally = 0 credits. With no ElevenLabs you get a free voiceover; with no HeyGen you get a clean video with no avatar. ElevenLabs (voice) and HeyGen (avatar circles, ~15-25 credits) are the only things that ever cost anything, and both are optional upgrades set in `config.yaml`.

## First-run notes
- Copy `engine/build.mjs` and `engine/DESIGN.md` into your working folder (the path you set as `engine.local_dir` in config.yaml), and put your baked audio at `<local_dir>\assets\vo.mp3`.
- Keep the Google Fonts `<link>` OUT of the generated HTML (the engine already omits it) — on some networks it stalls the render.
- Per video, edit ONLY the `S` array in `build.mjs`.

## License
MIT.
