import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Login from '../src/pages/Login/Login';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Login Component', () => {
  // Mock fetch globally
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: 'Login successful!' }),
    })
  );

  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders the login form and interacts with form elements', async () => {
    render(<Login />, { wrapper: BrowserRouter });

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Simulate user typing
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Check if input values are updated
    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password123');

    // Simulate form submission
    fireEvent.click(loginButton);

    // Wait for any async actions to complete
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Login successful!')).toBeInTheDocument();
    });
  });

  it('handles login failures correctly', async () => {
    // Change the fetch mock to simulate a failure
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Login failed' }),
      })
    );

    render(<Login />, { wrapper: BrowserRouter });

    const loginButton = screen.getByRole('button', { name: /login/i });

    // Simulate form submission
    fireEvent.click(loginButton);

    // Check error handling
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Login failed. Please try again.')).toBeInTheDocument();
    });
  });
});

