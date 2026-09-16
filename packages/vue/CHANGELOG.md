# @takeoff-ui/vue

## 0.12.0

### Patch Changes

- 5e37b16: Fix Vue `v-model` staying a change behind on components that do not
  write their own prop back (datepicker, rating, dialog, radio). The wrapper now
  reads the emitted `tk-change` detail via the output target's `eventAttr`
  option instead of `event.target[prop]`, restoring the behaviour that the
  removed `update-utils` patch used to provide.
- Updated dependencies [504e92a]
- Updated dependencies [1e7c76d]
- Updated dependencies [60b46db]
- Updated dependencies [e18aade]
- Updated dependencies [0fa1cf1]
- Updated dependencies [8be73fc]
- Updated dependencies [1e2ffe4]
- Updated dependencies [87e363a]
- Updated dependencies [10fe86d]
- Updated dependencies [f02ab84]
- Updated dependencies [d8202aa]
- Updated dependencies [533ea3c]
- Updated dependencies [f6a13c8]
- Updated dependencies [2300cd3]
- Updated dependencies [2ed2a17]
- Updated dependencies [d06799a]
- Updated dependencies [c21818a]
- Updated dependencies [8745db9]
- Updated dependencies [176ac3c]
- Updated dependencies [34e33bc]
- Updated dependencies [83890e2]
- Updated dependencies [40e774a]
- Updated dependencies [a7d61c9]
- Updated dependencies [e9d8093]
- Updated dependencies [c26fad1]
- Updated dependencies [6ef5661]
- Updated dependencies [14738bf]
- Updated dependencies [685920e]
- Updated dependencies [b23bd0c]
- Updated dependencies [2511afe]
- Updated dependencies [8573bc1]
- Updated dependencies [e0e3f07]
- Updated dependencies [5e37b16]
  - @takeoff-ui/core@0.12.0

## 0.11.9

### Patch Changes

- Updated dependencies [75ba2ba]
- Updated dependencies [fa6c5dc]
- Updated dependencies [603c6a5]
  - @takeoff-ui/core@0.11.9

## 0.11.8

### Patch Changes

- Updated dependencies [83e9012]
  - @takeoff-ui/core@0.11.8

## 0.11.7

### Patch Changes

- Updated dependencies [fab25d6]
- Updated dependencies [796a712]
  - @takeoff-ui/core@0.11.7
