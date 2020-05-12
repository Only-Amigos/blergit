import React, { Component } from 'react';
import { useRouteMatch } from 'react-router-dom';

class Post extends Component {
  render() {
    // console.log(this.props.post);
    console.log(useRouteMatch);
    return (
      <li>
        <h4>{this.props.post.title}</h4>
        <p>{this.props.post.content}</p>
      </li>
    )
  }
}

export default Post;