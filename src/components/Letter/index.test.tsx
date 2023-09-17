import React from 'react';
import { render, screen } from '@testing-library/react';
import { useGameProvider } from '../../hooks/useGameProvider';
import { ActionKind } from '../../types';
import { Letter } from '.';

jest.mock('../../hooks/useGameProvider');

const mockUseGameProvider = useGameProvider as jest.Mock;

describe(Letter.name, () => {
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockDispatch = jest.fn();
  });

  const setupTest = ({
    gameBoard,
    todaysWord,
    currentAttempt
  }: {
    gameBoard: string[][],
    todaysWord: string,
    currentAttempt: number
  }) => {
    mockUseGameProvider.mockReturnValue({
      state: {
        gameBoard,
        todaysWord,
        currentAttempt
      },
      dispatch: mockDispatch
    });
    render(<Letter letterPosition={0} attemptValue={0} />);
  };

  it('renders a correct letter with "correct" status', () => {
    setupTest({
      gameBoard: [['A', 'B'], ['C', 'D']],
      todaysWord: 'ab',
      currentAttempt: 2
    });

    const letterElement = screen.getByText('A');
    expect(letterElement).toHaveAttribute('id', 'correct');
  });

  it('renders an almost correct letter with "almost" status', () => {
    setupTest({
      gameBoard: [['A', 'B'], ['C', 'D']],
      todaysWord: 'ba',
      currentAttempt: 2
    });

    const letterElement = screen.getByText('A');
    expect(letterElement).toHaveAttribute('id', 'almost');
  });

  it('renders an incorrect letter with "disabled" status and dispatches APPEND_DISABLE_LIST action', () => {
    setupTest({
      gameBoard: [['A', 'B'], ['C', 'D']],
      todaysWord: 'cd',
      currentAttempt: 2
    });

    const letterElement = screen.getByText('A');
    expect(letterElement).toHaveAttribute('id', 'disabled');
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionKind.APPEND_DISABLE_LIST,
      payload: {
        disabledLetter: 'A',
      }
    });
  });
});
