import React from 'react'
import styled from 'styled-components'
import { Shapes } from '../shapes'
import Level from './Level'
import NextShape from './NextShape'
import Score from './Score'

const LegendContainer = styled.div`
  background-color: #000;
  border: 3px solid purple;
  border-left: none;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  align-self: normal;
  margin-top: 10px;
  justify-content: space-between;
`

interface Props {
  score: number
  level: number
  peekShapes: Shapes[]
}

const Legend: React.FunctionComponent<Props> = ({
  score,
  level,
  peekShapes
}) => (
  <LegendContainer>
    <div>
      <Score score={score} />
      <Level level={level} />
    </div>
    <NextShape nextShapes={peekShapes.slice(peekShapes.length - 2)} />
  </LegendContainer>
)

export default Legend
