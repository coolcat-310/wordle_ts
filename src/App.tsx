import React from 'react';
import './App.css';
import {GameProvider} from "./hooks/useGameProvider";
import {Wordle} from "./components/Wordle";

function App() {
  return (
    <div className="App">
        <GameProvider>
            <Wordle />
        </GameProvider>
    </div>
  );
}

export default App;
