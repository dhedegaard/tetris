import { FC, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
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
      }
      html * {
        font-family: "Press Start 2P", cursive !important;
      }
    `}
  />
);

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  height: 100vh;
  max-width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: stretch;
`;

export type GameMode = "single" | "local-coop";

const App: FC = () => {
  const [gameMode, setGameMode] = useState<GameMode>("single");
  const [musicEnabled, setMusicEnabled] = useState(false);

  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => setIsBrowser(true), []);

  return (
    <>
      <GlobalStyle />
      {musicEnabled && <Music />}
      <Container key={gameMode}>
        {gameMode === "local-coop" && <Game player="keyboard2" />}
        <GlobalPanel
          musicEnabled={musicEnabled}
          toggleMusic={(enabled) => setMusicEnabled(enabled)}
          gameMode={gameMode}
          setGameMode={(gameMode) => setGameMode(gameMode)}
        />
        {isBrowser && <Game player="keyboard1" />}
      </Container>
    </>
  );
};

export default App;
