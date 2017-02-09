import React, { Component } from 'react';
import Nav from './Nav';
import DisplayMode from './DisplayMode';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to project dg-weather!</h2>
          <div className="Nav">
            <Nav />
          </div>
        </div>
        <div className="Body">
          <DisplayMode mode="PlayableForecast" />
        </div>
      </div>
    );
  }
}

export default App;
