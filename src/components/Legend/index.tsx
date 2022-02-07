import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { Shapes } from "../shapes";
import Level from "./Level";
import NextShape from "./NextShape";
import Score from "./Score";

const LegendContainer = styled.div`
  background-color: #000;
  border: 3px solid purple;
  border-left: none;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  align-self: normal;
  justify-content: space-between;
`;

interface Props {
  score: number;
  level: number;
  peekShapes: Shapes[];
}

const Legend: React.FunctionComponent<Props> = ({
  score,
  level,
  peekShapes,
}) => {
  const nextShapes = useMemo(
    () => peekShapes.slice(peekShapes.length - 2),
    [peekShapes]
  );
  return (
    <LegendContainer>
      <div>
        <Score score={score} />
        <Level level={level} />
      </div>
      <NextShape nextShapes={nextShapes} />
    </LegendContainer>
  );
};

export default Legend;
