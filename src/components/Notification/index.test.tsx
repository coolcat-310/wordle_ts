import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Notification } from '.';

jest.mock('../../hooks/useGameProvider', () => ({
  useGameProvider: () => ({
    dispatch: jest.fn(),
  }),
}));

describe(Notification.name, () => {
  it('renders the notification and removes it after 5 seconds', async () => {
    jest.setTimeout(7000);
    render(<Notification />);
    
    // Validate if the notification exists
    expect(screen.getByText(/Word is not valid, Please try Again./i)).toBeInTheDocument();
    
    // Wait for the element to be removed
    await waitForElementToBeRemoved(() => screen.queryByText(/Word is not valid, Please try Again./i), { timeout: 6000 });
  });
});
