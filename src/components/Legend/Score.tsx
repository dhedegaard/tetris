import React from 'react'
import styled from 'styled-components'

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

const Text = styled.div`
  padding-top: 4px;
  color: #fff;
  text-transform: uppercase;
`

interface Props {
  score: number
}
const Score: React.FunctionComponent<Props> = ({ score }) => (
  <Container>
    <Title>Score:</Title>
    <Text>
      {Math.min(score, 9999999999)
        .toString()
        .padStart(10, '0')}
    </Text>
  </Container>
)

export default Score
