import React, {FC, useEffect, useState} from 'react';
import { motion } from "framer-motion"
import {useGameProvider} from "../../hooks/useGameProvider";
import { ActionKind, LetterProps } from '../../types';

// Define the type for animateProps
type AnimateProps = {
  scale?: number[],
  rotate?: number[],
  borderRadius?: string[],
};

const getStatus = (isLetterCorrect: boolean, isAlmostCorrect: boolean, isDisabledLetter:boolean, canShowStatus:boolean): string => {

    if(isDisabledLetter) return "disabled";
    if(!canShowStatus) return "error";
    if(isAlmostCorrect && !isLetterCorrect) return "almost";
    if(isLetterCorrect) return "correct";

    return "error";
}

export const Letter:FC<LetterProps> = ({letterPosition, attemptValue}) => {
    const {state, dispatch} = useGameProvider();

    const { gameBoard, todaysWord= '', currentAttempt } = state;

    const letter = gameBoard[attemptValue][letterPosition];
    const canShowStatus = currentAttempt > attemptValue;

    const isLetterCorrect = todaysWord[letterPosition] === letter.toLowerCase();
    const isAlmostCorrect = letter !== "" && todaysWord.includes(letter.toLocaleLowerCase());

    const isDisabledLetter: boolean = letter !== "" && !isLetterCorrect && !isAlmostCorrect && canShowStatus;

    const [animateProps, setAnimateProps] = useState<AnimateProps>({ borderRadius: ["20%", "20%", "50%", "50%", "20%"]});

  const status = getStatus(isLetterCorrect, isAlmostCorrect, isDisabledLetter, canShowStatus);

  useEffect(() => {
    if (status === "correct") {
      setAnimateProps({ ...animateProps, scale: [1, 2, 2, 1, 1], rotate: [0, 0, 270, 270, 0]});
    }
  }, [status]);

    useEffect(() => {
        if(!isDisabledLetter) return;

        dispatch({
            type: ActionKind.APPEND_DISABLE_LIST,
            payload: {
                disabledLetter: letter
            }
        });
    }, [currentAttempt, isDisabledLetter, letter, dispatch])


    return (
        <motion.div
        animate={animateProps}
        className="letter"
        id={status}
      >
        {letter}
      </motion.div>  
    )
}
