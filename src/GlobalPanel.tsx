import styled from "@emotion/styled";
import { FC } from "react";

const Panel = styled.div`
  background: #000;
  height: 100%;
  aspect-ratio: 120 / 400;
  border: 4px solid purple;
  box-sizing: border-box;
  border-right-width: 0;
  padding: 8px;
  font-size: 2vh;
  gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 425px) {
    display: none;
  }
`;

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
  cursor: pointer;
`;

const Toggle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 8px;
  gap: 8px;
`;

const H1 = styled.h1`
  color: #fff;
  letter-spacing: 4px;
  text-transform: uppercase;
  text-decoration: underline;
  font-size: 3vh;
  margin: 12px 0;
  max-width: 100%;
  width: 100%;
  text-align: center;
`;

interface Props {
  musicEnabled: boolean;
  toggleMusic: (enabled: boolean) => void;
}

const GlobalPanel: FC<Props> = (props) => (
  <Panel>
    <H1>Tetris</H1>
    <Container>
      <Title>Music:</Title>
      <Toggle>
        <Text onClick={() => props.toggleMusic(true)}>
          {props.musicEnabled ? <>&gt; </> : <>&nbsp; </>}
          On
        </Text>{" "}
        <Text onClick={() => props.toggleMusic(false)}>
          {!props.musicEnabled ? <>&gt; </> : <>&nbsp; </>}
          Off
        </Text>
      </Toggle>
    </Container>
  </Panel>
);

export default GlobalPanel;
