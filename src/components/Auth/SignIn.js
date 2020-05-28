import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';

const SignIn = (props) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSignInInputChange = (e) => {
    setCredentials({...credentials,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signIn(credentials);
    setCredentials({...credentials,
      email: '',
      password: ''
    });
  };

  if (props.auth.uid) {
    return <Redirect to='/' />
  }

  return (
    <div className='box auth-forms'>
      <h3 className='title is-size-4'>Sign In</h3>
      {/* Displaying welcome message when logged in successfully */}
      {props.isLoggedIn ? <p>WELCOME</p> : null}

      <form onSubmit={handleSubmit} className='sign-in-form'>
        <div className='field'>
          <label htmlFor='email' className='label'>Email</label>
          <div className='control'>
            <input
              type='email'
              id='email'
              className='input'
              autoComplete='e-mail'
              placeholder='Enter Email'
              onChange={handleSignInInputChange}
              value={credentials.email}/>
          </div>
        </div>
        <div className='field'>
          <label htmlFor='password' className='label'>Password</label>
          <div className='control'>
            <input
              type='password'
              id='password'
              className='input'
              autoComplete='new-password'
              placeholder='Enter Password'
              onChange={handleSignInInputChange}
              value={credentials.password}/>
          </div>
        </div>
        {/* Display error message when login failed  */}
        {props.authError ? <p>{props.authError}</p> : null}

        <div className='control'>
          <button className='button is-info'>Login</button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
