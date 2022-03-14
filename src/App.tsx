import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import { FC, useState } from "react";
import Music from "./components/Music";
import Game from "./Game";
import GlobalPanel from "./GlobalPanel";

const GlobalStyle: FC = () => (
  <Global
    styles={css`
      body {
        margin: 0;
        user-select: none;
        background-color: rgb(34, 34, 34);
        height: 100vh;
        max-height: 100vh;
      }
      html * {
        font-family: "Press Start 2P", cursive !important;
      }
    `}
  />
);

const Container = styled.main`
  box-sizing: border-box;
  display: flex;
  height: auto;
  max-height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: stretch;
  border: 4px solid purple;
  background-color: purple;
  gap: 4px;
  aspect-ratio: 1.11;

  @media (max-width: 425px) {
    aspect-ratio: 0.82;
  }
`;

const App: FC = () => {
  const [musicEnabled, setMusicEnabled] = useState(false);

  return (
    <>
      <GlobalStyle />
      {musicEnabled && <Music />}
      <Container>
        <GlobalPanel
          musicEnabled={musicEnabled}
          toggleMusic={(enabled) => setMusicEnabled(enabled)}
        />
        <Game />
      </Container>
    </>
  );
};

export default App;
