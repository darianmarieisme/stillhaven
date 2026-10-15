> **Note:** This is the implementation handoff spec generated while prototyping Stillhaven. It describes the prototype in enough detail for a developer to rebuild it in a production framework. Measurements and contrast figures come from the prototyping process and have not been independently verified. For an overview of the project, see [README.md](README.md).

# Handoff: Stillhaven — an emotional sanctuary for crisis, overwhelm, and conflict

## Overview
Stillhaven is a DBT-informed **crisis containment web app**. Its premise: the plan you made while calm should
drive the next few minutes, not the pain. It is a small state machine with seven screens and no backend —
everything the user configures persists to `localStorage` on their own device.

Two entry points from Home:
- **Pause and Restore** (`red`) — for emotional overwhelm. Sanctuary Mode: reduce demands, run a cooldown timer, then reconnect.
- **Pause before responding** (`pre`) — for conflict with someone. Five short steps that turn an activated impulse into a sendable message.

Plus **Set up** (build the plan while calm), **Resources** (crisis lines), **Cooldown** (live timer) and **Recon** (reconnect after).

## About the design files
The files in this bundle are **design references created in HTML** — a working prototype of the intended look,
motion and behaviour. They are **not production code to copy directly**.

The task is to **recreate these designs in the target codebase's existing environment** (React, Vue, SwiftUI,
React Native, etc.) using its established patterns, component library, routing and state management. If no
codebase exists yet, choose the framework that best fits the product — this is a mobile-first responsive web
app that must also work well on desktop, so a React/Next or Vue/Nuxt SPA is a natural fit.

Notes on the prototype's own construction, so you can read it:
- It is a single-file "Design Component" — one HTML file with an inline template plus a logic class. Styles are
  **inline on purpose** (a constraint of the prototyping environment), not a recommendation. Extract them into
  your styling layer (CSS modules, Tailwind, styled-components, StyleSheet) and use the token table below.
- `{{ name }}` are template holes filled by `renderVals()` in the logic class; `<sc-if>`/`<sc-for>` are
  conditional/loop tags. Treat these as JSX `{cond && ...}` and `.map()`.
- `style-hover` / `style-active` / `style-before` attributes are the prototype's way of writing
  `:hover` / `:active` / `::before`.

## Fidelity
**High fidelity.** Colours, typography, spacing, radii, shadows, motion curves and copy are all final and
deliberate — several were iterated specifically for contrast compliance. Recreate the UI pixel-accurately using
the codebase's existing libraries. Exact values are in **Design tokens** below.

Every text/background pair in the prototype was audited and passes **WCAG AA** (4.5:1 body, 3:1 large text)
against its *composited* background — these are translucent glass surfaces over a gradient, so contrast was
measured on the blended result, not the declared colour. Please preserve this; see **Accessibility** below.

---

## Screens / views

State lives in one `screen` value: `home | setup | pre | red | cooldown | recon | resources`.

### 1. Home (`home`)
**Purpose:** triage in one tap. A flooded user should reach Sanctuary Mode without reading.

**Layout:** single centred column, `max-width: 900px`, `padding-top: 56px`, `gap: 15px`,
`align-items: center; text-align: center`. Page padding `0 20px 28px`, `min-height: 100vh`.

Order: headline → intro → (optional cooldown-resume button) → eyebrow label → primary card → three utility cards → disclaimer pinned to the bottom (`margin-top: auto`).

**Components**
- **Headline** — Quicksand 500, 38px, `line-height: 1.05`, `letter-spacing: -.01em`, `max-width: 22ch`, colour `#f3f1ee`.
  Copy (tone=mixed): "You made this plan while calm. Let it drive." (tone=warm: "The plan you made on a good day lives here.")
- **Intro** — Literata 400, 15px, `line-height: 1.55`, `max-width: 38ch`, colour `#dde3ea`.
  "Intense pain is real — and it doesn't require immediate action. The goal isn't to win the conflict; it's to keep the next few minutes from causing lasting harm."
- **Eyebrow** — Inter 600, 10.5px, uppercase, `letter-spacing: .14em`, colour `#d3c0ec`, `margin-top: 22px`. "Choose what fits right now"
- **Primary card — "Pause and Restore"** (the only warm object in the app; see Design tokens → Primary card)
  - `max-width: 600px`, full width, `border-radius: 38px`, `padding: 34px 34px 36px`, centred column, `gap: 10px`
  - Eyebrow: Inter 600, 10.5px, uppercase, `letter-spacing: .15em`, `#f9cec0` — "Emotional overwhelm"
  - Title: Quicksand 500, 27px, `line-height: 1.06`, `letter-spacing: -.008em`, `#fdf6f3` — "Pause and Restore"
  - Divider: 52×1px, `rgba(250,206,190,.4)`, `margin: 3px 0 1px`
  - Body: Literata 400, 13px, `line-height: 1.55`, `max-width: 46ch`, `#f0dcd6` — "Sanctuary Mode gives your body what it needs while the crisis passes. It will not replace what you want, but it can keep the pain from deciding what happens next."
- **Three utility cards** — `grid-template-columns: repeat(3, 1fr)`, `gap: 10px`, `max-width: 600px`, `margin-top: 12px`
  - Each: `min-height: 84px`, `border-radius: 18px`, `padding: 15px 14px`, centred column, `gap: 5px`
  - Title Inter 600 13.5px `#f3f1ee`; 26×1px accent divider; subtitle Inter 400 11px `#c2cddb`
  - Per-card accent (border at 34% alpha, divider at 45%, hover glow at 50%):
    | Card | Label | Sub | Accent |
    |---|---|---|---|
    | `goPre` | Pause before responding | Conflict with someone | teal `126,186,190` |
    | `goSetup` | Set up | Plan, supports, guardrails | periwinkle `150,150,214` |
    | `goResources` | Resources | Lines you can reach now | amber `222,170,132` |
- **Cooldown resume** (only while a cooldown runs) — centred flex, `gap: 12px`, glass panel, `border-radius: 11px`, `padding: 13px 18px`. "A cooldown is running" + timer in Quicksand 500 19px.
- **Disclaimer** — Inter 10.5px, `#9aa7b4`, centred, `max-width: 52ch`, `padding-top: 52px`.
  "This app is not therapy, diagnosis, or emergency care. If you are in immediate danger or can't stay safe, call or text 988 (US) or your local emergency number."

### 2. Setup (`setup`) — 4 steps
**Purpose:** build the plan while calm. Step dots at top; a single primary CTA advances.
1. **Supports** — pick who/what you can reach. Options are selectable rows (checkbox + label + italic blurb). Selecting a *person* raises a deliberate warning about "favorite person" dynamics in BPD, offering "Go back and add another" vs "Keep it". Includes a warmline field and a link to Resources.
2. **Cooldown length** — chip row (15/30/45/60/90 min) + a "return time" preference (exact time vs no deadline).
3. **Do-not list** — categories of urges (send, delete, threaten, numb…); each selected urge gets a **replacement phrase** drawn from a guard bank. A risk tier (0–3) escalates the UI: tier 3 shows a stronger safety-step panel.
4. **Sign-off** — pick a closing line; suggestions offered as selectable rows.

### 3. Pre / Pause before responding (`pre`) — 5 steps A–E
A: what happened (textarea) → B: what you feel (chips) → C: what you need (chips) → D: the urge + a dysregulation check → E: the assembled message.
- Step E builds the message from toggleable **parts**: care / emotion / reality / ask / predict. Copy tone follows the `tone` prop.
- If step D indicates dysregulation, the flow **auto-routes into Sanctuary Mode** instead of letting the user send.
- Actions: copy to clipboard, "Transform" pane for rephrasing, continue to cooldown.

### 4. Sanctuary / Pause and Restore (`red`)
**Purpose:** the crisis screen. Nothing is required of the user.
- Eyebrow "SANCTUARY — NOTHING IS REQUIRED OF YOU HERE"; reassurance lines; the user's **guardrail list** ("What you decided, while calm") as "When I want to X → I will instead Y" rows; reach options (text a support, go somewhere, call 988); "Write it out" (stays on device).
- Advances through short steps to starting the cooldown. A de-emphasised "exit and go home (not recommended)" link is intentionally small — **do not enlarge it**.

### 5. Cooldown (`cooldown`)
Live countdown, Quicksand 500 76px, `font-variant-numeric: tabular-nums`. Progress rail 6px, `rgba(255,255,255,.14)` track. "+10 minutes", optional writing, and a **hold-to-confirm** "Hold 3s to end early" (fills `rgba(211,192,236,.85)`). Auto-advances to Recon at zero.

### 6. Recon (`recon`)
After the cooldown: reconnect now, or set a return time. Assembles a message; boundary-setting variant available.

### 7. Resources (`resources`)
Crisis and emergency lines: 911, 988, RAINN, National Domestic Violence Hotline, United Way 211, plus the user's own warmline. Reachable from Home and from Setup step 1; the back link reads "← Back to setup" or "← Home" depending on entry point (`resFrom`).

---

## Interactions & behaviour

### The Pause-and-Restore tap (the app's signature moment)
Designed to feel like a tap disturbing still water. Total ~1.65s.
1. **Pointer down** — the card compresses to **95.1%** over 170ms `cubic-bezier(.3,.7,.3,1)`, then **breathes** on a 2600ms `ease-in-out` loop between 95.1% and 97.4% for as long as the finger is held.
2. **Release** — springs back to 100% over 460ms `cubic-bezier(.28,1.5,.42,1)` (slight overshoot), picking up from wherever the breath was.
3. **Click** — two rings expand **from the actual tap coordinates** (not the card centre): leading ring 1150ms, trailing 1500ms at 150ms delay, both `cubic-bezier(.22,.68,.28,1)`, sized `230vmax`. A glow contracts to 52% at peak then expands and dissolves (1000ms).
4. **At 430ms** the Sanctuary screen mounts and fades up from `scale(1.014)` with a 7px blur clearing, 760ms `cubic-bezier(.2,.7,.25,1)` — while the rings are still travelling.
5. Overlay self-cleans at 1650ms.

**Performance note, learned the hard way:** while the press animation runs, the card's `backdrop-filter` is temporarily set to `none` and swapped for a flat matching tint, then restored. Scaling a blurred surface forces the compositor to recompute the blur every frame and visibly stutters. If your platform has the same issue, do the same. (Also: capture and restore the *original* values — clearing them outright loses them.)

### Other behaviour
- **Hover** on primary: shadow and peach glow strengthen, border brightens. On utility cards: accent border, glow, lifted shadow, slightly brighter fill — all 180ms ease.
- **Hold-to-confirm** on "end cooldown early": 3s hold with a filling progress bar; releasing early cancels.
- **Auto-route:** dysregulation in Pre step D sends the user to Sanctuary instead of the message.
- **Clipboard:** assembled messages copy with a transient "Copied" confirmation.
- **Cooldown timer** ticks on an interval and survives reload via `cooldownEnd` (absolute timestamp, not remaining time).
- **Responsive:** one column throughout; the three utility cards stay 3-across and shrink. Verified at 390px with no horizontal overflow. All touch targets ≥44px (the demo pill and header controls were explicitly sized to 44px).

### Motion inventory (all in the prototype's `@keyframes`)
| Name | Duration | What |
|---|---|---|
| `twk` | 4.5–10.5s, staggered | 44 star dots twinkle, opacity .1 → per-star peak (`--pk` 0.6–1.0) |
| `waA/waB/waC` | 63–118s, negative delays | 6 colour washes drift, scale and fade; `mix-blend-mode: screen` |
| `press` / `breathe` | 170ms / 2600ms | primary card press + held breathing |
| `rip` / `rip2` / `glo` | 1150 / 1500 / 1000ms | ripple rings + glow |
| `sanc` | 760ms | Sanctuary entrance (opacity + scale + blur) |

**Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables all of it via `[data-motion]` /
`[data-ripple]` hooks, holding stars at .4 and washes at .72 opacity. **Please carry this over** — it matters
in an app for overwhelm. (Do not key such a rule off serialised inline-style substrings; use a stable attribute.)

---

## Background (three stacked layers)
1. **Canvas** on `html`, `background-attachment: fixed`: the twilight gradient over `stars.svg`, `background-size: 100% 148vh, cover`. Base colour `#0d1a30`. Putting it on `html` (not `body`) is deliberate — on `body` a seam appears below the body box on tall pages.
   ```
   linear-gradient(180deg,
     rgba(13,26,48,.96) 0%,  rgba(20,34,62,.84) 14%, rgba(32,40,78,.66) 32%,
     rgba(48,46,88,.54) 50%, rgba(64,52,92,.5) 68%,  rgba(84,62,94,.5) 85%,
     rgba(96,70,94,.52) 100%)
   ```
2. **Drifting washes** — 6 fixed `inset: -24%` divs, each one radial-gradient, `mix-blend-mode: screen`, animating transform + opacity on 63–118s cycles with negative delays so they never sync. Colours: rose `232,168,196`, violet `186,166,220`, blush `238,176,182`, teal `138,206,214`, lilac `206,178,222`, pale blue `168,204,232` (alphas .37–.53). Overlaps shift hue — this is what makes the sky feel like weather.
3. **Twinkle layer** — 44 white dots, 1.6–3.1px, `position: fixed`, plain `background: #fff` with **no** backdrop-filter, animating opacity only.

`stars.svg` (included) holds 300 static white stars, deterministically placed, plus 11 larger ones with a soft glow.

---

## State management
Single state object, persisted to `localStorage` under **`dbt-backup-proto-v1`** (debounced write; JSON).

```
screen        'home' | 'setup' | 'pre' | 'red' | 'cooldown' | 'recon' | 'resources'
demo          boolean — demo data vs blank config
cfg           { supports[], warmline, cooldownMins, returnTimePref, doNot[], guards{}, signoff, ... }
setupStep     0–3
pre           { step: 0–4, a, b, c, d1, d2, parts: { care, emotion, reality, ask, predict } }
redStep       number
cooldownEnd   epoch ms (absolute — survives reload)  |  cooldownTotal  seconds
note          string — user's writing, never leaves the device
writeOpen, copied, holdPct, noteMode
reconMode, rcNeed, rcAsk, rcElse, boundaryPick
resFrom       which screen opened Resources (for the back link)
ripple        { x, y } | null — drives the tap overlay
```

**No data fetching.** No accounts, no network calls, no analytics. Everything is local by design — this is a
privacy requirement, not an implementation shortcut. If you add sync later, treat `note` and `cfg.supports`
as sensitive.

**Props (exposed as tweakable in the prototype):**
- `tone`: `mixed` (default) | `directive` | `warm` — rewrites headline and message copy.
- `utilityStyle`: `cards` (default) | `links` | `list` — three layouts for the utility row. `cards` is the chosen design; the other two are alternates left in place.

---

## Design tokens

### Palette — twilight
| Token | Value | Use |
|---|---|---|
| Sky base | `#0d1a30` | page canvas |
| Sky stops | see Background | navy → indigo → violet → dusty mauve |
| Text primary | `#f3f1ee` | all primary text |
| Text secondary | `#dde3ea` | supporting text |
| Text tertiary | `#c2cddb` | utility-card subtitles |
| Text quiet | `#9aa7b4` | disclaimer |
| Accent lavender (text) | `#d3c0ec` | accent text on surfaces |
| Accent lavender (fill) | `#a786d5` | CTAs, checkboxes, step dots, progress |
| Accent lavender (selected chip) | `rgba(203,180,232,.92)` on ink `#231338` | selected chips |
| Salmon / peach | `rgba(232,146,120,…)` → `rgba(176,110,140,…)` | primary card only |
| Peach eyebrow | `#f9cec0` | primary card eyebrow |
| Peach body | `#f0dcd6` | primary card body |
| Deep panel | `#1b2c42` / `#142338` | dark cards (Sanctuary) |
| Hairline | `rgba(255,255,255,.14)` | all borders and dividers |
| Utility accents | teal `126,186,190` · periwinkle `150,150,214` · amber `222,170,132` | the three cards |

**Rule the palette follows:** lavender = interactive/selected. Salmon = the primary action, and nothing else.
Each utility card owns one accent hue. Never more than these.

### Surfaces (glass)
| Surface | Fill | Blur | Border | Radius |
|---|---|---|---|---|
| Primary card | `linear-gradient(146deg, rgba(232,146,120,.34), rgba(206,116,126,.24) 52%, rgba(176,110,140,.22))` | `blur(26px) saturate(1.4)` | `1px rgba(250,196,178,.42)` | 38px |
| Utility card | `linear-gradient(180deg, rgba(24,36,62,.62), rgba(18,28,50,.5))` | `blur(20px) saturate(1.25)` | `1px <accent>/.34` | 18px |
| Standard panel | `rgba(123,138,163,.34)` | `blur(16px) saturate(1.25)` | `1px rgba(255,255,255,.14)` | 11–13px |
| Selected panel | `rgba(152,166,192,.36)` | `blur(18px) saturate(1.3)` | `1px rgba(255,255,255,.28)` | 11–13px |

### Shadows
| Use | Value |
|---|---|
| Primary card | `0 24px 54px rgba(6,10,28,.44), 0 0 46px rgba(226,142,118,.26), inset 0 1px 0 rgba(255,226,214,.34)` |
| Primary hover | `0 28px 62px rgba(6,10,28,.5), 0 0 60px rgba(226,142,118,.36), inset 0 1px 0 rgba(255,226,214,.44)` |
| Utility card | `0 12px 26px rgba(6,10,28,.32), inset 0 1px 0 rgba(255,255,255,.1)` |
| Utility hover | `0 16px 32px rgba(6,10,28,.4), 0 0 22px <accent>/.5, inset 0 1px 0 rgba(255,255,255,.14)` |

### Typography
Google Fonts: **Quicksand** (400/500/600), **Inter** (400/500/600 + italic), **Literata** (400/500/600 + italic).

| Role | Face | Size / weight |
|---|---|---|
| Screen headline | Quicksand 500 | 38px / 1.05 / `-.01em` |
| Card title (primary) | Quicksand 500 | 27px / 1.06 / `-.008em` |
| Section heading | Quicksand 500 | 19–25px / 1.12–1.4 |
| Cooldown timer | Quicksand 500 | 76px, tabular-nums |
| Body / running copy (14–17px) | **Literata** 400 | 15px / 1.55 |
| The user's own words | **Literata** 400 | 15.5–16.5px / 1.6 |
| UI, buttons, labels, ≤13.5px | **Inter** 400/500/600 | 11–14.5px |
| Eyebrow / label | Inter 600 | 10.5–11px, uppercase, `.13–.15em` |

**The type rule:** Quicksand for headings, Literata for running body copy *and* anything the user writes
themselves (so their words look different from the app's voice), Inter for all UI chrome and small text.

### Spacing & radii
Gaps: 5 · 7 · 9 · 10 · 12 · 14 · 15 · 16 · 20 · 22px. Radii: 10 · 11 · 13 · 18 · 20 · 38 · 99px (pills).
Columns: 900px (Home), 620px (inner screens), 600px (card group), 560px, 420px (progress), 340px (list variant).

---

## Accessibility
- **AA verified** across all seven screens, in both selected and unselected states, measured against composited
  translucent backgrounds. Re-verify if you change any surface alpha — a fill change moves every label on it.
- Watch three specific traps found during design: (1) text inheriting a light colour *through* a light card,
  (2) selected states where glass stacks on glass and goes too pale for white text, (3) text dimmed by an
  ancestor's `opacity` — multiply it in when you measure.
- Disabled CTAs must stay legible (~4.5:1), distinguished by fill not by fading the label away.
- Touch targets ≥44px. Respect `prefers-reduced-motion`. Keep the 988 disclaimer readable, not decorative.
- The intentionally small "exit and go home (not recommended)" link is a considered exception.

## Screenshots
`screens/` holds captures of every screen, in flow order. They are viewport captures of the live prototype at
~78% zoom, so tall screens may be cut off at the fold — open `Stillhaven.dc.html` for the full view.

| File | Screen |
|---|---|
| `01-home.png` | Home — triage |
| `02-setup-1-supports.png` | Setup 1 · supports |
| `03-setup-2-cooldown-length.png` | Setup 2 · cooldown length |
| `04-setup-3-do-not-list.png` | Setup 3 · do-not list |
| `05-setup-4-sign-off.png` | Setup 4 · your own words |
| `06-resources.png` | Resources — crisis lines |
| `07-pre-a-what-happened.png` | Pre A · what happened |
| `08-pre-b-the-story.png` | Pre B · the story |
| `09-pre-c.png` | Pre C |
| `10-pre-d.png` | Pre D |
| `11-pre-e-message.png` | Pre E · the message |
| `12-sanctuary-step-1.png` | Sanctuary · step 1 of 4 (Temperature) |
| `13-sanctuary-step-3.png` | Sanctuary · step 3 of 4 (Long exhales) |
| `14-cooldown.png` | Cooldown timer |
| `15-recon.png` | Recon — cooldown complete |

## Assets
- **`stars.svg`** — included. 300 static white stars + 11 glow stars, deterministic (seeded), `viewBox="0 0 1600 1000"`, `preserveAspectRatio="xMidYMid slice"`, used with `background-size: cover`.
- No other images, icons or illustrations. Earlier icon and orb treatments were removed deliberately — the design is type and light only. If you add icons, ask first.
- Fonts load from Google Fonts; swap to your codebase's font pipeline if it has one.

## Files in this bundle
| File | What it is |
|---|---|
| `Stillhaven.dc.html` | The full prototype — all seven screens, all logic and motion. Open it in a browser. |
| `stars.svg` | Star field used by the background. Keep it beside the HTML. |
| `Stillhaven Responsive Preview.dc.html` | Harness showing desktop (1280×800) and phone (390×844) side by side in iframes. |
| `screens/` | PNG captures of all seven screens (see Screenshots). |
| `support.js` | Runtime for the prototype's template/logic format. **Prototype scaffolding — do not port.** |

Open `Stillhaven.dc.html` directly to click through the real thing; it is the source of truth for anything this
document leaves ambiguous.

## Content warning for whoever implements this
The copy deals with self-harm urges, suicidal crisis, and abusive relationships, and it is written carefully —
non-judgemental, non-commanding, never promising safety it can't deliver. **Please don't casually reword it.**
If copy needs to change, involve the product owner. The 988 line and the crisis resources must remain accurate
and reachable.
