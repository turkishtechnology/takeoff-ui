# @takeoff-ui/react

![Takeoff UI Hero](../../docs/static/img/takeoff-og.jpg)

[![npm version](https://img.shields.io/npm/v/@takeoff-ui/react.svg)](https://www.npmjs.com/package/@takeoff-ui/react)
[![npm downloads](https://img.shields.io/npm/dm/@takeoff-ui/react.svg)](https://www.npmjs.com/package/@takeoff-ui/react)

React bindings for the Takeoff UI Design System. This package provides familiar React components generated from the framework-agnostic web components in `@takeoff-ui/core` (built with Stencil.js), enabling a seamless React developer experience with JSX, types, and familiar event props.

## Documentation

- Full docs: [Introduction](https://takeoff-ui-blond.vercel.app/docs/Introduction)
- Getting started: [Installation Guide](https://takeoff-ui-blond.vercel.app/docs/Installation)
- Component APIs and examples: See the Components section in the docs

## Installation

Install the React bindings. `@takeoff-ui/core` is required at runtime since the React proxies wrap the underlying web components.

```bash
npm install @takeoff-ui/react @takeoff-ui/core
# or
pnpm add @takeoff-ui/react @takeoff-ui/core
# or
yarn add @takeoff-ui/react @takeoff-ui/core
```

## Quick Start

1) Import the global styles from the core package (once at app startup):

```ts
// e.g. src/main.tsx or src/index.tsx
import '@takeoff-ui/core/dist/core/core.css';
```

2) Import and use React components:

```tsx
// App.tsx
import { TkButton, TkInput } from '@takeoff-ui/react';
import { useState } from 'react';

export default function App() {
  const [value, setValue] = useState('');

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <TkButton variant="primary">Click me</TkButton>

      <TkInput
        value={value}
        onTkChange={(ev) => {
          // Stencil events emit CustomEvent with detail payload
          const next = (ev as CustomEvent<any>).detail?.value ?? '';
          setValue(next);
        }}
        placeholder="Type here..."
      />
    </div>
  );
}
```

### Next.js (App Router) note

- Use these components in a client component (the generated wrappers are client-ready).
- Import `@takeoff-ui/core/dist/core/core.css` in your global CSS or root layout.

## Features

- React wrappers for all Takeoff UI components (e.g., `TkButton`, `TkInput`, `TkDialog`, ...)
- Full TypeScript support and JSX props
- Event handlers mapped to React-style props (e.g., `onTkChange`)
- Works with Create React App, Vite, Next.js, and other React setups

## Theming and Tailwind CSS (Optional)

Takeoff UI ships with a Tailwind CSS plugin for tokens and utilities. See the docs for setup and usage details.

- Tailwind plugin: see the Tailwind CSS Plugin section in the docs

## Contributing

We welcome contributions! Please read the guide for details on issues, PRs, and coding standards.
- [Contribution guide](https://takeoff-ui-blond.vercel.app/docs/CONTRIBUTING)

## License

Licensed under the Apache 2.0 License. See the repository root `LICENSE` file.

## Contributors

<a href="https://github.com/turkishtechnology/takeoff-ui/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=turkishtechnology/takeoff-ui" />
</a>
