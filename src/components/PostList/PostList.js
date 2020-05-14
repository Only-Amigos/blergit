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
      <div className="postlist">
        <h3 className="has-text-centered is-size-4">Posts:</h3>
        <div className="postlist-posts">
          {this.props.posts && this.props.posts.map(post => {
            return (
              <Link className="box postlist-post" to={`/posts/${post.id}`} key={post.id}>
                <div key={post.id}>
                  <h4 className="">{post.title}</h4>
                  <p>{post.content}</p>
                  <span className='delete' onClick={this.handleDeletePost.bind(this, post.id)}></span>
                </div>
              </Link>
            )
          })}
        </div>
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
