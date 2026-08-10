---
name: takeoff-ui-theme
description:
  Configure Takeoff UI theming, design tokens, and Tailwind CSS integration.
  Activate when user mentions design tokens, Tailwind setup, color palette,
  theming, or dark mode for Takeoff UI.
compatibility: Requires Node.js >= 20.12.2 and pnpm >= 8.0.0
argument-hint: '[token-type or question]'
license: Apache-2.0
metadata:
  author: turkishtechnology
  version: '0.11.13'
  homepage: 'https://takeoffui.com'
---

# Takeoff UI Theme & Design Tokens

You are helping configure theming and design tokens for **Takeoff UI**, a
Stencil.js-based design system. This skill covers `@takeoff-ui/tailwind` setup,
token customization, and theming patterns.

## Package

```
@takeoff-ui/tailwind
```

This is a Tailwind CSS plugin that provides Takeoff UI's design tokens as
utility classes.

---

## Setup by Framework

### Next.js (React)

```bash
npm install @takeoff-ui/tailwind
```

```js
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@takeoff-ui/react/**/*.js',
  ],
  plugins: [require('@takeoff-ui/tailwind')],
};
```

### Nuxt (Vue)

```bash
npm install @takeoff-ui/tailwind
```

```js
// tailwind.config.js
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.vue',
    './node_modules/@takeoff-ui/vue/**/*.js',
  ],
  plugins: [require('@takeoff-ui/tailwind')],
};
```

### Angular

```bash
npm install @takeoff-ui/tailwind
```

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './node_modules/@takeoff-ui/angular/**/*.mjs',
  ],
  plugins: [require('@takeoff-ui/tailwind')],
};
```

---

## What the Plugin Provides

The `@takeoff-ui/tailwind` plugin extends Tailwind with:

| Category          | Behavior                      | Example Class                          |
| ----------------- | ----------------------------- | -------------------------------------- |
| **Colors**        | Extended (added to defaults)  | `bg-primary-500`, `text-neutral-700`   |
| **Spacing**       | Extended (added to defaults)  | `p-m-base`, `gap-6xl`                  |
| **Border Radius** | Replaced (overrides defaults) | `rounded-m-base`, `rounded-full`       |
| **Box Shadow**    | Replaced (overrides defaults) | `shadow-1-default-base`                |
| **Screens**       | Replaced (overrides defaults) | `sm:`, `md:`, `lg:`, `xl:`             |
| **Typography**    | Custom CSS classes via plugin | `.title-h1`, `.body-base`, `.label-sm` |

---

## Color System

### Palette Structure

Takeoff UI uses a layered color system:

1. **Brand colors**: `primary` (red), `secondary` (gray-blue)
2. **Neutral**: Grayscale from white to near-black (`neutral-0` to
   `neutral-1000`)
3. **Semantic**: `red` (danger), `blue` (info), `green` (success), `yellow`
   (warning)
4. **Extended**: `purple`, `cyan`, `teal`, `business` (orange)

Each color has shades from `50` (lightest) to `900` (darkest).

### Usage

```html
<!-- Background -->
<div class="bg-primary-500">Brand red background</div>
<div class="bg-neutral-100">Light gray background</div>

<!-- Text -->
<p class="text-neutral-700">Body text</p>
<p class="text-red-500">Error text</p>
<p class="text-green-500">Success text</p>

<!-- Borders -->
<div class="border border-neutral-200">Card border</div>
<input class="border-primary-500 focus:border-primary-600" />
```

### CSS Custom Properties

All colors are also available as CSS variables. Components use these internally:

```css
/* Primary brand */
var(--primary-500)   /* #c90019 */

/* Semantic states */
var(--states-danger-base)   /* Maps to red-500 */
var(--states-success-base)  /* Maps to green-500 */
var(--states-warning-base)  /* Maps to yellow-500 */
var(--states-info-base)     /* Maps to blue-500 */
```

---

## Typography System

The plugin registers utility classes for typography. Font family: **Geologica**.

### Title Classes

```html
<h1 class="title-h1">Page Title</h1>
<h2 class="title-h2">Section Title</h2>
<h3 class="title-h3">Subsection</h3>
```

Titles are **responsive** — they scale down on mobile automatically.

### Body Classes

```html
<p class="body-base">Default paragraph</p>
<p class="body-sm">Small text</p>
<p class="body-xs">Caption text</p>
```

### Label Classes

```html
<label class="label-base">Form Label</label>
<span class="label-sm">Small label</span>
```

---

## Spacing System

Takeoff UI uses a custom spacing scale (not the default Tailwind 0-96 scale):

```html
<!-- Padding -->
<div class="p-m-base">8px padding</div>
<div class="p-6xl">24px padding</div>

<!-- Margin -->
<div class="mt-4xl">16px top margin</div>

<!-- Gap -->
<div class="flex gap-xl">12px gap</div>
```

Key values: `xxs` (2px), `xs` (4px), `s` (6px), `m-base` (8px), `l` (10px), `xl`
(12px), `4xl` (16px), `6xl` (24px), `8xl` (32px).

---

## Border Radius

```html
<div class="rounded-m-base">8px radius</div>
<div class="rounded-xl">16px radius</div>
<div class="rounded-full">Fully rounded</div>
```

---

## Shadows

Two shadow families:

```html
<!-- Elevated shadow (layered) -->
<div class="shadow-1-default-base">Default card</div>
<div class="hover:shadow-1-hover-base">Card with hover effect</div>

<!-- Blur shadow (glow) -->
<div class="shadow-2-default-base">Glow effect</div>
```

---

## Responsive Breakpoints

| Prefix | Min-width | Target        |
| ------ | --------- | ------------- |
| (none) | 0px       | Mobile first  |
| `sm:`  | 600px     | Small tablet  |
| `md:`  | 905px     | Tablet        |
| `lg:`  | 1248px    | Desktop       |
| `xl:`  | 1440px    | Large desktop |

```html
<div class="p-4xl md:p-6xl lg:p-8xl">Responsive padding</div>
```

---

## Token Override Patterns

### Extending Colors

```js
// tailwind.config.js
module.exports = {
  plugins: [require('@takeoff-ui/tailwind')],
  theme: {
    extend: {
      colors: {
        // Add custom brand colors alongside Takeoff UI tokens
        'brand-accent': {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
      },
    },
  },
};
```

### Overriding Tokens

```js
// tailwind.config.js
module.exports = {
  plugins: [require('@takeoff-ui/tailwind')],
  theme: {
    extend: {
      colors: {
        // Override primary color
        primary: {
          500: '#1a73e8', // Change brand red to blue
        },
      },
    },
  },
};
```

### CSS Variable Overrides

For runtime theming, override CSS custom properties:

```css
/* Custom theme */
:root {
  --primary-500: #1a73e8;
  --primary-600: #1557b0;
  --primary-700: #104892;
}

/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  :root {
    --neutral-0: #181b25;
    --neutral-50: #222530;
    --neutral-100: #2b303b;
    --neutral-900: #f9fafc;
  }
}
```

---

## Common Patterns

### Card with Tokens

```html
<div class="bg-neutral-0 rounded-l shadow-1-default-sm p-6xl">
  <h3 class="title-h4 text-neutral-900">Card Title</h3>
  <p class="body-base text-neutral-600 mt-xs">Card description</p>
</div>
```

### Form Layout

```html
<div class="flex flex-col gap-4xl">
  <div>
    <label class="label-base text-neutral-700 mb-xxs">Name</label>
    <tk-input placeholder="Enter name"></tk-input>
  </div>
  <div>
    <label class="label-base text-neutral-700 mb-xxs">Email</label>
    <tk-input type="email" placeholder="Enter email"></tk-input>
  </div>
  <tk-button variant="primary" label="Submit"></tk-button>
</div>
```

### Status Badge Colors

```html
<span class="bg-green-50 text-green-700 px-xl py-xxs rounded-full label-sm"
  >Active</span
>
<span class="bg-red-50 text-red-700 px-xl py-xxs rounded-full label-sm"
  >Error</span
>
<span class="bg-yellow-50 text-yellow-700 px-xl py-xxs rounded-full label-sm"
  >Warning</span
>
<span class="bg-blue-50 text-blue-700 px-xl py-xxs rounded-full label-sm"
  >Info</span
>
```
