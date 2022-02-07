import React, { memo } from "react";
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
  level: number;
}
const Level: React.FunctionComponent<Props> = ({ level }) => (
  <Container>
    <Title>Level:</Title>
    <Text>{Math.min(level, 99).toString().padStart(2, "0")}</Text>
  </Container>
);

export default memo(Level);
