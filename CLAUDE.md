# CLAUDE.md

Tetris in the browser (https://tetris.dhedegaard.dk): Next.js 16 App Router as a static export (`output: 'export'`), React 19 with the React Compiler, Redux Toolkit, Tailwind v4 + CSS modules.

No tests and no typecheck script; `npm run build` type-checks. Vercel deploys on push to `main`.

## Gotchas

- Landing a piece scores using the level from *before* the line clear.

## Conventions

- Exhaustive switches end in `assertNever` (`src/lib/assert-never.ts`).
- Components are `memo<Props>(function Name(props) { … })` (named function, typed via memo's generic).
