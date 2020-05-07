import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../store/actions/postsActions';
// import {db} from '../firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: 4,
      title: 'Post numero four',
      content: 'Lorrrrrrrrrrrremmmmmmmmm Ipso Facto',
     posts: []
    };
  }

  componentDidMount() {
    this.props.createPost(this.state);
    // db.collection('posts')
    //   .get()
    //   .then(querySnapshot => {
    //     const data = querySnapshot.docs.map(doc => doc.data());
    //     console.log(data);
    //     // this.setState({ users: data });
    //   });
  }

  render() {
    // console.log(this.props.posts[0])
    return (
      <BrowserRouter>
        <div>
          <h1>Blergit</h1>

          <h3>Posts:</h3>

          <ul>
            {this.props.posts.map(post => {
              return (
                <li key={post.id}>
                  <h4>{post.title}</h4>
                  <p>{post.content}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post) => dispatch(createPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);