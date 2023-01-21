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
    keyVal?: string,
    todaysWord?: string,
    wordSet?: string[],
    disabledLetter?: string,
};

type State = {
    gameBoard: string[][],
    gameOver: boolean,
    guessWord: boolean,
    currentAttempt: number,
    letterPosition: number,
    keyVal?: string,
    todaysWord?: string,
    wordSet?: string[],
    disabledSet?: string[]
};

type Action = { type: ActionKind; payload: Payload };

type Dispatch = (action: Action) => void;

function gameReducer(state: State, action: Action) {

    const {disabledSet = []} = state

    switch(action.type) {
        case ActionKind.WORDS_SET: {
            return { ...state, wordSet: action.payload.wordSet, todaysWord: action.payload.todaysWord }
        }

        case ActionKind.ON_CLICK: {
            if(action.payload.keyVal === "ENTER") {
                if(state.letterPosition !== 5) return {...state};

                if(state.currentAttempt === 4) return {...state, gameOver: true}

                const currentWord = state.gameBoard[state.currentAttempt].reduce((a, v) => a + v, '');

                if(currentWord === state.todaysWord) {
                    return {...state, gameOver: true, guessWord: true}
                }

                if (state.wordSet?.includes(currentWord.toLowerCase())) {
                    return {...state, currentAttempt: state.currentAttempt + 1, letterPosition: 0}
                } else {
                    alert("Word Not Found");
                }
            }

            if(action.payload.keyVal === "DELETE" || action.payload.keyVal === "BACKSPACE"){
                if(state.letterPosition === 0) return {...state};

                const newBoard = [...state.gameBoard];
                newBoard[state.currentAttempt][state.letterPosition - 1] = "";
                return {
                    ...state,
                    letterPosition: state.letterPosition - 1,
                }
            }

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

        case ActionKind.APPEND_DISABLE_LIST: {
            const disabledLetter = action.payload.disabledLetter;

            if(!disabledLetter) return {...state};

            return {...state, disabledSet: [...disabledSet, disabledLetter]}
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
    todaysWord: '',
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
