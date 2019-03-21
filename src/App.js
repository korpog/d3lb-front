import React, { Component } from 'react';
import Leaderboards from './Leaderboards'
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="title my-1">
          <h1 className="text-center my-2">
          <b>Diablo 3 Leaderboards</b>
          </h1>
        </div>
        <div className="main">
          <div className="row justify-content-center">
            <div className="col-10">
              <Leaderboards />
            </div>
          </div>
        </div>
    </div>
    );
  }
}

export default App;
