import React, { FC, useEffect } from 'react';
import {useGameProvider, ActionKind} from "../../hooks/useGameProvider";
import {Nav} from "../Nav";
import {generateWordSet} from "../../helpers";

export const Wordle: FC = () => {
    const { state, dispatch } = useGameProvider();

    useEffect(() => {
        generateWordSet()
            .then(({wordSet, todaysWord}) => {
                dispatch({
                    type: ActionKind.WORDS_SET,
                    payload: {
                        wordSet,
                        todaysWord
                    }
                });
            });
    }, [])

    return (
        <>
            <Nav />
            <div className="game">
                wordle
                {state.gameOver ? "gameOver": "keep playing"}
            </div>
        </>
    )
};
