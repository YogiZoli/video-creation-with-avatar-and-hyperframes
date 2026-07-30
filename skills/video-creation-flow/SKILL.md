---
name: video-creation-flow
description: Build bright, dense kinetic-typography explainer videos with the local HyperFrames exp-v9 engine (0 render credits) + optional HeyGen avatar circles. Trigger: "video creation flow", "create the motion graphics video", "expansion pack video", "exp-v9 video", "build the motion graphics", "new explainer video".
---

# Video Creation Flow (HyperFrames exp-v9)

Produce bright, dense, kinetic-typography explainer videos with the **local HyperFrames exp-v9 engine** (0 render credits) plus optional HeyGen avatar circles. Everything runs on the local machine via Desktop Commander.

## STEP 0 — read the config FIRST (every run)
Before doing anything, read **`config.yaml`** that ships next to this SKILL.md. It holds the per-user values: ElevenLabs voice ID, HeyGen avatar ID, the local path to the engine folder, the DESIGN.md Drive link, the BGM ceiling, and the Drive delivery folder. If any required field is still blank, ask the user to fill it in `config.yaml` before continuing. Never hardcode IDs in the engine — always take them from `config.yaml`.

## Engine files (ship with this skill, in `engine/`)
- **`engine/DESIGN.md`** — the visual + motion language (source of truth for the look).
- **`engine/build.mjs`** — the generator. Per video, **edit ONLY the `S` scene array.** Do not rebuild the engine from scratch.
- On first use, copy `engine/build.mjs` and `engine/DESIGN.md` into the working folder named in `config.yaml` (`engine.local_dir`), and put the baked audio at `<local_dir>\assets\vo.mp3`.

## Locked design rules (baked into DESIGN.md + build.mjs — keep them)
- **Accent = GREEN `#34a853`, never orange.** Palette: blue `#1a73e8` lead + navy `#0e2038` + one green accent + bright bg `#eef3f7`.
- **Small title** (~130px hero; 128px bigw/end-title; 92px small line). Do not enlarge.
- **Bigger subtitle** (~48-56px) that never overlaps other elements.
- **One-word emphasis only:** exactly ONE word per sentence, BOLD + BLUE.
- **~4x more scenes / fast punchy pace — top priority.** Many short scenes; every element appears from nothing, staggered.
- **Minimalist / simplistic and NOT loud.** Bright background always. Everything off the edges (>=~140px safe margin). Counter-bar badge centered, never overflowing or hitting the kicker.
- Dashboards say **"GoHighLevel"** (never "Studio"). Keywords caps: YES / GUIDE / ACTION / TRIGGER / BUY. **Never the word "CRM". No "-" dashes in script/VO.**
- Archetypes: hero, statement (one-word emphasis), arrow (+ OWN glow), funnel, comment pill, branch, split, gohighlevel form with typing, lead card + moving ZOOM, counter-bars (+ badge, count-up from 0), orbiting personas, sequential end CTA. Vary them.

## Workflow (approval-gated — one gate at a time, approve before the next)
1. **Script (text)** — plain-language ownership copy, no dashes, no "CRM". Deliver as a copyable artifact. Approve.
2. **Voiceover** — ElevenLabs clone using `elevenlabs.voice_id` + settings from `config.yaml`. Approve.
3. **VO + background music** — quiet uplifting bed, **BGM <= `music.bgm_ceiling_percent` (max 10)**. This mix becomes `assets/vo.mp3`. Approve.
4. **Motion graphics (local HyperFrames)** — map the approved script to the `S` array; scene timing = word-count proportion of the VO (engine reads real duration from `assets/vo.mp3`). Approve.
5. **HeyGen avatar circles** — added LAST, only after motion graphics is approved.

## Build + render (Desktop Commander, cmd shell, in the engine folder)
- Edit only the `S` array in `build.mjs`, then `node build.mjs` to write `index.html`.
- **Check:** `npx --yes hyperframes@0.7.68 check` — 0 errors required. Benign warnings: overlapping `.cam` scale tweens, file-too-large / track-too-dense, white-on-green contrast.
- **No external Google Fonts `<link>` in the generated HTML.** On some networks it never fires the load event and the render hangs with a navigation timeout. The compiler injects Inter locally and inlines the gsap CDN script, so the look is identical. `build.mjs` omits the font link on purpose — keep it omitted.
- **Render:** `npx --yes hyperframes@0.7.68 render --quality high --browser-timeout 180 --output "<name>_vN_YYYY-MM-DD_HHMM.mp4"`. New timestamped filename each time. Present a SHORT lock-preview first, approve the motion feel, then full render. Local render = 0 credits. Animate transforms only; per-letter kinetic text needs solid colors.

## HeyGen avatar circles (hard rules — do NOT deviate)
- 4 circles: opening + 2 middle + closing, at natural pauses.
- Use `heygen.avatar_id` + `heygen.engine` from `config.yaml`, 1:1 720p. Drive each circle from the FINISHED video's own baked audio at that timestamp (ffmpeg `silencedetect` for clean sentence boundaries) so lip-sync is exact.
- **Transparent-background webm, composited EXACTLY as received — ZERO edits.** Never stretch, squeeze, oval-ize, add a veil/fade, re-compress, crop, or mask. Overlay AS-IS at `heygen.circle_px` (360), bottom-right, ~40px margin, no border, **audio muted**.
- **HeyGen Video Agent is BANNED** (burns the avatar in, no lip-sync, ~200 credits). Use `create_asset_upload` -> PUT the audio with `curl.exe` -> `complete_asset_upload` -> `create_video_from_avatar`.

## Delivery: Drive upload + local cleanup
- Upload to the folder in `delivery.drive_folder_url`. 5 named deliverables: `... — video script`, `... voiceover_without_background`, `... voiceover_with_background`, `... motion graphics video`, `... motion graphics video with AI avatars`. Plus the engine files (build.mjs, DESIGN.md, index.html, assets) to reproduce.
- Delete drafts / non-approved earlier versions; do not upload those. After upload, delete related local files.

## Standing rules
- No "-" dashes; never "CRM"; plain-language ownership.
- Prompts/scripts as copyable artifacts with a Copy button.
- Git / local files via Desktop Commander; do the work, do not ask the user to push or run the render.
