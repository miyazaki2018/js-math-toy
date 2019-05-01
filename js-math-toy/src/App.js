import React from 'react';
import logo from './logo.svg';
import './App.css';
import PreviewFormula from './Module/PreviewFormula'

function App() {
  return (
    <div className="App">
        <PreviewFormula row={25} column={4} />
    </div>
  );
}

export default App;
