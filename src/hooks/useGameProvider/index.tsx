import React, {createContext, useContext, useMemo, useReducer, } from "react";
import { gameReducer } from "../useReducer";
import { Action, State, WordleContext, GameProviderProps } from "../../types";

export const initialBoard = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => ''));

const GameContext = createContext<WordleContext | undefined>(undefined);

export const initialState= {
    gameBoard: [...initialBoard],
    gameOver: false,
    guessWord: false,
    currentAttempt: 0,
    letterPosition: 0,
    todaysWord: '',
}

function GameProvider({children}: GameProviderProps): JSX.Element {
    const [state, dispatch] = useReducer<(state: State, action: Action) => State>(gameReducer, initialState);
    const value: WordleContext = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

function useGameProvider(): WordleContext {
    const context: WordleContext | undefined = useContext(GameContext);

    if (context === undefined) {
        throw new Error('useGameProvider must be used within a GameProvider');
    }

    return context;
}

export { GameProvider, useGameProvider }
