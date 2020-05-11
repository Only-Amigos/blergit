import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <header>
        <nav className='navbar' role='navigation' aria-label='main navigation'>
          <div className="navbar-brand">
            <div className="navbar-item">
              <a href='/'>
                <h1 className='title'>Blergit</h1>
              </a>
            </div>
          </div>

          <div className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-item">
                <Link to='/create-post'>New Post</Link>
              </div>

              <div className="navbar-item">
                <Link to='/profile'>Profile</Link>
              </div>

              <div className="navbar-item">
                <Link to='/about'>About</Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default Navbar;