import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { connect } from 'react-redux';
import { createPost, deletePost } from '../store/actions/postsActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import 'bulma/css/bulma.css';
import '../styles/main.scss';

import Navbar from './Nav/Navbar';
import CreatePost from './CreatePost/CreatePost';
import Posts from './Posts/Posts';
import Post from './Posts/Post';
import Profile from './Profile/Profile';
import About from './About/About';

class App extends Component {
  handleDeletePost = (id) => {
    this.props.deletePost(id);
  };

  render() {
    // console.log(this.props.posts[0])
    return (
      <Router>
        <div>
          <Navbar />

          <Switch>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/profile'>
              <Profile />
            </Route>
            <Route path='/create-post'>
              <CreatePost />
            </Route>
            <Route path='/posts/:id'>
              <Post />
            </Route>
          </Switch>

          <h3>Posts:</h3>

          <ul>
            {this.props.posts.map(post => {
              return (
                // <Route path='/posts/:id'>
                <Link to={`/posts/${post.id}`} key={post.id}>
                  <Post post={post} />
                </Link>
                // </Route>
                // <li key={post.id}>
                //   <h4>{post.title}</h4>
                //   <p>{post.content}</p>
                //   <span className='delete' onClick={this.handleDeletePost.bind(this, post.id)}></span>
                // </li>
              )
            })}
          </ul>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.firestore.ordered.posts || state.posts.posts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post) => dispatch(createPost(post)),
    deletePost: (id) => dispatch(deletePost(id))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection: 'posts'}
  ])
)(App)