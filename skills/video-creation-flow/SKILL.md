---
name: video-creation-flow
description: Build bright, dense kinetic-typography explainer videos with the local HyperFrames exp-v9 engine (0 render credits) + optional HeyGen avatar circles. Trigger: "video creation flow", "create the motion graphics video", "expansion pack video", "exp-v9 video", "build the motion graphics", "new explainer video".
---

# Video Creation Flow (HyperFrames exp-v9)

Produce bright, dense, kinetic-typography explainer videos with the **local HyperFrames exp-v9 engine** (0 render credits) plus optional HeyGen avatar circles. Everything runs on the local machine via Desktop Commander.

## STEP 0 — read the config FIRST (every run)
Before doing anything, read **`config.yaml`** next to this SKILL.md. **Everything in it is OPTIONAL — never block or get stuck on a blank field.** Resolve two things up front and just tell the user what you picked:
- **Voice:** if `voiceover.elevenlabs_voice_id` is set (and provider is auto/elevenlabs), use ElevenLabs. Otherwise fall back to the **free** engine (`voiceover.free_engine`, default edge-tts — no account, no API key). If the user dropped their own `assets/vo.mp3`, use that. The flow MUST be able to start with no ElevenLabs at all.
- **Avatar:** if `avatar.heygen_avatar_id` is set (and enabled is auto/on), add the HeyGen circles at the end. If it is blank (or enabled=off), **skip the avatar entirely — the motion-graphics render is the final video.**

Only ask the user something if they explicitly want an upgrade you can't infer; otherwise proceed with the safe defaults above. Never hardcode IDs in the engine — always read them from `config.yaml`.

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
- Dashboard mockups use a neutral label (ships as "Dashboard") — or set your own product name. Put keywords in CAPS (e.g. YES / BUY / your keyword). **No "-" dashes in script/VO.**
- Archetypes: hero, statement (one-word emphasis), arrow (+ OWN glow), funnel, comment pill, branch, split, gohighlevel form with typing, lead card + moving ZOOM, counter-bars (+ badge, count-up from 0), orbiting personas, sequential end CTA. Vary them.

## Workflow (approval-gated — one gate at a time, approve before the next)
1. **Script (text)** — plain-language copy, no dashes. Deliver as a copyable artifact. Approve.
2. **Voiceover (optional provider)** — if an ElevenLabs voice_id is set, clone with it + the settings in `config.yaml`. Otherwise generate a FREE voiceover with `voiceover.free_engine` (edge-tts, `voiceover.free_voice`) — no key needed. Or use a user-supplied `assets/vo.mp3`. Approve.
3. **VO + background music** — quiet uplifting bed, **BGM <= `music.bgm_ceiling_percent` (max 10; 0 = none)**. This mix becomes `assets/vo.mp3`. Approve.
4. **Motion graphics (local HyperFrames)** — map the approved script to the `S` array; scene timing = word-count proportion of the VO (engine reads real duration from `assets/vo.mp3`). Approve. **If no avatar is configured, THIS is the finished video.**
5. **HeyGen avatar circles (optional)** — only if `avatar.heygen_avatar_id` is set (enabled auto/on). If not, skip this step completely.

## Build + render (Desktop Commander, cmd shell, in the engine folder)
- Edit only the `S` array in `build.mjs`, then `node build.mjs` to write `index.html`.
- **Check:** `npx --yes hyperframes@0.7.68 check` — 0 errors required. Benign warnings: overlapping `.cam` scale tweens, file-too-large / track-too-dense, white-on-green contrast.
- **No external Google Fonts `<link>` in the generated HTML.** On some networks it never fires the load event and the render hangs with a navigation timeout. The compiler injects Inter locally and inlines the gsap CDN script, so the look is identical. `build.mjs` omits the font link on purpose — keep it omitted.
- **Render:** `npx --yes hyperframes@0.7.68 render --quality high --browser-timeout 180 --output "<name>_vN_YYYY-MM-DD_HHMM.mp4"`. New timestamped filename each time. Present a SHORT lock-preview first, approve the motion feel, then full render. Local render = 0 credits. Animate transforms only; per-letter kinetic text needs solid colors.

## HeyGen avatar circles (OPTIONAL — skip if no avatar_id)
- If `avatar.heygen_avatar_id` is blank or `avatar.enabled` is off, DO NOT add any avatar — the motion-graphics render is already the final deliverable. Only follow the rules below when an avatar is configured.
- 4 circles: opening + 2 middle + closing, at natural pauses.
- Use `avatar.heygen_avatar_id` + `avatar.heygen_engine` from `config.yaml`, 1:1 720p. Drive each circle from the FINISHED video's own baked audio at that timestamp (ffmpeg `silencedetect` for clean sentence boundaries) so lip-sync is exact.
- **Transparent-background webm, composited EXACTLY as received — ZERO edits.** Never stretch, squeeze, oval-ize, add a veil/fade, re-compress, crop, or mask. Overlay AS-IS at `avatar.circle_px` (360), bottom-right, ~40px margin, no border, **audio muted**.
- **HeyGen Video Agent is BANNED** (burns the avatar in, no lip-sync, ~200 credits). Use `create_asset_upload` -> PUT the audio with `curl.exe` -> `complete_asset_upload` -> `create_video_from_avatar`.

## Delivery: Drive upload + local cleanup
- Upload to the folder in `delivery.drive_folder_url`. 5 named deliverables: `... — video script`, `... voiceover_without_background`, `... voiceover_with_background`, `... motion graphics video`, `... motion graphics video with AI avatars`. Plus the engine files (build.mjs, DESIGN.md, index.html, assets) to reproduce.
- Delete drafts / non-approved earlier versions; do not upload those. After upload, delete related local files.

## Standing rules
- No "-" dashes; plain-language copy.
- Prompts/scripts as copyable artifacts with a Copy button.
- Git / local files via Desktop Commander; do the work, do not ask the user to push or run the render.
