import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useGameProvider } from '../../hooks/useGameProvider';
import { ActionKind } from '../../types';
import { Key } from '.';

// Mock the useGameProvider hook
jest.mock('../../hooks/useGameProvider', () => ({
  useGameProvider: jest.fn()
}));

describe(Key.name, () => {
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockDispatch = jest.fn();
    (useGameProvider as jest.Mock).mockReturnValue({
      state: {},
      dispatch: mockDispatch,
    });
  });

  it('should handle "Enter" key click', () => {
    render(<Key keyVal="Enter" />);
    fireEvent.click(screen.getByText('Enter'));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionKind.ON_ENTER,
    });
  });

  it('should handle "BACKSPACE" key click', () => {
    render(<Key keyVal="BACKSPACE" />);
    fireEvent.click(screen.getByText('BACKSPACE'));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionKind.ON_BACKSPACE,
    });
  });

  it('should handle a generic key click', () => {
    render(<Key keyVal="A" />);
    fireEvent.click(screen.getByText('A'));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionKind.ON_CLICK,
      payload: {
        keyVal: 'A',
      },
    });
  });

  it('should not fire events when disabled', () => {
    render(<Key keyVal="A" isDisabled={true} />);
    fireEvent.click(screen.getByText('A'));

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should apply "disabled" class when disabled', () => {
    render(<Key keyVal="A" isDisabled={true} />);
    expect(screen.getByText('A')).toHaveClass('disabled');
  });
});
