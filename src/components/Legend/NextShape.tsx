import React from "react";
import styled from "@emotion/styled";
import { Direction, Shape, Shapes } from "../shapes";

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
  nextShapes: Shapes[];
}

const NextShape: React.FunctionComponent<Props> = ({ nextShapes }) => (
  <Container>
    <Title>Next:</Title>
    {nextShapes
      .slice()
      .reverse()
      .map((shape, idx) => (
        <ShapeContainer width={4 * 20} height={3 * 20} key={shape + idx}>
          <Shape direction={Direction.RIGHT} shape={shape} x={1} y={1} />
        </ShapeContainer>
      ))}
  </Container>
);

export default NextShape;
