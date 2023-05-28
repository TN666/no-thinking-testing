import React, { useState } from 'react';
import CodeDisplayer from './Components/CodeDisplayer';
import CodeInputer from './Components/CodeInputer';
import './Components/CodeDisplayer.css';
import './Components/CodeInputer.css';
import './App.css'

function App() {
  const [outputCode, setOutputCode] = useState('');

  const handleSubmit = (code) => {
    setOutputCode(code);
  };

  return (
    <div class="App-body">
      <div class="App">
        <CodeInputer onSubmit={handleSubmit} />
        <CodeDisplayer code={outputCode} />
      </div>
    </div>
  );
}

export default App;
