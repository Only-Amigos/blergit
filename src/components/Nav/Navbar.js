import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <header>
        <a href="/">
          <h1>Blergit</h1>
        </a>

        <nav>
          <ul className="main-nav">
            <li className="main-nav__item">
              <Link to='/create-post'>New Post</Link>
            </li>
            <li className="main-nav__item">
              <Link to='/profile'>Profile</Link>
            </li>
            <li className="main-nav__item">
              <Link to='/about'>About</Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Navbar;