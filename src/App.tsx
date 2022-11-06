import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import { parse } from "bowser";
import { FC, useEffect, useState } from "react";
import Music from "./components/Music";
import { font } from "./font";
import Game from "./Game";
import GlobalPanel from "./GlobalPanel";

const GlobalStyle: FC = () => (
  <Global
    styles={css`
      html {
        height: -webkit-fill-available;
      }
      html * {
        font-family: ${font.style.fontFamily} !important;
        ${font.style.fontStyle != null &&
        `font-style: ${font.style.fontStyle};`}
        ${font.style.fontWeight != null &&
        `font-weight: ${font.style.fontWeight};`}
      }
      body {
        margin: 0;
        user-select: none;
        background-color: rgb(34, 34, 34);
        height: 100vh;
        height: -webkit-fill-available;
        box-sizing: border-box;
      }
    `}
  />
);

const Container = styled.main<{ $isSafari: boolean }>`
  box-sizing: border-box;
  display: flex;
  height: auto;
  /* Subtract a bit due to macos safari. */
  max-height: calc(100vh - 8px);
  /* Fix for another height issue in safari on ios. */
  ${({ $isSafari }) =>
    $isSafari &&
    css`
      max-height: -webkit-fill-available;
    `}
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

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    const browser = parse(window.navigator.userAgent);
    if (browser?.browser.name === "Safari") {
      setIsSafari(true);
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      {musicEnabled && <Music />}
      <Container $isSafari={isSafari}>
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
