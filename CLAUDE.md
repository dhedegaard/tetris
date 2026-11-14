# CLAUDE.md

Tetris in the browser (https://tetris.dhedegaard.dk): Next.js 16 App Router as a static export (`output: 'export'`), React 19 with the React Compiler, Zustand, Tailwind v4 + CSS modules.

`npm test` runs Vitest. There's no typecheck script; `npm run build` type-checks. Vercel deploys on push to `main`.

Bundle size: `npx next analyze --output --snapshot <name>`, then `npx next analyze export --snapshot <name> | gzip > …`. In the 2026-11-14 audit, Next + React were ~206 KB of the ~245 KB compressed client output on `/`. `src/App.tsx` is the only client entry and everything under it renders on first paint, so lazy-splitting the app (~14 KB) isn't worth it.

Tests live in a `__tests__` directory below the module they test, named `*.test.ts(x)`; test-only helpers there are `*.test-<role>.ts` (e.g. `game.test-driver.ts`), so Vitest doesn't run them as tests.

Game-logic tests go through `src/store/__tests__/game.test-driver.ts`, the only test code that knows the store's shape — keep it that way so the tests outlive a state-library change.

Gamepad (`useGamepad`) and the touch D-pad (`DPad`, touch screens only) have no automated coverage; check them by hand on the Vercel preview when changing input code.

## Gotchas

- Landing a piece scores using the level from *before* the line clear.
- `useTetrisStore` selectors must return stored references or primitives. A selector that builds a new array or object causes an infinite render loop, so derive in `useMemo` instead.
- The shape queue starts in a fixed order so the static HTML matches the first render; `randomizeInitialQueue` shuffles it once on mount. Don't randomize at store creation.
- `fast-shuffle` reads the global `Math.random` on each call, so `vi.spyOn(Math, 'random')` controls the shape queue order in tests.

## Conventions

- Exhaustive switches end in `assertNever` (`src/lib/assert-never.ts`).
- Components are `memo<Props>(function Name(props) { … })` (named function, typed via memo's generic).
