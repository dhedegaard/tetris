import React from 'react'
import styled from 'styled-components'
import { Shapes } from '../shapes'
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
  peekShapes: Shapes[]
}

const Legend: React.FunctionComponent<Props> = ({ score, peekShapes }) => (
  <LegendContainer>
    <Score score={score} />
    <NextShape nextShape={peekShapes[peekShapes.length - 1]} />
  </LegendContainer>
)

export default Legend
