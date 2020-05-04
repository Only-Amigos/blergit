import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PostForm from './createForm/PostForm';

class App extends Component {
  render() {
    return (
      <Router>
        HEADER
        <Route exact path="/">
          <div className="App">
            <h1>HELLO</h1>
          </div>
        </Route>
        <Route path="/create">
          <PostForm />
        </Route>
      </Router>
    )
  }
}

export default App;