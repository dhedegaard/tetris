import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import { FC, useEffect, useState } from "react";
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
  max-width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: stretch;
  aspect-ratio: 1.13;
`;

const App: FC = () => {
  const [musicEnabled, setMusicEnabled] = useState(false);

  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => setIsBrowser(true), []);

  return (
    <>
      <GlobalStyle />
      {musicEnabled && <Music />}
      <Container>
        <GlobalPanel
          musicEnabled={musicEnabled}
          toggleMusic={(enabled) => setMusicEnabled(enabled)}
        />
        {isBrowser && <Game />}
      </Container>
    </>
  );
};

export default App;
