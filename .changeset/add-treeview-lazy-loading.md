---
'@takeoff-ui/core': minor
---

Add lazy loading to `tk-tree-view` via the `lazy` prop. Expanding a branch
without children emits `tk-load`, and `loadingKeys` / `loadedKeys` drive the
spinner and keep a branch from being requested twice. Branches that are not
loaded yet are marked with `hasChildren: true`.
