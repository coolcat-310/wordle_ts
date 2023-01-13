import React, {createContext, ReactNode, useContext, useMemo, useReducer, } from "react";

export const initialBoard = [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""]
];

enum ActionKind {
    RESET_GAME = 'RESET_GAME',
    ON_CLICK = 'ON_CLICK',
    WORDS_SET = 'WORDS_SET',
    APPEND_DISABLE_LIST = 'APPEND_DISABLE_LIST',
}

type Payload = {
    keyVal?: string
};

type State = {
    gameBoard: string[][],
    gameOver: boolean,
    guessWord: boolean,
    currentAttempt: number,
    letterPosition: number,
    keyVal?: string
};

type Action = { type: ActionKind; payload: Payload };

type Dispatch = (action: Action) => void;





function gameReducer(state: State, action: Action) {


    switch(action.type) {
        case ActionKind.WORDS_SET: {
            return {...state}
        }

        case ActionKind.ON_CLICK: {
            if ( state.letterPosition > 4) return {...state};

            if (!action.payload.keyVal) return {...state}

            const newBoard = [...state.gameBoard];
            newBoard[state.currentAttempt][state.letterPosition] = action.payload.keyVal;
            return {
                ...state,
                letterPosition: state.letterPosition + 1,
                gameBoard: [...newBoard]
            }
        }

        default: {
            throw new Error(`Unhandled action type ${action.type}`);
        }
    }
}

const GameContext = createContext<{state: State, dispatch: Dispatch} | undefined>(undefined);

type GameProviderProps = { children: ReactNode };

export const initialState = {
    gameBoard: [...initialBoard],
    gameOver: false,
    guessWord: false,
    currentAttempt: 0,
    letterPosition: 0,
}

function GameProvider({children}: GameProviderProps){
    const [state, dispatch] = useReducer(gameReducer, initialState);
    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

function useGameProvider() {
    const context = useContext(GameContext);

    if (context === undefined) {
        throw new Error('useGameProvider must be used within a GameProvider');
    }

    return context;
}

export {ActionKind, GameProvider, useGameProvider}
