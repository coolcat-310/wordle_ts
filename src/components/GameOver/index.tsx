import React, { FC } from 'react';
import { useGameProvider } from '../../hooks/useGameProvider';

export const GameOver: FC = () => {
    const { state } = useGameProvider();
    return (
        <div className="game-over">
            <h1>Game Over</h1>
            <p>The correct word is <b>{state.todaysWord?.toUpperCase()}</b></p>
        </div>
    )
}