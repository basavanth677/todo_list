---
name: Kinetic Clarity
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464554'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#825100'
  on-tertiary: '#ffffff'
  tertiary-container: '#a36700'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.025em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style
The design system embodies focused productivity through modern minimalism, engineered specifically for task orchestration and cognitive calm. The interface prioritizes high-legibility typographic balance, effortless scannability, and frictionless micro-interactions. The target audience encompasses professionals, developers, and knowledge workers who require an MVP-grade task management tool devoid of visual clutter, visual friction, or feature bloat.

Visual hierarchy relies on tactile clarity: high-contrast typography, quiet structural borders, generous whitespace, and purposeful contextual color coding. Interactive states evoke tactile responsiveness and momentum, confirming completions cleanly with instant, satisfying visual resolution.

## Colors
The color palette establishes an active hierarchy prioritizing neutral backgrounds with intentional accents for operational states:

- **Primary (`#6366F1` Indigo Accent):** Primary actions, focal states, active task highlights, and selection indicators.
- **Secondary (`#10B981` Emerald Green):** Success indicators, task completion strikes, resolution badges, and progress counters.
- **Tertiary (`#F59E0B` Amber Warning):** Impending deadlines, priority tasks, high-attention tags, and warning indicators.
- **Neutral Core:**
  - Text & Accents: `#0F172A` (Slate 900) for high-contrast primary copy; `#475569` (Slate 600) for secondary metadata and icons; `#94A3B8` (Slate 400) for placeholders and inactive elements.
  - Surface Foundation: `#F8FAFC` (Slate 50) for canvas background; `#FFFFFF` for task cards, modals, and input fields.
  - Borders & Dividers: `#E2E8F0` (Slate 200) for default boundaries; `#CBD5E1` (Slate 300) for interactive hover outlines.

## Typography
Typographic discipline pairs the structural warmth of Plus Jakarta Sans for titles and metrics with the functional neutrality of Inter for task lists, content inputs, and metadata. 

Use `display` for project counters and board overviews, stepping down to `display-mobile` on smaller viewports. Apply `label-sm` to tag badges and micro-dates, leveraging tabular figures for dates, timers, and list counts to avoid visual jitter across dynamic updates.

## Layout & Spacing
The layout relies on a focused single-column or constrained dual-column fluid grid, optimized for central task focus with a maximum content boundary of `768px` for list views and `1024px` for board views. 

- **Desktop (1024px+):** Centered application container with `margin-desktop` (2rem) and `gutter-desktop` (1.5rem) separating task panels, sidebar filters, and modal panels.
- **Tablet (768px - 1023px):** Fluid layout utilizing 1.5rem side gutters, collapsing side navigation into an overlay or top segmented rail.
- **Mobile (<768px):** Single-column edge-to-edge layout with `margin` (1rem) safe paddings, docked bottom command bar for rapid task insertion.

## Elevation & Depth
Depth is delivered using a multi-tiered surface system combined with featherlight ambient shadows. The interface retains a light physical posture without visual heaviness:

- **Surface Base (Level 0):** Canvas `#F8FAFC`. Completely flat.
- **Cards & Inputs (Level 1):** `#FFFFFF` surfaces structured with a crisp border `1px solid #E2E8F0` and subtle ambient shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)`.
- **Card Hover / Drag State (Level 2):** Subtle elevation increase using `0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)` and border transition to `#CBD5E1`.
- **Modals, Floating Action Bars & Popovers (Level 3):** `#FFFFFF` framed with `0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.

## Shapes
A unified rounded visual language softens structural density while preserving architectural precision. Task containers, interactive modals, and floating panels enforce a prominent `rounded-xl` (1.5rem / 24px) or `rounded-lg` (1rem / 16px) radius, while atomic elements such as checkboxes, tags, and inputs maintain a crisp `0.5rem` (8px) radius. Task completion checkboxes feature a slightly softened square to balance checkmark alignment.

## Components

### Buttons
- **Primary:** Filled `#6366F1` background, `#FFFFFF` text, `0.5rem` radius, padding `0.5rem 1rem`. Hover: `#4F46E5`. Active: `#4338CA`.
- **Secondary / Ghost:** Transparent background, `1px solid #E2E8F0`, `#0F172A` text. Hover: `#F1F5F9` background, `#CBD5E1` border.
- **Destructive:** Soft crimson background tint with dark red label for safety; full red only on confirmation.

### Task Cards
- **Base:** `#FFFFFF` background, `1.5rem` radius, `1px solid #E2E8F0` border, `1rem` padding.
- **Interactive State:** Hover elevates to Level 2 shadow. Drag-and-drop triggers a 1-degree rotation and primary tint border.
- **Completed State:** Background transitions to `#F8FAFC`, task title receives strike-through with `#94A3B8` text, checkbox locks into `#10B981`.

### Checkboxes (Task Completion)
- Custom square box, `1.25rem × 1.25rem`, `0.375rem` radius, `1.5px solid #CBD5E1`.
- Hover: border changes to `#6366F1`.
- Checked: `#10B981` solid fill, white check icon with swift scale-in transition (`150ms cubic-bezier(0.4, 0, 0.2, 1)`).

### Text Inputs & Inline Task Creator
- **Surface:** `#FFFFFF` background, `1px solid #E2E8F0`, `0.5rem` radius, `0.625rem 0.875rem` padding.
- **Focus:** Crisp `2px` ring in `#6366F1` offset by `2px` white space; border switches to `#6366F1`.
- **Inline Quick Add:** Clean borderless field inside a Level 1 container that expands vertically on focus with micro-action tags (due date, priority picker).

### Chips & Status Badges
- **Pending / Due Soon:** `#FEF3C7` background, `#92400E` text, `0.375rem` radius, padding `0.25rem 0.5rem`.
- **Priority Indicator:** Dot badge (`0.5rem` circle) using tertiary `#F59E0B` or primary `#6366F1`.
- **Completed Filter:** `#D1FAE5` background, `#065F46` text.

### Empty States & Progress Trackers
- Minimalist circular progress ring tracking completion percentage using `#10B981` against a `#E2E8F0` base ring.
- Empty list illustrations constructed with simple, low-contrast `#E2E8F0` geometric lines and slate prompts.