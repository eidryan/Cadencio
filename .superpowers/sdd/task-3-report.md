# Task 3 Report

## Scope

Implemented the shared guide and demo presentation components under `components/guides/*`:

- `JsonLdScript.tsx`
- `Breadcrumbs.tsx`
- `TrialCtaBand.tsx`
- `VideoDemoPanel.tsx`
- `GuideCard.tsx`
- `DemoCard.tsx`

Also updated `tasks/todo.md` to record Task 3 progress and verification.

## Verification

- `npm run lint` failed in this checkout with:
  `ESLint output (JSON parse failed: EOF while parsing a value at line 1 column 0)`
- Focused TypeScript check for the new Task 3 files passed:
  `npx tsc --noEmit --pretty false -p /private/tmp/cadencio-task3-tsconfig.json`
- A full repo TypeScript check is still blocked by a pre-existing unrelated error in `components/scroll-birds.tsx`.

## Notes

- The demo fallback explicitly says `Demo em produção` when `demo.videoUrl` is `null`.
- The implementation uses `demo.durationLabel` throughout, not the old duration field.
- Visitor-facing copy in the new components is Brazilian Portuguese.

## Concerns

- The repository-level TypeScript check currently reports an unrelated error outside `components/guides/*`, so only the isolated Task 3 compile is green.
