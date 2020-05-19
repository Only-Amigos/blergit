import React, { useState } from 'react';

const SignUp = () => {
  const [inputs, setInputs] = useState('');

  const handleInputChange = (e) => {
    setInputs({...inputs,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signnnning Up')
    console.log(inputs)
  };

  return (
    <div>
      <h1>Sign Up</h1>

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
              autocomplete='e-mail'
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
              autocomplete='current-password'
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


export default SignUp;
