import React, { Component } from 'react';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    };
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signnnning Up')
  };

  render() {
    return (
      <div>
        <h1>Sign Up</h1>

        <form onSubmit={this.handleSubmit} className='sign-in-form'>
          <div className='field'>
            <label htmlFor='firstname' className='label'>First Name</label>
            <div className='control'>
              <input
                type='text'
                id='firstname'
                className='input'
                placeholder='Enter First Name'
                onChange={this.handleInputChange}/>
            </div>
          </div>
          <div className='field'>
            <label htmlFor='lastname' className='label'>Last Name</label>
            <div className='control'>
              <input
                type='text'
                id='lastname'
                className='input'
                placeholder='Enter Last Name'
                onChange={this.handleInputChange}/>
            </div>
          </div>
          <div className='field'>
            <label htmlFor='email' className='label'>Email</label>
            <div className='control'>
              <input
                type='email'
                id='email'
                className='input'
                placeholder='Enter Email'
                onChange={this.handleInputChange}/>
            </div>
          </div>
          <div className='field'>
            <label htmlFor='password' className='label'>Password</label>
            <div className='control'>
              <input
                type='password'
                id='password'
                className='input'
                placeholder='Enter Password'
                onChange={this.handleInputChange}/>
            </div>
          </div>

          <div className='control'>
            <button className='button is-info'>Sign Up</button>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn;
