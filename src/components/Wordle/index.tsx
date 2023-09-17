import React, { FC, useEffect } from 'react';
import {useGameProvider} from "../../hooks/useGameProvider";
import {Nav} from "../Nav";
import {generateWordSet} from "../../helpers";
import {Board} from "../Board";
import { KeyBoard } from '../KeyBoard';
import { GameOver } from '../GameOver';
import { Notification } from '../Notification';
import { ActionKind } from '../../types';

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
    }, []);

    return (
        <>
            <Nav />
            {state.isError && <Notification />}
            <div className="game">
                <Board />
                {state.gameOver ? <GameOver/>: <KeyBoard />}
            </div>
        </>
    )
};
