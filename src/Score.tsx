import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border: 1px double #fff;
  border-radius: 5px;
  border-top-left-radius: 0;
  border-bottom-right-radius: 0;
  padding: 8px;
`

const Title = styled.div`
  color: #fff;
  border-bottom: 1px solid #fff;
  margin-bottom: 5px;
`

const Text = styled.div`
  color: #fff;
`

interface Props {
  score: number
}
const Score: React.FunctionComponent<Props> = ({ score }) => (
  <Container>
    <Title>Score:</Title>
    <Text>{score.toString().padStart(10, '0')}</Text>
  </Container>
)

export default Score
