---
'@takeoff-ui/core': patch
---

Fix Editor swallowing the first user edit after an external value update by
emitting Tiptap's update event on programmatic `setContent`.
