---
'@takeoff-ui/core': minor
---

Fix and extend the `tk-input` `maskOptions.regex` mask. Typing an invalid
character no longer wipes the field; input is now validated incrementally so
anchored, full-value patterns (e.g. `/^[0-9,]{1,10}$/`), alternation, groups,
and quantifiers all work as the user types, with length limits enforced.
Unsupported syntax (lookarounds, back-references) and invalid patterns safely
disable the mask instead of throwing.
