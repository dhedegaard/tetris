# CLAUDE.md

Tetris in the browser (https://tetris.dhedegaard.dk): Next.js 16 App Router as a static export (`output: 'export'`), React 19 with the React Compiler, Redux Toolkit, Tailwind v4 + CSS modules.

## Commands

- `npm run dev` / `npm run build` (static export to `out/`) / `npm run start`
- `npm run lint` — ESLint (`eslint-config-next` + `typescript-eslint`)

No tests and no typecheck script; `npm run build` type-checks. CI (`.github/workflows/nodejs.yml`) runs `npm ci`, `lint`, `build`. Vercel deploys on push to `main`.

## Architecture

- `src/app/page.tsx` → `src/App.tsx` → `src/Game.tsx` (wraps the board in the Redux `Provider`).
- **State:** one store (`src/store/tetris.ts`) of slices in `src/store/slices/` (`gamestate`, `position`, `shape`, `score`, `direction`, `level`, `blocks`). Use the typed `useTetrisDispatch`/`useTetrisSelector`.
- **Game logic** lives in thunks in `src/store/actions/game.ts`: `startNewGame`, `attemptToDoMove` (collision-checked move/rotate), `moveGoToBottom` (hard drop), and `runTicks` — an async `requestAnimationFrame` loop that calls `doTick` at the level's `selectTickrate`. Landing persists the shape's blocks, clears filled rows and scores using the level from *before* the clear.
- **Shapes:** `src/components/shapes/` — one component per tetromino plus `calculateCoordinates`/`nextDirection`/`colorFromShape` in `index.tsx`.
- **Input:** `src/hooks/useKeyboard.ts` (arrows, space = hard drop, `r` = new game; rAF-driven key repeat, 400 ms then 75 ms) and `useGamepad.ts`; `DPad` for touch. Hooks read the live gamestate through a ref.
- `useBottomShape` computes the ghost-piece offset. `Music` is a hidden autoplaying YouTube iframe.

## Conventions

- TypeScript extends `@tsconfig/strictest`; exhaustive switches end in `assertNever` (`src/lib/assert-never.ts`).
- Components are `memo(function Name() { … })`.
- Prettier: no semicolons, single quotes, width 100, `es5` trailing commas, Tailwind class sorting.
