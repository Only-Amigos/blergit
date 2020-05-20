import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions.js';

const SignIn = (props) => {
  const [credentials, setCredentials] = useState('');

  const handleInputChange = (e) => {
    setCredentials({...credentials,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signIn(credentials);
  };

  return (
    <div>
      <h1>Sign In</h1>
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
              onChange={handleInputChange}/>
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
              onChange={handleInputChange}/>
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
    authError: state.auth.authError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
