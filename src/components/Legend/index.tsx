import styled from "@emotion/styled";
import isEqual from "lodash/isEqual";
import { FC, memo } from "react";
import { ShapeElement } from "../shapes";
import Level from "./Level";
import NextShape from "./NextShape";
import Score from "./Score";

const LegendContainer = styled.div`
  background-color: #000;
  border: 3px solid purple;
  border-left: none;
  font-size: 2vh;
  aspect-ratio: 120 / 400;
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
  align-self: normal;
  justify-content: space-between;
  width: 100%;
  overflow-y: auto;
`;

interface Props {
  score: number;
  level: number;
  peekShapes: readonly ShapeElement[];
}

const Legend: FC<Props> = ({ score, level, peekShapes }) => (
  <LegendContainer>
    <ScoreAndLevel>
      <Score score={score} />
      <Level level={level} />
    </ScoreAndLevel>
    <NextShape nextShapes={peekShapes} />
  </LegendContainer>
);

export default memo(Legend, isEqual);

const ScoreAndLevel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: stretch;
`;
