import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { increaseUpdoot } from '../../store/actions/postsActions';

const SocialBar = (props) => {
  const {post} = props;

  const handleUpdoot = () => {
    let updoots = post.updoots;

    if (post.updoots === null || isNaN(post.updoots)) {
      updoots = 1;
    } else {
      updoots += 1;
    }

    props.increaseUpdoot(post.id, post, updoots);
  }

  return (
    <div className='social-bar'>
      <p className='social-bar__liked is-size-4 has-text-grey-dark'
        onClick={handleUpdoot}>
        <span>&#x21d1;</span>
      </p>
      <p className='is-size-6 has-text-grey-dark'>
        {post.updoots ? post.updoots : '0'} </p>
      <p className="social-bar__email is-size-4 has-text-grey-dark">&#x2709;</p>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    increaseUpdoot: (id, post, updoots) => dispatch(increaseUpdoot(id, post, updoots))
  }
}

export default compose(
  connect(null, mapDispatchToProps),
  firestoreConnect([
    {collection: 'posts'}
  ])
)(SocialBar)