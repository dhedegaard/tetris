import { FC, memo } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  border: 1px double #fff;
  border-radius: 5px;
  border-top-left-radius: 2px;
  border-bottom-right-radius: 2px;
  padding: 8px;
`;

const Title = styled.div`
  color: #fff;
  border-bottom: 1px solid #fff;
  margin-bottom: 5px;
  text-transform: uppercase;
  padding-bottom: 5px;
`;

const Text = styled.div`
  padding-top: 4px;
  color: #fff;
  text-transform: uppercase;
  text-align: right;
`;

interface Props {
  score: number;
}
const Score: FC<Props> = ({ score }) => (
  <Container>
    <Title>Score:</Title>
    <Text>{Math.min(score, 99999999).toString().padStart(8, "0")}</Text>
  </Container>
);

export default memo(Score);
