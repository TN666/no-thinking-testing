import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CodeInputer from './CodeInputer';

describe('CodeInputer', () => {
  const onSubmitMock = jest.fn();

  it('should render CodeEditor and button', () => {
    const { getByPlaceholderText, getByRole } = render(
      <CodeInputer onSubmit={onSubmitMock} />
    );
    expect(getByPlaceholderText('Enter your code here')).toBeInTheDocument();
    expect(getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('should call onSubmit with response message on form submit', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            choices: [
              {
                message: {
                  content: 'Generated Jest test case using react-testing-library!'
                }
              }
            ]
          })
      })
    );

    const { getByPlaceholderText, getByRole } = render(
      <CodeInputer onSubmit={onSubmitMock} />
    );

    fireEvent.change(getByPlaceholderText('Enter your code here'), {
      target: { value: 'console.log("Hello World!");' }
    });
    fireEvent.click(getByRole('button', { name: /Submit/i }));

    expect(getByRole('button', { name: /Loading.../i })).toBeInTheDocument();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.openai.com/v1/chat/completions',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: expect.any(String)
          }
        })
      );
    });

    expect(onSubmitMock).toHaveBeenCalledWith(
      'Generated Jest test case using react-testing-library!'
    );
  });
});