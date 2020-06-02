import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { connect } from 'react-redux';
import { createPost, deletePost } from '../store/actions/postsActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import 'bulma/css/bulma.css';
import '../styles/main.scss';

import Navbar from './Nav/Navbar';
import CreatePost from './CreatePost/CreatePost';
import PostList from './PostList/PostList';
import Post from './PostList/Post';
import Profile from './Profile/Profile';
import About from './About/About';
import AuthPage from './Auth/AuthPage';

class App extends Component {

  render() {
    return (
      <Router>
        <Navbar />
        <section className="section">
          <div className="container">
            <Switch>
                <Route exact path='/' component={PostList} />
                <Route path='/about' component={About} />
                <Route path='/profile'component={Profile} />
                <Route path='/create-post' component={CreatePost} />
                <Route exact path='/posts/' component={PostList} />
                <Route path='/posts/:id' component={Post} />
                <Route path='/auth' component={AuthPage} />
            </Switch>
          </div>
        </section>
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