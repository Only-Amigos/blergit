import React, { Component } from 'react';
import {db} from '../firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
     posts: []
    };
  }

  componentDidMount() {
    db.collection('posts')
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data);
        // this.setState({ users: data });
      });
  }

  render() {
    return (
      <h1>HELLO</h1>
    )
  }
}

export default App;