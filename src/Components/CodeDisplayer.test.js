import React from 'react';
import { render } from '@testing-library/react';
import CodeDisplayer from './CodeDisplayer';

describe('CodeDisplayer', () => {
  it('should render code editor with given code', () => {
    const code = '<div>Hello World</div>';
    const { getByTestId } = render(<CodeDisplayer code={code} />);
    const codeEditor = getByTestId('code-output');
    expect(codeEditor).toBeInTheDocument();
    expect(codeEditor.value).toBe(code);
  });
});