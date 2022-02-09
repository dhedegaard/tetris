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
      }
      html * {
        font-family: "Press Start 2P", cursive !important;
      }
    `}
  />
);

const Container = styled.div<{ $zoom: number }>`
  box-sizing: border-box;
  display: flex;
  max-height: 100vh;
  max-width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: stretch;
  zoom: ${({ $zoom }) => $zoom};
`;

export type GameMode = "single" | "local-coop";

const App: FC = () => {
  const [gameMode, setGameMode] = useState<GameMode>("single");
  const [musicEnabled, setMusicEnabled] = useState(false);

  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => setIsBrowser(true), []);

  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    if (typeof window === "undefined" || containerRef.current == null) {
      return;
    }
    const calculateZoom = () => {
      if (containerRef.current == null) {
        return;
      }
      const heightAspect =
        window.innerHeight / containerRef.current.clientHeight;
      setZoom(heightAspect);
    };
    calculateZoom();
    window.addEventListener("resize", calculateZoom, { passive: true });
    return () => window.removeEventListener("resize", calculateZoom);
  }, []);

  return (
    <>
      <GlobalStyle />
      {musicEnabled && <Music />}
      <Container ref={containerRef} $zoom={zoom} key={gameMode}>
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
