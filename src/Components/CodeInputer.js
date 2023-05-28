import React, { useState } from 'react';
import { config } from '../config'
import CodeEditor from '@uiw/react-textarea-code-editor';


const CodeInputer = ({ onSubmit }) => {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
      setCode(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": [{"role": "user", "content": `Generate Jest test case with react-testing-library for the code below:\n ${code}`}]
        })
      });
      const data = await response.json();
      setIsLoading(false);
      onSubmit(data.choices[0].message.content);
    };
  
    return (
      <form className="input-container" onSubmit={handleSubmit}>
        <CodeEditor
          data-color-mode="dark"
          value={code}
          language="jsx"
          placeholder="Enter your code here"
          onChange={handleChange}
          style={{
            minHeight: 650,
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            fontSize: 12
          }}
        />
        <button class="submit-button" type="submit">{isLoading ? 'Loading...' : 'Submit'}</button>
      </form>
    );
  };

  export default CodeInputer;
  
  
  