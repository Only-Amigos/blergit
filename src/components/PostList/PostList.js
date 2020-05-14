import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost, deletePost } from '../../store/actions/postsActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

class PostList extends Component {
  handleDeletePost = (id) => {
    this.props.deletePost(id);
  };

  render() {
    return (
      <div>
        <h3>Posts:</h3>

        <ul>
          {this.props.posts && this.props.posts.map(post => {
            return (
              <div key={post.id}>
                <Link to={`/posts/${post.id}`}>
                  <li key={post.id}>
                   <h4>{post.title}</h4>
                   <p>{post.content}</p>
                 </li>
                </Link>
                <span className='delete' onClick={this.handleDeletePost.bind(this, post.id)}></span>
              </div>
            )
          })}
        </ul>
      </div>
    )
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
)(PostList)
