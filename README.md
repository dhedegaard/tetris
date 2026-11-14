# Tetris

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/7f880f2c66de4fdc82bbf65fbed8f4cd)](https://www.codacy.com/gh/dhedegaard/tetris/dashboard?utm_source=github.com&utm_medium=referral&utm_content=dhedegaard/tetris&utm_campaign=Badge_Grade)
[![Node.js CI](https://github.com/dhedegaard/tetris/actions/workflows/nodejs.yml/badge.svg)](https://github.com/dhedegaard/tetris/actions/workflows/nodejs.yml)

Tetris implemented using react and next. Play it at https://tetris.dhedegaard.dk.

## Controls

| Action          | Keyboard | Gamepad                |
| --------------- | -------- | ---------------------- |
| Move left/right | ← / →    | D-pad or left stick    |
| Rotate          | ↑        | D-pad up, stick up, A  |
| Move down       | ↓        | D-pad down, stick down |
| Drop to bottom  | Space    | B                      |
| New game        | R        | A (after game over)    |

Space also starts a new game after game over. On touch screens, an on-screen D-pad and a rotate button appear.

## Development

```sh
npm install
npm run dev    # dev server
npm test       # Vitest
npm run lint
npm run build  # static export to out/, also type-checks
```
