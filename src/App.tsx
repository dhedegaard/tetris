import { css, Global } from "@emotion/react";
import { FC, useState } from "react";
import Music from "./components/Music";
import { font } from "./font";
import Game from "./Game";
import GlobalPanel from "./GlobalPanel";

const GlobalStyle: FC = () => (
  <Global
    styles={css`
      html * {
        font-family: ${font.style.fontFamily} !important;
        ${font.style.fontStyle != null &&
        `font-style: ${font.style.fontStyle};`}
        ${font.style.fontWeight != null &&
        `font-weight: ${font.style.fontWeight};`}
      }
    `}
  />
);

const App: FC = () => {
  const [musicEnabled, setMusicEnabled] = useState(false);

  return (
    <>
      <GlobalStyle />
      {musicEnabled && <Music />}
      <main className="box-border flex h-auto justify-center items-stretch aspect-[1.11] mx-auto bg-[purple] border-[4px] border-solid border-[purple] gap-[4px] max-sm:aspect-[0.82] max-h-[calc(100vh-8px)]">
        <GlobalPanel
          musicEnabled={musicEnabled}
          toggleMusic={(enabled) => setMusicEnabled(enabled)}
        />
        <Game />
      </main>
    </>
  );
};

export default App;
