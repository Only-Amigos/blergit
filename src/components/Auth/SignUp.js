import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/actions/authActions';

const SignUp = (props) => {
  const [credentials, setCredentials] = useState('');

  const handleInputChange = (e) => {
    setCredentials({...credentials,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signUp(credentials);
  };

  if (props.auth.uid) {
    return <Redirect to='/' />
  }

  return (
    <div className='box auth-forms'>
      <h3 className='title is-size-4'>Sign Up</h3>

      <form onSubmit={handleSubmit} className='sign-in-form'>
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
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
