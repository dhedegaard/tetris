import { afterEach, describe, expect, it, vi } from 'vitest'
import { SHAPES } from '../../components/shapes'
import { createGame, rowWithGaps } from './game.test-driver'

const ALL_SHAPES = [...SHAPES]

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

describe('moving the current shape', () => {
  it('moves left and right by one column', () => {
    const game = createGame({ queue: ['O', 'I', 'T'] })
    game.move('LEFT')
    expect(game.snapshot().position).toEqual({ x: 3, y: 1 })
    game.move('RIGHT')
    game.move('RIGHT')
    expect(game.snapshot().position).toEqual({ x: 5, y: 1 })
  })

  it('does not move through the left or right wall', () => {
    const left = createGame({ queue: ['O', 'I'], position: { x: 0, y: 1 } })
    left.move('LEFT')
    expect(left.snapshot().position).toEqual({ x: 0, y: 1 })

    // O covers x and x + 1, so x = 8 touches the right wall.
    const right = createGame({ queue: ['O', 'I'], position: { x: 8, y: 1 } })
    right.move('RIGHT')
    expect(right.snapshot().position).toEqual({ x: 8, y: 1 })
  })

  it('does not move into an existing block', () => {
    const game = createGame({ queue: ['O', 'I'], blocks: [{ x: 3, y: 2, color: 'gray' }] })
    game.move('LEFT')
    expect(game.snapshot().position).toEqual({ x: 4, y: 1 })
  })

  it('rotates clockwise', () => {
    const game = createGame({ queue: ['I', 'O'] })
    game.move('ROTATE')
    expect(game.snapshot().direction).toBe('DOWN')
    game.move('ROTATE')
    expect(game.snapshot().direction).toBe('LEFT')
  })

  it('does not rotate into an existing block', () => {
    // A vertical I at (4, 1) would cover (4, 0) to (4, 3).
    const game = createGame({ queue: ['I', 'O'], blocks: [{ x: 4, y: 3, color: 'gray' }] })
    game.move('ROTATE')
    expect(game.snapshot().direction).toBe('RIGHT')
  })

  it('moves down one row without landing', () => {
    const game = createGame({ queue: ['O', 'I'] })
    game.move('DOWN')
    expect(game.snapshot().position).toEqual({ x: 4, y: 2 })
    expect(game.snapshot().blocks).toEqual([])
  })

  it('does nothing when pressing down while resting on the floor', () => {
    const game = createGame({ queue: ['O', 'I'], position: { x: 4, y: 18 } })
    game.move('DOWN')
    expect(game.snapshot().position).toEqual({ x: 4, y: 18 })
    expect(game.snapshot().blocks).toEqual([])
    expect(game.snapshot().currentShape).toBe('O')
  })

  it('ignores moves after game over', () => {
    const game = createGame({ queue: ['I', 'O'], gamestate: 'gameover' })
    game.move('LEFT')
    game.move('DOWN')
    game.move('ROTATE')
    game.dropToBottom()
    const snapshot = game.snapshot()
    expect(snapshot.position).toEqual({ x: 4, y: 1 })
    expect(snapshot.direction).toBe('RIGHT')
    expect(snapshot.blocks).toEqual([])
  })
})

describe('landing a shape', () => {
  it('drops to the floor and persists its blocks in its color', () => {
    const game = createGame({ queue: ['O', 'I', 'T'] })
    game.dropToBottom()
    expect(game.snapshot().blocks).toEqual([
      { x: 4, y: 18, color: 'yellow' },
      { x: 5, y: 18, color: 'yellow' },
      { x: 4, y: 19, color: 'yellow' },
      { x: 5, y: 19, color: 'yellow' },
    ])
  })

  it('lands on top of existing blocks', () => {
    const game = createGame({ queue: ['O', 'I'], blocks: [{ x: 5, y: 10, color: 'gray' }] })
    game.dropToBottom()
    expect(game.snapshot().blocks).toEqual([
      { x: 4, y: 8, color: 'yellow' },
      { x: 5, y: 8, color: 'yellow' },
      { x: 4, y: 9, color: 'yellow' },
      { x: 5, y: 9, color: 'yellow' },
      { x: 5, y: 10, color: 'gray' },
    ])
  })

  it('advances to the next shape and resets position and direction', () => {
    const game = createGame({ queue: ['I', 'T', 'O', 'S', 'Z', 'J', 'L'] })
    game.move('ROTATE')
    game.move('LEFT')
    game.dropToBottom()
    const snapshot = game.snapshot()
    expect(snapshot.currentShape).toBe('T')
    expect(snapshot.peekShapes).toEqual(['O', 'S'])
    expect(snapshot.position).toEqual({ x: 4, y: 1 })
    expect(snapshot.direction).toBe('RIGHT')
    expect(snapshot.score).toBe(0)
  })
})

describe('clearing rows and scoring', () => {
  it('clears one row, shifts the blocks above down and scores 40', () => {
    const game = createGame({
      queue: ['O', 'I'],
      blocks: [...rowWithGaps(19, [4, 5]), { x: 0, y: 17, color: 'red' }],
    })
    game.dropToBottom()
    const snapshot = game.snapshot()
    expect(snapshot.blocks).toEqual([
      { x: 0, y: 18, color: 'red' },
      { x: 4, y: 19, color: 'yellow' },
      { x: 5, y: 19, color: 'yellow' },
    ])
    expect(snapshot.score).toBe(40)
  })

  it('scores 100 for two rows', () => {
    const game = createGame({
      queue: ['O', 'I'],
      blocks: [...rowWithGaps(18, [4, 5]), ...rowWithGaps(19, [4, 5])],
    })
    game.dropToBottom()
    expect(game.snapshot().blocks).toEqual([])
    expect(game.snapshot().score).toBe(100)
  })

  it('scores 300 for three rows', () => {
    // A vertical I lands covering rows 16-19; row 16 is not full.
    const game = createGame({
      queue: ['I', 'O'],
      blocks: [...rowWithGaps(17, [4]), ...rowWithGaps(18, [4]), ...rowWithGaps(19, [4])],
    })
    game.move('ROTATE')
    game.dropToBottom()
    expect(game.snapshot().blocks).toEqual([{ x: 4, y: 19, color: 'cyan' }])
    expect(game.snapshot().score).toBe(300)
  })

  it('scores 1200 for four rows', () => {
    const game = createGame({
      queue: ['I', 'O'],
      blocks: [16, 17, 18, 19].flatMap((y) => rowWithGaps(y, [4])),
    })
    game.move('ROTATE')
    game.dropToBottom()
    expect(game.snapshot().blocks).toEqual([])
    expect(game.snapshot().score).toBe(1200)
  })

  it('multiplies the score by level + 1', () => {
    const game = createGame({ queue: ['O', 'I'], rowsCleared: 20, blocks: rowWithGaps(19, [4, 5]) })
    game.dropToBottom()
    expect(game.snapshot().score).toBe(120)
  })

  it('adds to the existing score', () => {
    const game = createGame({ queue: ['O', 'I'], score: 1000, blocks: rowWithGaps(19, [4, 5]) })
    game.dropToBottom()
    expect(game.snapshot().score).toBe(1040)
  })

  it('scores with the level from before the clear', () => {
    // 9 rows cleared is level 0; the clear takes it to level 1.
    const game = createGame({ queue: ['O', 'I'], rowsCleared: 9, blocks: rowWithGaps(19, [4, 5]) })
    game.dropToBottom()
    expect(game.snapshot().score).toBe(40)
    expect(game.snapshot().level).toBe(1)
  })

  it('levels up after every 10 cleared rows', () => {
    const game = createGame({
      queue: ['I', 'O'],
      rowsCleared: 8,
      blocks: [16, 17, 18, 19].flatMap((y) => rowWithGaps(y, [4])),
    })
    game.move('ROTATE')
    game.dropToBottom()
    expect(game.snapshot().level).toBe(1)
    expect(game.snapshot().score).toBe(1200)
  })
})

describe('game over', () => {
  // The next O spawns at (4, 1)-(5, 2), so a block at (5, 2) blocks it.
  const blockedSpawn = () =>
    createGame({
      queue: ['O', 'O', 'I'],
      position: { x: 0, y: 1 },
      blocks: [{ x: 5, y: 2, color: 'gray' }],
    })

  it('ends the game when the next shape cannot spawn', () => {
    const game = blockedSpawn()
    game.dropToBottom()
    expect(game.snapshot().gamestate).toBe('gameover')
  })

  it('draws the blocked next shape over the existing blocks', () => {
    const game = blockedSpawn()
    game.dropToBottom()
    expect(game.snapshot().blocks).toEqual([
      { x: 4, y: 1, color: 'yellow' },
      { x: 5, y: 1, color: 'yellow' },
      { x: 4, y: 2, color: 'yellow' },
      { x: 5, y: 2, color: 'yellow' },
      { x: 0, y: 18, color: 'yellow' },
      { x: 1, y: 18, color: 'yellow' },
      { x: 0, y: 19, color: 'yellow' },
      { x: 1, y: 19, color: 'yellow' },
    ])
  })

  it('starts a new game with a cleared board and a shuffled queue', () => {
    const game = createGame({
      queue: ['O', 'I'],
      gamestate: 'gameover',
      score: 500,
      rowsCleared: 25,
      position: { x: 2, y: 7 },
      direction: 'LEFT',
      blocks: rowWithGaps(19, [0]),
    })
    game.startNewGame()
    const snapshot = game.snapshot()
    expect(snapshot.gamestate).toBe('alive')
    expect(snapshot.blocks).toEqual([])
    expect(snapshot.score).toBe(0)
    expect(snapshot.level).toBe(0)
    expect(snapshot.position).toEqual({ x: 4, y: 1 })
    expect(snapshot.direction).toBe('RIGHT')
    expect([...snapshot.queue].sort()).toEqual(ALL_SHAPES)
    expect(snapshot.isShapeQueueReady).toBe(true)
  })
})

describe('shape queue', () => {
  it('starts with a fixed queue so the static HTML matches the first render', () => {
    const game = createGame({ isShapeQueueReady: false })
    expect(game.snapshot().queue).toEqual(ALL_SHAPES)
    expect(game.snapshot().isShapeQueueReady).toBe(false)
  })

  it('shuffles the initial queue once on the client', () => {
    const game = createGame({ isShapeQueueReady: false })
    game.randomizeInitialQueue()
    const first = game.snapshot()
    expect(first.isShapeQueueReady).toBe(true)
    expect([...first.queue].sort()).toEqual(ALL_SHAPES)

    // A second shuffle would create new shapes with new keys.
    game.randomizeInitialQueue()
    expect(game.snapshot().queueKeys).toEqual(first.queueKeys)
  })

  it('refills with all seven shapes when fewer than seven are queued', () => {
    const game = createGame({ queue: ['O', 'I'] })
    game.dropToBottom()
    const { queue } = game.snapshot()
    expect(queue).toHaveLength(8)
    expect(queue[0]).toBe('I')
    expect([...queue.slice(1)].sort()).toEqual(ALL_SHAPES)
  })

  it('does not refill while seven or more shapes are queued', () => {
    const game = createGame({ queue: ['O', 'I', 'T', 'S', 'Z', 'J', 'L'] })
    game.dropToBottom()
    expect(game.snapshot().queue).toEqual(['I', 'T', 'S', 'Z', 'J', 'L'])
  })
})

describe('level and tick rate', () => {
  it.each([
    { rowsCleared: 0, level: 0, tickrate: 800 },
    { rowsCleared: 9, level: 0, tickrate: 800 },
    { rowsCleared: 10, level: 1, tickrate: 720 },
    { rowsCleared: 99, level: 9, tickrate: 100 },
    { rowsCleared: 110, level: 11, tickrate: 80 },
    { rowsCleared: 150, level: 15, tickrate: 70 },
    { rowsCleared: 300, level: 30, tickrate: 20 },
  ])('$rowsCleared cleared rows is level $level at $tickrate ms', (row) => {
    const snapshot = createGame({ queue: ['O'], rowsCleared: row.rowsCleared }).snapshot()
    expect(snapshot.level).toBe(row.level)
    expect(snapshot.tickrate).toBeCloseTo(row.tickrate)
  })
})

describe('tick loop', () => {
  // Node has no requestAnimationFrame, so emulate 60 fps frames on fake timers.
  const fakeTime = () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] })
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) =>
      setTimeout(() => {
        callback(Date.now())
      }, 16)
    )
  }

  it('moves the shape down once per tick at level 0', async () => {
    fakeTime()
    const game = createGame({ queue: ['O', 'I'] })
    const cancel = game.runTicks()
    await vi.advanceTimersByTimeAsync(780)
    expect(game.snapshot().position.y).toBe(1)
    await vi.advanceTimersByTimeAsync(40)
    expect(game.snapshot().position.y).toBe(2)
    await vi.advanceTimersByTimeAsync(800)
    expect(game.snapshot().position.y).toBe(3)
    cancel()
  })

  it('ticks faster at higher levels', async () => {
    fakeTime()
    const game = createGame({ queue: ['O', 'I'], rowsCleared: 50 })
    const cancel = game.runTicks()
    // Level 5 ticks every 380 ms.
    await vi.advanceTimersByTimeAsync(400)
    expect(game.snapshot().position.y).toBe(2)
    cancel()
  })

  it('lands the shape when a tick cannot move it down', async () => {
    fakeTime()
    const game = createGame({ queue: ['O', 'I'], position: { x: 4, y: 18 } })
    const cancel = game.runTicks()
    await vi.advanceTimersByTimeAsync(820)
    expect(game.snapshot().blocks).toHaveLength(4)
    expect(game.snapshot().currentShape).toBe('I')
    cancel()
  })

  it('restarts the tick timer after a manual move down', async () => {
    fakeTime()
    const game = createGame({ queue: ['O', 'I'] })
    const cancel = game.runTicks()
    await vi.advanceTimersByTimeAsync(500)
    game.move('DOWN')
    // 500 ms later is 1000 ms since start, but only 500 ms since the move.
    await vi.advanceTimersByTimeAsync(500)
    expect(game.snapshot().position.y).toBe(2)
    await vi.advanceTimersByTimeAsync(350)
    expect(game.snapshot().position.y).toBe(3)
    cancel()
  })

  it('stops ticking once cancelled', async () => {
    fakeTime()
    const game = createGame({ queue: ['O', 'I'] })
    const cancel = game.runTicks()
    cancel()
    await vi.advanceTimersByTimeAsync(2000)
    expect(game.snapshot().position.y).toBe(1)
  })
})
