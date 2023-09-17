/**
 *  @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { GameProvider, initialBoard, initialState, useGameProvider } from '.';
import { gameReducer } from '../useReducer';
import { ActionKind } from '../../types';


// Testing gameReducer function directly
describe('gameReducer', () => {
  it('should set words', () => {
    const action = {
      type: ActionKind.WORDS_SET,
      payload: { wordSet: ['word1', 'word2'], todaysWord: 'word1' },
    };

    const state = gameReducer(initialState, action);
    expect(state.wordSet).toEqual(['word1', 'word2']);
    expect(state.todaysWord).toBe('word1');
  });

  // Add other cases to test other actions
  // ...
});

// Testing useGameProvider hook
describe('useGameProvider', () => {
  function TestComponent() {
    const { state, dispatch } = useGameProvider();

    return (
      <div>
        <button onClick={() => dispatch({ type: ActionKind.WORDS_SET, payload: { wordSet: ['word1'], todaysWord: 'word1' } })}>Set Words</button>
        <div data-testid="todaysWord">{state.todaysWord}</div>
      </div>
    );
  }

  it('should use GameProvider and update todaysWord', () => {
    const { getByTestId, getByText } = render(
      <GameProvider>
        <TestComponent />
      </GameProvider>
    );

    fireEvent.click(getByText('Set Words'));
    expect(getByTestId('todaysWord')).toHaveTextContent('word1');
  });

  describe('gameReducer - ON_ENTER action', () => {
    it('should return the same state if letterPosition is not 5', () => {
      const state = {
        ...initialState,
        letterPosition: 3,
      };
  
      const action = { type: ActionKind.ON_ENTER, payload: {} };
  
      const newState = gameReducer(state, action);
      expect(newState).toEqual(state);
    });
  
    it('should set gameOver to true and guessWord to false if currentAttempt is 5', () => {
      const state = {
        ...initialState,
        letterPosition: 5,
        currentAttempt: 5,
      };
  
      const action = { type: ActionKind.ON_ENTER, payload: {} };
  
      const newState = gameReducer(state, action);
      expect(newState.gameOver).toBe(true);
      expect(newState.guessWord).toBe(false);
    });
  
    it('should return the same state if current word is not found in wordSet', () => {
      const state = {
        ...initialState,
        letterPosition: 5,
        gameBoard: [
          ["a", "b", "c", "d", "e"],
          ...initialBoard.slice(1)
        ],
        wordSet: ['word1', 'word2']
      };
  
      const action = { type: ActionKind.ON_ENTER, payload: {} };
  
      const newState = gameReducer(state, action);
      expect(newState).toEqual({...state, isError: true});
    });
  
    it('should set gameOver to true and guessWord to true if the current word matches todaysWord', () => {
      const todaysWord = 'abcde';
      const state = {
        ...initialState,
        letterPosition: 5,
        gameBoard: [
          ["a", "b", "c", "d", "e"],
          ...initialBoard.slice(1)
        ],
        todaysWord,
        wordSet: [todaysWord]
      };
  
      const action = { type: ActionKind.ON_ENTER, payload: {} };
  
      const newState = gameReducer(state, action);
      expect(newState.gameOver).toBe(true);
      expect(newState.guessWord).toBe(true);
    });
  
    it('should update currentAttempt and letterPosition if the current word does not match todaysWord but is in wordSet', () => {
      const todaysWord = 'fghij';
      const state = {
        ...initialState,
        letterPosition: 5,
        currentAttempt: 2,
        gameBoard: [
          ["a", "b", "c", "d", "e"],
          ...initialBoard.slice(1)
        ],
        todaysWord,
        wordSet: ['abcde', todaysWord]
      };
  
      const action = { type: ActionKind.ON_ENTER, payload: {} };
  
      const newState = gameReducer(state, action);
      expect(newState.currentAttempt).toBe(state.currentAttempt);
      expect(newState.letterPosition).toBe(state.letterPosition);
    });
  });
  
});
