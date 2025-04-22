import { memo } from 'react'
import { Provider } from 'react-redux'
import { Block } from './components/Block'
import { Bounds } from './components/Bounds'
import { DPad } from './components/DPad'
import { Grid } from './components/Grid'
import { Legend } from './components/Legend'
import { ShapeRenderer } from './components/shapes'
import { GameOver } from './GameOver'
import { useTetris } from './hooks'
import { useBottomShape } from './hooks/useBottomShape'
import { useIsBrowser } from './hooks/useIsBrowser'
import { tetrisStore } from './store/tetris'

export const Game = memo(function Game() {
  const isBrowser = useIsBrowser()

  const {
    direction,
    shape,
    position,
    blocks,
    gamestate,
    score,
    peekShapes,
    level,
    startNewGame,
    shapeBounds,
  } = useTetris()
  const { bottomYOffset } = useBottomShape()

  return (
    <div className="relative box-border flex h-full gap-[4px] bg-[purple]">
      <DPad />
      <div className="box-border aspect-[1/2] h-full flex-none">
        <Grid>
          {isBrowser && gamestate === 'alive' && (
            <>
              <ShapeRenderer
                direction={direction}
                shape={shape}
                x={position.x}
                y={position.y}
                renderType="normal"
              />
              {bottomYOffset > 0 && (
                <ShapeRenderer
                  direction={direction}
                  shape={shape}
                  x={position.x}
                  y={position.y + bottomYOffset}
                  renderType="ghost"
                />
              )}
              {shapeBounds.leftBottomElement != null && (
                <Bounds
                  x={shapeBounds.leftBottomElement.x}
                  y={shapeBounds.leftBottomElement.y}
                  side="left"
                />
              )}
              {shapeBounds.rightBottomElement != null && (
                <Bounds
                  x={shapeBounds.rightBottomElement.x}
                  y={shapeBounds.rightBottomElement.y}
                  side="right"
                />
              )}
            </>
          )}

          {blocks.map(({ x, y, color }) => (
            <Block x={x} y={y} fill={color} key={`block_${String(x)}_${String(y)}`} />
          ))}
          {gamestate === 'gameover' && <GameOver onClick={startNewGame} />}
        </Grid>
      </div>
      <Legend score={score} peekShapes={peekShapes} level={level} />
    </div>
  )
})

export const GameWithStore = memo(function GameWithStore() {
  return (
    <Provider store={tetrisStore}>
      <Game />
    </Provider>
  )
})
