import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signUp } from '../../store/actions/authActions';

const AuthPage = (props) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setCredentials({...credentials,
      [e.target.id]: e.target.value
    });
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    props.signIn(credentials);
    setCredentials({...credentials,
      email: '',
      password: ''
    });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    props.signUp(credentials);
  };

  if (props.auth.uid) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <div className='box auth-forms'>
        <h3 className='title is-size-4'>Sign In</h3>
        {/* Displaying welcome message when logged in successfully */}
        {props.isLoggedIn ? <p>WELCOME</p> : null}

        <form onSubmit={handleSignInSubmit} className='sign-in-form'>
          <div className='field'>
            <label htmlFor='email' className='label'>Email</label>
            <div className='control'>
              <input
                type='email'
                id='email'
                className='input'
                autoComplete='e-mail'
                placeholder='Enter Email'
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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

      <div className='box auth-forms'>
        <h3 className='title is-size-4'>Sign Up</h3>

        <form onSubmit={handleSignUpSubmit} className='sign-in-form'>
          <div className='field'>
            <label htmlFor='firstName' className='label'>First Name</label>
            <div className='control'>
              <input
                type='text'
                id='firstName'
                className='input'
                placeholder='Enter First Name'
                onChange={handleInputChange}
                required />
            </div>
          </div>
          <div className='field'>
            <label htmlFor='lastName' className='label'>Last Name</label>
            <div className='control'>
              <input
                type='text'
                id='lastName'
                className='input'
                placeholder='Enter Last Name'
                onChange={handleInputChange}
                required />
            </div>
          </div>
          <div className='field'>
            <label htmlFor='email' className='label'>Email</label>
            <div className='control'>
              <input
                type='email'
                id='email'
                className='input'
                autoComplete='e-mail'
                placeholder='Enter Email'
                onChange={handleInputChange}
                required />
            </div>
          </div>
          <div className='field'>
            <label htmlFor='password' className='label'>Password</label>
            <div className='control'>
              <input
                type='password'
                id='password'
                className='input'
                autoComplete='current-password'
                placeholder='Enter Password'
                onChange={handleInputChange}/>
            </div>
          </div>

          <div className='control'>
            <button className='button is-info'>Sign Up</button>
          </div>
        </form>
      </div>
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
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);