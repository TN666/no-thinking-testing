import React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';

const CodeDisplayer = ({ code }) => {
  return (
      <div class="output-container">
          <CodeEditor
            data-color-mode="dark"
            data-testid="code-output"
            id="code-output"
            value={code}
            language="jsx"
            style={{
              minHeight: 650,
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              fontSize: 12
            }}
          />
      </div>
    );
  }
export default CodeDisplayer;
