import React, { FC, useEffect, useState } from "react";
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
      }
      html * {
        font-family: "Press Start 2P", cursive !important;
      }
    `}
  />
);

const Container = styled.div`
  margin-top: 10px;
  display: flex;
  width: 100%;
  height: 80%;
  justify-content: center;
  align-items: stretch;
`;

export type GameMode = "single" | "local-coop";

const App: React.FunctionComponent = () => {
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
