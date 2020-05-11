import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { connect } from 'react-redux';
import { createPost } from '../store/actions/postsActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import 'bulma/css/bulma.css';
import '../styles/main.scss';

import Navbar from './Nav/Navbar';
import CreatePost from './CreatePost/CreatePost';
import Profile from './Profile/Profile';
import About from './About/About';

class App extends Component {
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
          </Switch>

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
    createPost: (post) => dispatch(createPost(post))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection: 'posts'}
  ])
)(App)