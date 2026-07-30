# DESIGN.md — C2C "Expansion Pack" Motion-Graphics Visual + Motion Language

Single source of truth for the video look and motion. The engine (build.mjs) implements this; the Skill orchestrates. Per video, only the scene (`S`) array changes.

## 0. North star
- **Reference to match:** "Comment-to-Client: The Ownership Formula.mp4" (HeyGen). Bright, big kinetic type, dense punchy motion.
- **#1 RULE (most important): ~4x more scenes / much faster pace.** Many short, punchy scenes. Never linger. Keep energy high the whole way.

## 1. Canvas
- 1920x1080, 30 fps. **Bright background ALWAYS** — never dark.
- Base bg: `#eef3f7` with a soft radial lift to white near top-center.
- Ambient (subtle, continuous): faint **blueprint grid** (drifting slowly) + **animated corner brackets** + 1-2 soft color glows. Never busy.

## 2. Palette (restrained, minimalist — NOT garish)
- **Blue (lead)** `#1a73e8`
- **Navy (text/dark)** `#0e2038`
- **Green (single accent)** `#34a853` — used sparingly, for ONE emphasis/CTA at a time. **(Zoltan 2026-07-30: accent is GREEN, NOT orange. Do not use orange — he dislikes it. This overrides the older "orange is wanted" note.)**
- Muted text `#5b6b86`. Bg `#eef3f7`. Grid `rgba(26,115,232,.09)`.
- Rule: at most blue + navy + one green accent on screen. **Restrained beats colorful — prefer the simplest, least loud version.**

## 3. Typography (Inter 600/700/800; sentence case; keywords caps)
- **Kicker** (top label): ~40-48px, 800, letter-spacing ~8px, blue, uppercase. (Old versions were too small — make kickers clearly readable.)
- **Title / hero:** ~128-132px, 800. **Keep the title SMALL (Zoltan 2026-07-30: still too big at 150px+; engine now 130px hero / 128px bigw+ectitle / 92px .sm).** Navy or blue, solid color (never gradient-clip when animating per-letter).
- **Subtitle / bottom caption:** ~48-56px, larger than before, muted navy. **Must never overlap or slide onto other elements** — keep clear vertical spacing.
- **Emphasis:** exactly ONE word per sentence, **BOLD + BLUE** (never the whole sentence). Green only for the single CTA accent.
- Keywords always caps: YES / GUIDE / ACTION / TRIGGER / BUY. Never the word "CRM".

## 4. Layout & spacing
- **Generous padding — nothing touches the edges.** Keep >= ~140px safe margin all around; elements must never reach the screen edge.
- One idea per scene. Center-weighted. No clutter.
- Elements never overlap unless intentionally layered.

## 5. Motion principles
- **~4x more scenes / fast pace** (repeat: top priority).
- **Every element appears from nothing** (fade/pop/rise), one by one (staggered) — never a static hold.
- **Numbers count up from 0; bars grow from 0; % badges pop in at the end.**
- **Line graphs draw smoothly** (progressive stroke), never jump instantly.
- **Continuous secondary motion** (gentle float, drifting grid, soft glow pulse) so the frame is never still.
- Each scene has an **enter + exit** (slide/fade) and a subtle slow **camera** move (on an inner `.cam` wrapper). Exit tween on `.cam` + a `tl.set` hard-kill at the clip boundary.
- **Minimalist over garish** — clean, restrained, purposeful motion. The minimalist "Comment" pill animation is the benchmark.

## 6. Motion vocabulary (helpers the engine provides)
- `RISE` — kinetic per-letter reveal (solid-color text only).
- `POP` / `POPS` — scale-in, single or staggered.
- `DRAW` — SVG stroke draw (arrows, underlines, connectors, line graphs).
- `COUNT` — number counts up from 0.
- `BARGROW` — bar grows from 0 (width or height), badge pops at end. **Badge must stay centered over its bar and NEVER overflow the frame or collide with the kicker (Zoltan 2026-07-30); keep bars shorter and add top spacing.**
- `ZOOM` — a magnifier/zoom circle glides over a detail card while text appears from nothing.
- `GLOW/BURN` — pulsing glow on ONE key word (e.g. OWN).
- `ORBIT` — persona icons circle/rotate around.
- `TYPE` — typing/fill animation in a form (name + email).
- `SEQ` — end-card elements appear in sequence; CTA button pulses **softly**.

## 7. Scene archetypes (new-engine energy + build5's loved components)
Keep from the new bright engine: hero kinetic statement, "VIEWS -> LEADS / OWN" (words fade in, arrow motion, OWN glow), YES pills / hands->YES, **funnel** (COLD biggest, WARM mid, HOT smallest), **counter bars + end badge**, **orbiting personas**, **sequential end card** (app icon + title + pill + green button, soft-pulsing).
Port in from build5 (loved): **branch "DIFFERENT PAGES"**, **split "NOT LIKE COLD EMAIL"**, the **minimalist "Comment ... below" pill**, the **detailed lead card + moving ZOOM**, the **GoHighLevel form with typing**. Any dashboard brand name = **"GoHighLevel"** (never "Studio"); keep dashboards on-screen (no edge overflow).

## 8. AVOID
- Dark scenes. Garish/colorful overload. Oversized title. Elements touching edges. Whole-sentence emphasis.
- Static **hub-and-spoke "Unified Content Dashboard"** (felt static, disconnected from VO).
- The word "CRM". Dashes ("-") in script/VO.

## 9. HeyGen avatar (added last, after motion graphics approved)
- **Transparent-background** avatar clip (webm), composited **exactly as received, ZERO modification** — never stretch, oval-ize, veil/fade, re-compress, crop, or mask. Overlay AS-IS. HeyGen Video Agent BANNED.

## 10. Technical notes (HyperFrames)
- Animate **transforms only** (x/y/scale/opacity); do not animate layout props (letterSpacing/width) if it stutters — use scaleX/transform instead where possible.
- Per-letter kinetic text needs **solid colors** (gradient-clip text goes invisible when split into spans).
- `npx hyperframes@0.7.68 check` before every render; fix errors.
- **Always use a NEW timestamped output filename** each render (e.g. `..._vN_YYYY-MM-DD_HHMM.mp4`) to defeat player caching.
- Baked audio = `Expansion_Pack_VO_v3_bgm_1pct.mp3` at `assets/vo.mp3`; scene timing = word-count proportion of the VO.
- **No external Google Fonts `<link>` in the generated HTML** — on this machine/network it never fires the load event and the render/check hang with a navigation timeout. The HyperFrames compiler injects Inter locally (cached @font-face) and inlines the gsap CDN script, so the look is identical. build.mjs omits the font link on purpose.
