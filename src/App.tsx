import { FC, useState } from "react";
import styles from "./App.module.css";
import Game from "./Game";
import GlobalPanel from "./GlobalPanel";
import Music from "./components/Music";
import { font } from "./font";

const App: FC = () => {
  const [musicEnabled, setMusicEnabled] = useState(false);

  return (
    <>
      {musicEnabled && <Music />}
      <main
        className={`${font.variable} ${styles["main"]} box-border flex h-auto justify-center items-stretch aspect-[1.11] mx-auto bg-[purple] border-[4px] border-solid border-[purple] gap-[4px] max-sm:aspect-[0.82] max-h-[calc(100vh-8px)]`}
      >
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
