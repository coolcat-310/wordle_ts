import React, {FC, useEffect} from 'react';
import {ActionKind, useGameProvider} from "../../hooks/useGameProvider";

export interface LetterProps {
    letterPosition: number,
    attemptValue: number
}


export const Letter:FC<LetterProps> = ({letterPosition, attemptValue}) => {
    const {state, dispatch} = useGameProvider();

    const { gameBoard, todaysWord = '', currentAttempt} = state;

    const letter = gameBoard[attemptValue][letterPosition];
    const correct = todaysWord[letterPosition] === letter;
    const almost = !correct && letter !== "" && todaysWord.includes(letter);
    const letterState = (currentAttempt > attemptValue && correct) ? "correct": almost ? "almost" : "error";

    const isDisabledLetter: boolean = letter !== "" && !correct && !almost;

    useEffect(() => {
        if(!isDisabledLetter) return;

        dispatch({
            type: ActionKind.APPEND_DISABLE_LIST,
            payload: {
                disabledLetter: letter
            }
        });
        // eslint-disable-next-line
    }, [currentAttempt])


    return (
        <div className="letter" id={letterState}>{letter}</div>
    )
}
