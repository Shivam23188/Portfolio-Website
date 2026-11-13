# TPA Workspace — Design System

A complete guide to the look and feel of the TPA Workspace admin dashboard: colours, type, spacing, components, interactions and the rules behind them. Everything here is plain CSS, so it works with any stack (React, Angular, Vue, plain HTML, Tailwind).

**Live reference:** the working page is `prototypes/tpa-workspace.html`, with styles in `assets/css/tpa-workspace.css` and behaviour in `assets/js/tpa-workspace.js`. When in doubt, copy from those files.

---

## 1. Design principles

1. **Calm, white workspace.** Surfaces are white on a very light blue-grey page. Colour is used sparingly so data stands out.
2. **Navy is the voice, orange is the signal.** Navy carries text and structure. Orange marks only what is active, new or important: the current page, an unread dot, the user's name.
3. **Soft, not flat.** Rounded corners (10–20px), hairline borders and very low, navy-tinted shadows. Never harsh black shadows.
4. **Everything is tappable at 44px.** All buttons and nav rows are at least 44px tall.
5. **Labels whisper, content speaks.** Section labels are small, uppercase and widely spaced. Headings are heavy and tight.

---

## 2. Colour

### 2.1 Core palette

| Token | Hex | Role |
|---|---|---|
| `--tpa-bg` | `#F4F6FA` | Page background (behind cards) |
| `--tpa-surface` | `#FFFFFF` | Cards, sidebar, top bar |
| `--tpa-soft` | `#EEF1F7` | Pills, chips, icon-button hover, secondary fills |
| `--tpa-hover` | `#F1F3F8` | Nav row hover |
| `--tpa-line` | `#E5E8F0` | Every border and divider |
| `--tpa-navy` | `#1E2A4A` | **Brand primary.** Headings, strong text, avatar, logo |
| `--tpa-ink` | `#2E3A5C` | Main nav text, body text |
| `--tpa-ink-2` | `#4A5577` | Secondary text, sub-menu items |
| `--tpa-ink-3` | `#5B6585` | Muted text, uppercase section labels, captions |
| `--tpa-orange` | `#E8613C` | **Brand accent.** Notification dot, focus ring, logo arc, gradients |
| `--tpa-orange-ink` | `#D4532B` | Orange used as **large** text (the name in the greeting) |
| `--tpa-active-bg` | `#FDEEE7` | Background of the selected nav item |
| `--tpa-active-ink` | `#B5421E` | Text and icon of the selected nav item, links |

Colour split on a typical screen: **~85% white/blue-grey neutrals, ~12% navy, ~3% orange.** If orange starts appearing in more than a handful of places, it stops meaning "this is important".

### 2.2 Suggested additions for data (not in the current screen)

The current screen has no charts or statuses yet. When the dashboard needs them, use these so they sit well with the palette. Each status has a strong colour (for text, icons, chart lines) and a tint (for chip backgrounds).

| Token | Hex | Use |
|---|---|---|
| `--tpa-success` / `--tpa-success-bg` | `#166534` / `#E8F5EC` | Approved, completed, positive change |
| `--tpa-warning` / `--tpa-warning-bg` | `#B45309` / `#FDF3E2` | Pending, needs review |
| `--tpa-danger` / `--tpa-danger-bg` | `#B91C1C` / `#FDECEC` | Rejected, errors, negative change |
| `--tpa-info` / `--tpa-info-bg` | `#1D4ED8` / `#E9EFFD` | Neutral information, drafts |

**Chart series order:** navy `#1E2A4A` → orange `#E8613C` → slate `#8A93AD` → info blue `#1D4ED8`. Keep gridlines `#E5E8F0` and axis labels `#5B6585`.

Keep status colours separate from the brand orange: orange means "selected / new", not "warning".

### 2.3 Gradients and effects

| Name | Value | Where |
|---|---|---|
| Brand rule | `linear-gradient(90deg, #1E2A4A 0%, #1E2A4A 45%, #E8613C 100%)` | 4px strip on the top edge of the hero card |
| Orange glow | `radial-gradient(circle, rgba(232,97,60,.16) 0%, rgba(232,97,60,0) 70%)` | Soft halo behind the logo tile |
| Watermark | Logo SVG at `opacity: .05` | Large, bottom-right of the hero card, partly cropped |
| Scrim | `rgba(30,42,74,.32)` | Behind the mobile drawer |

Use the gradient strip once per screen at most (usually on the main hero card).

### 2.4 Contrast (WCAG 2.1)

All checked against their real backgrounds. AA needs 4.5:1 for normal text, 3:1 for large text (24px+, or 18.66px+ bold).

| Text | On | Ratio | Result |
|---|---|---|---|
| Navy `#1E2A4A` | White | 14.1 : 1 | AAA |
| Ink `#2E3A5C` | White | 11.2 : 1 | AAA |
| Ink-2 `#4A5577` | White | 7.4 : 1 | AAA |
| Ink-3 `#5B6585` | White / page bg | 5.8 / 5.3 : 1 | AA |
| Active ink `#B5421E` | Active bg `#FDEEE7` | 4.9 : 1 | AA |
| Orange ink `#D4532B` | White | 4.1 : 1 | **Large text only** |
| Orange `#E8613C` | White | 3.4 : 1 | **Non-text only** (dots, rings, icons, borders) |

Rule of thumb: **never use `#E8613C` or `#D4532B` for small text.** For small orange text (links, active item), use `#B5421E`.

---

## 3. Typography

**Typeface:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) — one family for everything, weights 400 / 500 / 600 / 700 / 800.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

Fallback stack: `"Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`

### Type scale

| Style | Size | Weight | Line height | Letter spacing | Colour | Example |
|---|---|---|---|---|---|---|
| Display | `clamp(34px, 5vw, 52px)` | 800 | 1.08 | -0.02em | Navy | "Good Afternoon, Ravi" |
| Page title | 18px | 700 | normal | 0 | Navy | "Dashboard" in the top bar |
| Brand name | 17px | 800 | 1.1 | 0.01em | Navy | "TPA" |
| Nav item | 14.5px | 500 (600 active) | — | 0 | Ink | "Dashboard", "Admin" |
| Body / sub-nav | 14px | 500 | — | 0 | Ink-2 | "Role Master", "Signed in as" |
| User name | 14px | 700 | — | 0 | Navy | "Ravi" |
| Caption | 12–13px | 500 | — | 0 | Ink-3 | "Admin" under the name |
| Pill label | 12px | 700 | — | 0.14em | Navy | "TRANSFER PRICING ALLOCATION" |
| Section label | 11px | 700 | — | 0.10em | Ink-3 | "OVERVIEW", "MODULES" |
| Brand sub / tile label | 11px | 600–700 | 1.1 | 0.16–0.20em | Ink-3 / Navy | "WORKSPACE" |

**Rules**
- Uppercase text is always small (11–12px), bold (700) and letter-spaced (0.10em or more). Never uppercase a heading.
- Large headings get **negative** tracking (-0.02em); small caps get **positive** tracking.
- Use `font-variant-numeric: tabular-nums` for any numbers in tables or KPI tiles so columns line up.

---

## 4. Spacing, radius, elevation

### Spacing scale (4px base)

`2 · 4 · 8 · 10 · 12 · 14 · 16 · 20 · 24 · 28 · 40 · 56 · 64`

| Where | Value |
|---|---|
| Gap between nav rows | 4px (2px inside a sub-group) |
| Icon ↔ label gap in rows/buttons | 10–12px |
| Sidebar padding | 20px top, 16px sides, 94px bottom (keeps breathing room at the end) |
| Top bar horizontal padding | 28px (16px on mobile) |
| Content area padding | 28px (16px on mobile) |
| Gap between items inside the hero | 20px |
| Hero card padding | 56px × 64px (40px × 24px on mobile) |
| Gap between hero columns | 40px |

### Corner radius

| Token | Value | Use |
|---|---|---|
| `--r-sm` | 8px | Skip link, tiny chips |
| `--r-md` | 10px | Nav rows, icon buttons |
| `--r-lg` | 12px | Brand tile, account button, info chips |
| `--r-xl` | 20px | Cards |
| `--r-2xl` | 36px | Big illustrative tiles |
| `--r-pill` | 999px | Pills, avatars, round icon buttons |

### Shadows (always navy-tinted, never black)

| Token | Value | Use |
|---|---|---|
| `--shadow-xs` | `0 2px 6px rgba(30,42,74,.08)` | Brand logo tile |
| `--shadow-card` | `0 1px 2px rgba(30,42,74,.04), 0 8px 24px rgba(30,42,74,.06)` | Main content cards |
| `--shadow-float` | `0 18px 40px rgba(30,42,74,.14)` | Floating / featured tiles |
| `--shadow-panel` | `12px 0 32px rgba(30,42,74,.12)` | Sidebar when it slides over content |

Cards always have **both** a 1px `#E5E8F0` border and the soft shadow.

---

## 5. Layout

```
┌──────────────┬───────────────────────────────────────────────┐
│              │  TOP BAR  72px · white · bottom border        │
│   SIDEBAR    ├───────────────────────────────────────────────┤
│   272px      │                                               │
│   white      │   CONTENT  · page bg #F4F6FA · 28px padding   │
│   sticky     │   ┌───────────────────────────────────────┐   │
│   full-height│   │  CARD · white · radius 20 · shadow    │   │
│              │   └───────────────────────────────────────┘   │
└──────────────┴───────────────────────────────────────────────┘
```

| Element | Size |
|---|---|
| Sidebar (expanded) | 272px |
| Sidebar (collapsed rail) | 76px |
| Top bar height | 72px |
| Target screen | 1440 × 900 (works from 1280 upwards; responsive down to 360) |

### Responsive behaviour

| Width | Behaviour |
|---|---|
| > 860px | Sidebar is visible. The ☰ button collapses it to a 76px icon rail; hovering or tabbing into the rail expands it over the content. |
| ≤ 860px | Sidebar becomes an off-canvas drawer (max 86% of screen). ☰ opens it, a navy scrim covers the page, Esc or tapping the scrim closes it. Paddings drop to 16px. |
| ≤ 560px | Top bar hides the user's name/role and the second divider; only the avatar remains. |

---

## 6. Components

All snippets assume the tokens from section 10 are loaded.

### 6.1 Sidebar brand

- 44×44 white tile, 12px radius, 1px border, `--shadow-xs`, logo centred (30px).
- To its right: "TPA" (17/800) stacked over "WORKSPACE" (11/600, 0.16em, ink-3).
- Padding `4px 8px 22px`.

### 6.2 Section label

`OVERVIEW`, `MODULES` — 11px / 700 / 0.10em / ink-3, padding `6px 14px 8px`. The second and later labels get 18px top padding to separate groups.

### 6.3 Nav item (the most important component)

```css
.nav-item {
  display: flex; align-items: center; gap: 12px;
  width: 100%; height: 44px; padding: 0 14px;
  border: 0; border-radius: 10px; background: transparent;
  font: 500 14.5px/1 var(--tpa-font); color: var(--tpa-ink);
  text-align: left; cursor: pointer;
  transition: background .15s ease, color .15s ease;
}
.nav-item:hover { background: var(--tpa-hover); }
.nav-item[aria-current="page"] {
  background: var(--tpa-active-bg);
  color: var(--tpa-active-ink);
  font-weight: 600;
}
```

| State | Background | Text / icon | Weight |
|---|---|---|---|
| Default | transparent | `#2E3A5C` | 500 |
| Hover | `#F1F3F8` | `#2E3A5C` | 500 |
| Active (current page) | `#FDEEE7` | `#B5421E` | 600 |
| Parent of the active page | transparent | `#1E2A4A` | 700 |
| Keyboard focus | + 2px `#E8613C` outline, 2px offset | | |

- Icon: 20px, stroke icon, `stroke="currentColor"` so it follows the text colour.
- Expandable parents end with a 16px chevron that rotates 180° when open (`transition: transform .2s ease`).

### 6.4 Sub-navigation group

```css
.side-nav__group {
  display: flex; flex-direction: column; gap: 2px;
  margin: 2px 0 6px 24px; padding-left: 10px;
  border-left: 1.5px solid var(--tpa-line);   /* the tree line */
}
.nav-item--sub { height: 40px; padding: 0 12px; gap: 11px; font-size: 14px; color: var(--tpa-ink-2); }
```

Sub-items use 18px icons. Long labels are cut with an ellipsis, never wrapped.

### 6.5 Top bar

- White, 72px tall, 1px bottom border, sticky.
- Left: ☰ icon button → 1×24px divider → page icon (18px) + page title (18/700).
- Right: notification button → 1×28px divider → account button.
- Gap between items: 16px (12px inside the right group).

### 6.6 Icon buttons

| Variant | Style |
|---|---|
| Ghost (☰) | 44×44, radius 10, transparent; hover `#EEF1F7` |
| Round (bell) | 44×44, radius 50%, white, 1px border; hover `#EEF1F7` |
| Unread dot | 8×8 orange circle with a 2px white ring, top 10px / right 11px |

Every icon-only button needs an `aria-label` (e.g. `aria-label="Notifications"`).

### 6.7 Account button and avatar

- Avatar: 40px circle, navy fill, white initials 13/700, 0.04em.
- Name 14/700 navy over role 12/500 ink-3, then a 16px chevron in ink-3.
- Whole block is one button, padding `4px 8px 4px 4px`, radius 12, hover `#EEF1F7`.

### 6.8 Card

```css
.card {
  background: var(--tpa-surface);
  border: 1px solid var(--tpa-line);
  border-radius: 20px;
  box-shadow: var(--shadow-card);
  padding: 24px;            /* 56px 64px for the hero card */
}
```

The **hero card** adds: the 4px brand gradient strip on top, the 5% logo watermark bottom-right, `overflow: hidden`, and a two-column flex layout that wraps on narrow screens.

### 6.9 Pill / eyebrow

```css
.pill {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 14px; border-radius: 999px;
  background: var(--tpa-soft); color: var(--tpa-navy);
  font-size: 12px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase;
}
```

Optionally starts with a 15px icon. Used above a heading to name the module or context.

### 6.10 Info chip ("Signed in as ADMIN")

White, 1px border, radius 12, padding `10px 16px`, 14px ink-2 text, 17px navy icon, the key value in navy 700 with 0.04em tracking.

### 6.11 Status chip (for tables — suggested)

```css
.status { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px;
  border-radius: 999px; font-size: 12px; font-weight: 600; }
.status::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.status--success { background: var(--tpa-success-bg); color: var(--tpa-success); }
.status--warning { background: var(--tpa-warning-bg); color: var(--tpa-warning); }
.status--danger  { background: var(--tpa-danger-bg);  color: var(--tpa-danger); }
```

### 6.12 Buttons (suggested, to match the system)

| Variant | Background | Text | Border | Hover |
|---|---|---|---|---|
| Primary | `#1E2A4A` | white | none | `#2E3A5C` |
| Accent (one per screen, main action) | `#B5421E` | white | none | `#9A3818` |
| Secondary | white | `#1E2A4A` | 1px `#E5E8F0` | bg `#EEF1F7` |
| Ghost | transparent | `#2E3A5C` | none | bg `#F1F3F8` |

Height 44px (36px for compact table actions), radius 10px, padding `0 18px`, 14px / 600, icon gap 8px.

### 6.13 Tables (suggested)

- Inside a card with 0 padding; table header row background `#F4F6FA`, header text 11px / 700 / 0.08em uppercase ink-3.
- Rows 52px tall, 1px `#E5E8F0` bottom border, hover `#F8F9FC`.
- Numbers right-aligned with `tabular-nums`.
- Wrap wide tables in a container with `overflow-x: auto` so the page never scrolls sideways.

### 6.14 Logo mark

Two arcs on a 48×48 grid: a navy semicircle (bottom) and a smaller orange half-ring (top right).

```html
<svg viewBox="0 0 48 48" aria-hidden="true">
  <path d="M7 40 A14 14 0 0 1 35 40" fill="none" stroke="#1E2A4A" stroke-width="8"/>
  <path d="M26 9 A9 9 0 0 0 44 9" fill="none" stroke="#E8613C" stroke-width="7"/>
</svg>
```

Sizes used: 30px (sidebar), 96px (hero tile), 560px at 5% opacity (watermark).

---

## 7. Iconography

- **Style:** outline / stroke icons, 24×24 grid, `stroke-width: 1.8` (2 for chevrons and the ☰ icon), round caps and joins, `fill="none"`, `stroke="currentColor"`.
- **Sizes:** 20px main nav, 18px sub-nav and page title, 19px bell, 16px chevrons, 15–17px inside pills and chips.
- **Compatible library:** [Lucide](https://lucide.dev) matches this style exactly (`grid`, `home`/`circle-dot`, `settings`, `key`, `database`, `users`, `folder`, `bell`, `briefcase`, `shield-check`, `chevron-down`, `menu`).
- Decorative icons get `aria-hidden="true"`. Never use emoji as icons.

---

## 8. Motion

| Token | Value | Use |
|---|---|---|
| `--tpa-ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | Everything that moves (smooth, settles softly) |
| Fast | `150ms ease` | Hover background/colour changes |
| Medium | `200ms` | Chevron rotation |
| Slow | `300ms` | Sidebar collapse, drawer slide, scrim fade |
| Entrance | `700ms`, staggered 80ms per item | Hero content fades up 14px on load |

Always include:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition: none !important; animation: none !important; }
}
```

---

## 9. Accessibility checklist

- Real `<button>` and `<a>` elements; never clickable `<div>`s.
- Current page: `aria-current="page"`. Expandable groups: `aria-expanded="true|false"` + `aria-controls`.
- Visible focus: `outline: 2px solid #E8613C; outline-offset: 2px` on every interactive element.
- Minimum 44×44px touch targets.
- A "Skip to content" link as the first focusable element.
- The mobile drawer closes on Esc and returns focus to the ☰ button.
- Colour is never the only signal: the active nav item changes weight as well as colour; status chips include a text label.

---

## 10. Copy-paste token file

Drop this into the project's global CSS. The suggested additions from section 2.2 are included.

```css
:root {
  /* Neutrals */
  --tpa-bg: #F4F6FA;
  --tpa-surface: #FFFFFF;
  --tpa-soft: #EEF1F7;
  --tpa-hover: #F1F3F8;
  --tpa-line: #E5E8F0;

  /* Brand */
  --tpa-navy: #1E2A4A;
  --tpa-ink: #2E3A5C;
  --tpa-ink-2: #4A5577;
  --tpa-ink-3: #5B6585;
  --tpa-orange: #E8613C;
  --tpa-orange-ink: #D4532B;
  --tpa-active-bg: #FDEEE7;
  --tpa-active-ink: #B5421E;

  /* Status (suggested) */
  --tpa-success: #166534;  --tpa-success-bg: #E8F5EC;
  --tpa-warning: #B45309;  --tpa-warning-bg: #FDF3E2;
  --tpa-danger:  #B91C1C;  --tpa-danger-bg:  #FDECEC;
  --tpa-info:    #1D4ED8;  --tpa-info-bg:    #E9EFFD;

  /* Type */
  --tpa-font: "Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;

  /* Radius */
  --r-sm: 8px; --r-md: 10px; --r-lg: 12px; --r-xl: 20px; --r-2xl: 36px; --r-pill: 999px;

  /* Elevation */
  --shadow-xs: 0 2px 6px rgba(30, 42, 74, 0.08);
  --shadow-card: 0 1px 2px rgba(30, 42, 74, 0.04), 0 8px 24px rgba(30, 42, 74, 0.06);
  --shadow-float: 0 18px 40px rgba(30, 42, 74, 0.14);
  --shadow-panel: 12px 0 32px rgba(30, 42, 74, 0.12);

  /* Layout */
  --tpa-sidebar: 272px;
  --tpa-rail: 76px;
  --tpa-topbar: 72px;

  /* Motion */
  --tpa-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

body {
  margin: 0;
  background: var(--tpa-bg);
  color: var(--tpa-navy);
  font-family: var(--tpa-font);
  -webkit-font-smoothing: antialiased;
}
:focus-visible { outline: 2px solid var(--tpa-orange); outline-offset: 2px; }
```

### Tailwind version

```js
// tailwind.config.js → theme.extend
colors: {
  tpa: {
    bg: '#F4F6FA', surface: '#FFFFFF', soft: '#EEF1F7', hover: '#F1F3F8', line: '#E5E8F0',
    navy: '#1E2A4A', ink: '#2E3A5C', 'ink-2': '#4A5577', 'ink-3': '#5B6585',
    orange: '#E8613C', 'orange-ink': '#D4532B', 'active-bg': '#FDEEE7', 'active-ink': '#B5421E',
  },
},
fontFamily: { sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'] },
borderRadius: { md: '10px', lg: '12px', xl: '20px', '2xl': '36px' },
boxShadow: {
  card: '0 1px 2px rgba(30,42,74,.04), 0 8px 24px rgba(30,42,74,.06)',
  float: '0 18px 40px rgba(30,42,74,.14)',
},
```

---

## 11. Do and don't

| Do | Don't |
|---|---|
| Keep the page background `#F4F6FA` and put content on white cards | Put text directly on the blue-grey page in large amounts |
| Use orange for one "you are here / new" signal at a time | Use orange for warnings, errors or every button |
| Use navy-tinted shadows plus a 1px border | Use black shadows or heavy drop shadows |
| Keep uppercase labels small and spaced | Uppercase large headings |
| Use 44px rows and buttons | Shrink controls below 40px |
| Use `#B5421E` for small orange text | Use `#E8613C` for small text (fails contrast) |
| Use one icon set with one stroke width | Mix filled and outline icons or use emoji |
