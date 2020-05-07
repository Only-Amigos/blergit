import React, { Component } from "react";
import { useSelector } from "react-redux";
import { useFirebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
     posts: []
    };
  }

  // componentDidMount() {
  //   db.collection('posts')
  //     .get()
  //     .then(querySnapshot => {
  //       const data = querySnapshot.docs.map(doc => doc.data());
  //       console.log(data);
  //     });
  // }

  render() {
    return (
      <div>
        <h1>Blergit</h1>
      </div>
    );
  }
}

export default Landing;