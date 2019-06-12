import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import ValentinesCard from './ValentinesCard/index';
import AngryDinos from './AngryDinos/index';

class App extends Component {
  render() {
    return (
      <div className="app" >
        <Router>
          <Route exact path="/" component={AngryDinos} />
          <Route path="/valentines-day-2019" component={ValentinesCard} />
        </Router>
      </div>
    );
  }
}

export default App;
