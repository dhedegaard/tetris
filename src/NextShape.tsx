import React from 'react'
import styled from 'styled-components'
import { Direction, Shape, Shapes } from './components/shapes'

const Container = styled.div`
  border: 1px double #fff;
  border-radius: 5px;
  border-top-left-radius: 2px;
  border-bottom-right-radius: 2px;
  padding: 8px;
`

const Title = styled.div`
  color: #fff;
  border-bottom: 1px solid #fff;
  margin-bottom: 5px;
  text-transform: uppercase;
  padding-bottom: 5px;
`

interface Props {
  nextShape: Shapes
}

const NextShape: React.FunctionComponent<Props> = ({ nextShape }) => (
  <Container>
    <Title>Next:</Title>
    <svg width={4 * 20} height={3 * 20}>
      <Shape direction={Direction.RIGHT} shape={nextShape} x={1} y={1} />
    </svg>
  </Container>
)

export default NextShape
