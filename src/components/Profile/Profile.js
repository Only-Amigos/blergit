import React from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../../store/actions/postsActions';
import { Link } from 'react-router-dom';

import SocialBar from '../SocialBar/SocialBar';

const Profile = (props) => {
  const handleDeletePost = (id) => {
    props.deletePost(id);
  };

  let onlyUsersPosts = props.posts.filter((post) => {
    return post.userId === props.auth.uid
  });

  let userPostList = props.posts && onlyUsersPosts.map(post => {
    return (
      <div className='postlist-post column is-4' key={post.id}>
        <div className="box postlist-post__spacing">
          <Link to={`/posts/${post.id}`}>
            <h4 className='title is-size-5 has-text-weight-medium has-text-black-ter'>{post.title}</h4>

            {post.createdAt ? <p className="date-time is-size-6 has-text-grey">Posted at {post.createdAt}</p> : null}

            <div className='innerContentWrapper'>
              <p className='content is-size-6 has-text-grey-dark'>{post.content}</p>
              {post.imgUrl ? <img className='post-image' src={post.imgUrl} alt={post.title}/> : null}
            </div>
          </Link>

          <SocialBar post={post} />
        </div>

        <span className='delete' onClick={handleDeletePost.bind(this, post.id)}></span>
      </div>
    );
  })

  return (
    <div>
      <h1>Welcome to the Profile page</h1>

      <div className='postlist'>
        <h3 className='has-text-centered is-size-4'>Your Posts:</h3>
        <div className='postlist-wrap columns'>
          {userPostList}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    posts: state.firestore.ordered.posts || state.posts.posts,
    isLoggedIn: state.auth.isLoggedIn,
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (id) => dispatch(deletePost(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);