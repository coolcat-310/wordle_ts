import { ReactNode } from 'react';

export enum ActionKind {
    RESET_GAME = 'RESET_GAME',
    ON_CLICK = 'ON_CLICK',
    WORDS_SET = 'WORDS_SET',
    APPEND_DISABLE_LIST = 'APPEND_DISABLE_LIST',
    ON_ENTER = 'ON_ENTER',
    ON_BACKSPACE = 'ON_BACKSPACE',
    CLEAR_ERROR = 'CLEAR_ERROR',
}

export type State = {
    gameBoard: string[][],
    gameOver: boolean,
    guessWord: boolean,
    currentAttempt: number,
    letterPosition: number,
    keyVal?: string,
    todaysWord?: string,
    wordSet?: string[],
    disabledSet?: string[],
    isError?: boolean,
};

export type Payload = {
    keyVal?: string,
    todaysWord?: string,
    wordSet?: string[],
    disabledLetter?: string,
};
 
 export type Action = { type: ActionKind; payload?: Payload };

 export type Dispatch = (action: Action) => void;

 export type WordleContext= {state: State, dispatch: Dispatch};

 export type GameProviderProps = { children: ReactNode };

 export interface keyProps {
    keyVal: string
    isBig?: boolean
    isDisabled?: boolean
}

export interface LetterProps {
    letterPosition: number,
    attemptValue: number
}