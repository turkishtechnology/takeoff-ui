# Takeoff UI Design Tokens (Tailwind)

Reference for `@takeoff-ui/tailwind` design tokens. Use these class names in
your Tailwind CSS.

## Installation

```bash
npm install @takeoff-ui/tailwind
```

```js
// tailwind.config.js
module.exports = {
  plugins: [require('@takeoff-ui/tailwind')],
};
```

## Color Palette

All colors available as `bg-{color}-{shade}`, `text-{color}-{shade}`,
`border-{color}-{shade}`.

### Primary (Brand Red)

| Token         | Hex     |
| ------------- | ------- |
| `primary-50`  | #fae6e8 |
| `primary-100` | #eeb0b8 |
| `primary-200` | #e68a95 |
| `primary-300` | #db5465 |
| `primary-400` | #d43347 |
| `primary-500` | #c90019 |
| `primary-600` | #b70017 |
| `primary-700` | #8f0012 |
| `primary-800` | #6f000e |
| `primary-900` | #54000b |

### Secondary (Gray-Blue)

| Token           | Hex     |
| --------------- | ------- |
| `secondary-50`  | #f2f3f5 |
| `secondary-100` | #dadee3 |
| `secondary-200` | #c1c8d1 |
| `secondary-300` | #a9b3be |
| `secondary-400` | #919dac |
| `secondary-500` | #79889a |
| `secondary-600` | #607083 |
| `secondary-700` | #49586a |
| `secondary-800` | #34404f |
| `secondary-900` | #1f2833 |

### Neutral (Grayscale)

| Token          | Hex     |
| -------------- | ------- |
| `neutral-0`    | #ffffff |
| `neutral-50`   | #f9fafc |
| `neutral-100`  | #f2f5f8 |
| `neutral-200`  | #e1e4ea |
| `neutral-300`  | #cacfd8 |
| `neutral-400`  | #99a0ae |
| `neutral-500`  | #717784 |
| `neutral-600`  | #525866 |
| `neutral-700`  | #2b303b |
| `neutral-800`  | #222530 |
| `neutral-900`  | #181b25 |
| `neutral-1000` | #111216 |

### Semantic Colors

#### Red (Danger/Error)

| Token     | Hex     |     | Token     | Hex     |
| --------- | ------- | --- | --------- | ------- |
| `red-50`  | #fff5f5 |     | `red-500` | #ff3d32 |
| `red-100` | #ffd0ce |     | `red-600` | #d9342b |
| `red-200` | #ffaca7 |     | `red-700` | #b32b23 |
| `red-300` | #ff8780 |     | `red-800` | #8c221c |
| `red-400` | #ff6259 |     | `red-900` | #661814 |

#### Blue (Info)

| Token      | Hex     |     | Token      | Hex     |
| ---------- | ------- | --- | ---------- | ------- |
| `blue-50`  | #f5f9ff |     | `blue-500` | #3b82f6 |
| `blue-100` | #d0e1fd |     | `blue-600` | #326fd1 |
| `blue-200` | #abc9fb |     | `blue-700` | #295bac |
| `blue-300` | #85b2f9 |     | `blue-800` | #204887 |
| `blue-400` | #609af8 |     | `blue-900` | #183462 |

#### Green (Success)

| Token       | Hex     |     | Token       | Hex     |
| ----------- | ------- | --- | ----------- | ------- |
| `green-50`  | #f4fcf7 |     | `green-500` | #22c55e |
| `green-100` | #caf1d8 |     | `green-600` | #1da750 |
| `green-200` | #a0e6ba |     | `green-700` | #188a42 |
| `green-300` | #76db9b |     | `green-800` | #136c34 |
| `green-400` | #4cd07d |     | `green-900` | #0e4f26 |

#### Yellow (Warning)

| Token        | Hex     |     | Token        | Hex     |
| ------------ | ------- | --- | ------------ | ------- |
| `yellow-50`  | #fefbf3 |     | `yellow-500` | #eab308 |
| `yellow-100` | #faedc4 |     | `yellow-600` | #c79807 |
| `yellow-200` | #f6de95 |     | `yellow-700` | #a47d06 |
| `yellow-300` | #f2d066 |     | `yellow-800` | #816204 |
| `yellow-400` | #eec137 |     | `yellow-900` | #5e4803 |

#### Purple

| Token        | Hex     |     | Token        | Hex     |
| ------------ | ------- | --- | ------------ | ------- |
| `purple-50`  | #fbf7ff |     | `purple-500` | #a855f7 |
| `purple-100` | #ead6fd |     | `purple-600` | #8f48d2 |
| `purple-200` | #dab6fc |     | `purple-700` | #763cad |
| `purple-300` | #c996fa |     | `purple-800` | #5c2f88 |
| `purple-400` | #b975f9 |     | `purple-900` | #432263 |

#### Cyan

| Token      | Hex     |     | Token      | Hex     |
| ---------- | ------- | --- | ---------- | ------- |
| `cyan-50`  | #f3fbfd |     | `cyan-500` | #06b6d4 |
| `cyan-100` | #c3edf5 |     | `cyan-600` | #059bb4 |
| `cyan-200` | #94e0ed |     | `cyan-700` | #047f94 |
| `cyan-300` | #65d2e4 |     | `cyan-800` | #036475 |
| `cyan-400` | #35c4dc |     | `cyan-900` | #024955 |

#### Teal

| Token      | Hex     |     | Token      | Hex     |
| ---------- | ------- | --- | ---------- | ------- |
| `teal-50`  | #f3fbfb |     | `teal-500` | #14b8a6 |
| `teal-100` | #c7eeea |     | `teal-600` | #119c8d |
| `teal-200` | #9ae0d9 |     | `teal-700` | #0e8174 |
| `teal-300` | #6dd3c8 |     | `teal-800` | #0b655b |
| `teal-400` | #41c5b7 |     | `teal-900` | #084a42 |

#### Business (Orange)

| Token          | Hex     |     | Token          | Hex     |
| -------------- | ------- | --- | -------------- | ------- |
| `business-50`  | #fdf0e9 |     | `business-500` | #ba7655 |
| `business-100` | #f7d5c4 |     | `business-600` | #a45e3c |
| `business-200` | #edbba3 |     | `business-700` | #894727 |
| `business-300` | #e0a385 |     | `business-800` | #6a3216 |
| `business-400` | #cf8c6b |     | `business-900` | #4e3224 |

## Spacing Scale

Use with `p-{token}`, `m-{token}`, `gap-{token}`, `w-{token}`, `h-{token}`, etc.

| Token    | Value |     | Token  | Value |
| -------- | ----- | --- | ------ | ----- |
| `none`   | 0px   |     | `8xl`  | 32px  |
| `px`     | 1px   |     | `9xl`  | 36px  |
| `xxs`    | 2px   |     | `10xl` | 40px  |
| `xs`     | 4px   |     | `11xl` | 44px  |
| `s`      | 6px   |     | `12xl` | 48px  |
| `m-base` | 8px   |     | `14xl` | 56px  |
| `l`      | 10px  |     | `15xl` | 60px  |
| `xl`     | 12px  |     | `16xl` | 64px  |
| `2xl`    | 14px  |     | `20xl` | 80px  |
| `4xl`    | 16px  |     | `24xl` | 96px  |
| `5xl`    | 20px  |     | `32xl` | 128px |
| `6xl`    | 24px  |     | `40xl` | 160px |
| `7xl`    | 28px  |     | `96xl` | 384px |

## Border Radius

Use with `rounded-{token}`.

| Token    | Value |
| -------- | ----- |
| `none`   | 0px   |
| `xxs`    | 2px   |
| `xs`     | 4px   |
| `s`      | 6px   |
| `m-base` | 8px   |
| `l`      | 12px  |
| `xl`     | 16px  |
| `2xl`    | 20px  |
| `3xl`    | 24px  |
| `4xl`    | 32px  |
| `full`   | 999px |

## Box Shadows

Use with `shadow-{token}`.

### Elevated Shadows (Effect 1)

| Token                       | Usage                 |
| --------------------------- | --------------------- |
| `1-default-xs`              | Subtle card shadow    |
| `1-default-sm`              | Light card shadow     |
| `1-default-base`            | Default card shadow   |
| `1-default-lg`              | Prominent card shadow |
| `1-default-xl`              | Heavy card shadow     |
| `1-hover-xs` … `1-hover-xl` | Hover state variants  |

### Blur Shadows (Effect 2)

| Token                       | Usage                |
| --------------------------- | -------------------- |
| `2-default-xs`              | Subtle glow          |
| `2-default-sm`              | Light glow           |
| `2-default-base`            | Default glow         |
| `2-default-lg`              | Prominent glow       |
| `2-default-xl`              | Heavy glow           |
| `2-hover-xs` … `2-hover-xl` | Hover state variants |

### Focus Rings

| Token             | Usage                      |
| ----------------- | -------------------------- |
| `primary-focus`   | Primary button/input focus |
| `secondary-focus` | Secondary element focus    |
| `info-focus`      | Info element focus         |
| `neutral-focus`   | Neutral element focus      |

## Breakpoints

Use with responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`.

| Token | Value  | Description          |
| ----- | ------ | -------------------- |
| `xs`  | 0px    | Mobile (default)     |
| `sm`  | 600px  | Small tablet         |
| `md`  | 905px  | Tablet/small desktop |
| `lg`  | 1248px | Desktop              |
| `xl`  | 1440px | Large desktop        |

## Typography

Font family: **Geologica** (used for all text styles).

### Utility Classes

| Class               | Size                           | Weight   | Usage             |
| ------------------- | ------------------------------ | -------- | ----------------- |
| `.title-display-lg` | 96px (desktop) / 60px (mobile) | Bold     | Hero headlines    |
| `.title-display-md` | 72px / 48px                    | Bold     | Section headlines |
| `.title-h1`         | 60px / 36px                    | Semibold | Page titles       |
| `.title-h2`         | 48px / 30px                    | Semibold | Section titles    |
| `.title-h3`         | 36px / 24px                    | Semibold | Subsection titles |
| `.title-h4`         | 30px / 20px                    | Semibold | Card titles       |
| `.title-h5`         | 24px / 18px                    | Semibold | Small titles      |
| `.title-h6`         | 20px / 16px                    | Semibold | Smallest title    |
| `.body-2xl`         | 24px / 18px                    | Regular  | Large body text   |
| `.body-xl`          | 20px / 16px                    | Regular  | Large body        |
| `.body-lg`          | 18px / 16px                    | Regular  | Large body        |
| `.body-base`        | 16px / 14px                    | Regular  | Default body      |
| `.body-sm`          | 14px / 14px                    | Regular  | Small body        |
| `.body-xs`          | 12px / 12px                    | Regular  | Extra small body  |
| `.body-2xs`         | 11px / 11px                    | Regular  | Tiny text         |
| `.label-lg`         | 16px                           | Medium   | Large label       |
| `.label-base`       | 14px                           | Medium   | Default label     |
| `.label-sm`         | 12px                           | Medium   | Small label       |

### Font Weights

| Token       | Value |
| ----------- | ----- |
| `light`     | 200   |
| `regular`   | 300   |
| `medium`    | 400   |
| `semibold`  | 500   |
| `bold`      | 600   |
| `extrabold` | 700   |
| `black`     | 800   |
