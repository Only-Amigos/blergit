import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { increaseUpdoot } from '../../store/actions/postsActions';
import greenUpArrow from '../../assets/Green-Up-Arrow.svg';
import emailLogo from '../../assets/email_envelope.svg';
import twitterLogo from '../../assets/Twitter_Logo_WhiteOnBlue.svg';

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

  const makeTweetfromPost = () => {
    const thisPageUrl = encodeURIComponent(window.location.href);

    window.open('https://twitter.com/share?url='+ encodeURIComponent(thisPageUrl)+'&text='+post.content, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;
  }


  return (
    <ul className='social-bar'>
      <li className='updoots'>
        <p className='updoots__liked is-size-4 has-text-grey-dark'
          onClick={handleUpdoot}>
          <img className='green-up-arrow' src={greenUpArrow} alt='Click here to upvote this post'/>
        </p>

        <p className='is-size-5 has-text-grey-dark'>
          {post.updoots ? post.updoots : '0'}
        </p>
      </li>

      <li>
        <a href={'mailto:yourbuddy@example.com?subject=' +
         post.title + '&body=' +
         post.content} target='_blank' rel='noopener noreferrer'>
          <img className='email-logo' src={emailLogo} alt='Email this post'/>
        </a>
      </li>

       <li>
         <button onClick={makeTweetfromPost}>
           <img className='twitter-logo' src={twitterLogo} alt='Tweet this post out'/>
         </button>
       </li>
    </ul>
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