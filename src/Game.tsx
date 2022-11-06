import styled from "@emotion/styled";
import { FC } from "react";
import { Provider } from "react-redux";
import Block from "./components/Block";
import Bounds from "./components/Bounds";
import Grid from "./components/Grid";
import Legend from "./components/Legend";
import { Shape } from "./components/shapes";
import GameOver from "./GameOver";
import useTetris from "./hooks";
import { useIsBrowser } from "./hooks/useIsBrowser";
import tetrisStore from "./store/tetris";

const Container = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  box-sizing: border-box;
  gap: 4px;
  background-color: purple;
`;

const GridContainer = styled.div`
  box-sizing: border-box;
  aspect-ratio: 1 / 2;
  flex: none;
  height: 100%;
`;

const Game: FC = () => {
  const isBrowser = useIsBrowser();

  const {
    direction,
    shape,
    position,
    blocks,
    gamestate,
    score,
    peekShapes,
    level,
    swipeableHandler,
    startNewGame,
    shapeBounds,
  } = useTetris();

  return (
    <Container {...swipeableHandler}>
      <GridContainer>
        <Grid>
          {isBrowser && gamestate === "alive" && (
            <>
              <Shape
                direction={direction}
                shape={shape}
                x={position.x}
                y={position.y}
              />
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
            <Block x={x} y={y} fill={color} key={`block_${x}_${y}`} />
          ))}
          {gamestate === "gameover" && <GameOver onClick={startNewGame} />}
        </Grid>
      </GridContainer>
      <Legend score={score} peekShapes={peekShapes} level={level} />
    </Container>
  );
};

const GameWithStore: FC = () => (
  <Provider store={tetrisStore}>
    <Game />
  </Provider>
);

export default GameWithStore;
