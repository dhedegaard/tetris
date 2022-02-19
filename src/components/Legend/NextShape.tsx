import styled from "@emotion/styled";
import isEqual from "lodash/isEqual";
import { FC, memo } from "react";
import { ShapeElement } from "../../hooks/reducer";
import { Direction, Shape } from "../shapes";

const Container = styled.div`
  border: 1px double #fff;
  border-radius: 5px;
  border-top-left-radius: 2px;
  border-bottom-right-radius: 2px;
  padding: 8px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: block;
  color: #fff;
  border-bottom: 1px solid #fff;
  margin-bottom: 5px;
  text-transform: uppercase;
  padding-bottom: 5px;
`;

const ShapeContainer = styled.svg`
  display: block;
  margin: 10px;
`;

interface Props {
  nextShapes: readonly ShapeElement[];
}

const NextShape: FC<Props> = ({ nextShapes }) => (
  <Container>
    <Title>Next:</Title>
    {nextShapes.map((shape) => (
      <ShapeContainer viewBox="0 0 5 3" width="100%" key={shape.key}>
        <Shape direction={Direction.RIGHT} shape={shape} x={1} y={1} />
      </ShapeContainer>
    ))}
  </Container>
);

export default memo(NextShape, isEqual);
