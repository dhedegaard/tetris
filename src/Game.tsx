import styled from "@emotion/styled";
import { FC } from "react";
import { Provider } from "react-redux";
import Block from "./components/Block";
import Grid from "./components/Grid";
import Legend from "./components/Legend";
import { Shape } from "./components/shapes";
import GameOver from "./GameOver";
import useTetris from "./hooks";
import tetrisStore from "./store/tetris";

const Container = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  box-sizing: border-box;
`;

const GridContainer = styled.div`
  border: 4px solid purple;
  box-sizing: border-box;
  width: 100%;
`;

const Game: FC = () => {
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
  } = useTetris();

  return (
    <Container {...swipeableHandler}>
      <GridContainer>
        <Grid>
          {gamestate === "alive" && (
            <Shape
              direction={direction}
              shape={shape}
              x={position.x}
              y={position.y}
            />
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
