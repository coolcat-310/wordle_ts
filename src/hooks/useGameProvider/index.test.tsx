/**
 *  @jest-environment jsdom
 */

import React, {FC} from 'react';
import { render, screen, configure} from '@testing-library/react';
import {ActionKind, useGameProvider, GameProvider, initialState} from ".";
import userEvent from "@testing-library/user-event";

configure( { testIdAttribute: "data-test-id"})

const TestComponent: FC = () => {
    const {dispatch, state} = useGameProvider();

    const setTemplate = ():void => {
        dispatch({
            type: ActionKind.ON_CLICK,
            payload: {
                keyVal: 'q'
            }
        })
    };

    const setEnter = ():void => {
        dispatch({
            type: ActionKind.ON_CLICK,
            payload: {
                keyVal: 'ENTER'
            }
        })
    };

    return (
        <div>
            <p data-test-id="test-text">{JSON.stringify(state)}</p>
            <button onClick={setTemplate}>Set OnClick</button>
            <button onClick={setEnter}>Set Enter</button>
            <p data-test-id="board-data">{JSON.stringify(state.gameBoard)}</p>
            <p data-test-id="letterPosition-data">{JSON.stringify(state.letterPosition)}</p>
        </div>
    )
}

test('GameProvider returns default template state', () => {
    render(
        <GameProvider>
            <TestComponent />
        </GameProvider>
    );

    const text = screen.getByTestId('test-text');
    expect(text).toHaveTextContent(JSON.stringify(initialState));
});

test('GameProvider retuns an altered gameboard when onclick is triggered', () => {
    render(
        <GameProvider>
            <TestComponent />
        </GameProvider>
    );
    const button = screen.getByRole('button', {name: /Set OnClick/i});
    userEvent.click(button);
    const text = screen.getByTestId('board-data');
    const letterPos = screen.getByTestId('letterPosition-data');

    const newBoard = [...initialState.gameBoard];
    newBoard[0][0] = 'q';

    expect(text).toHaveTextContent(JSON.stringify(newBoard));
    expect(letterPos).toHaveTextContent(JSON.stringify(initialState.letterPosition + 1));
});

test('GameProvider return default state on initial load', () => {
    render(
        <GameProvider>
            <TestComponent />
        </GameProvider>
    );
    const button = screen.getByRole('button', {name: /Set Enter/i});
    userEvent.click(button);
    const text = screen.getByTestId('test-text');
    expect(text).toHaveTextContent(JSON.stringify(initialState));
});
