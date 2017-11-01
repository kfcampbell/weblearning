// @ts-check

import React from 'react';
import './App.css';
import HelloWorld from './HelloWorld';

const App = () => {
  return (<div className="App">
      <HelloWorld name="Draco Malfoy"/>
      <HelloWorld name="Tom Riddle"/>
    </div>);
};

export default App;