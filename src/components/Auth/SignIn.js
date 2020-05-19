import React, { useState } from 'react';

const SignIn = () => {
  const [inputs, setInputs] = useState('');

  const handleInputChange = (e) => {
    setInputs({...inputs,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Loggging in');
    console.log(inputs);
  };

  return (
    <div>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit} className='sign-in-form'>
        <div className='field'>
          <label htmlFor='email' className='label'>Email</label>
          <div className='control'>
            <input
              type='email'
              id='email'
              className='input'
              autocomplete='e-mail'
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
              autocomplete='new-password'
              placeholder='Enter Password'
              onChange={handleInputChange}/>
          </div>
        </div>

        <div className='control'>
          <button className='button is-info'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default SignIn;
