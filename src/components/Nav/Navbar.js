import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions.js';

const Navbar = (props) => {
  const [menuState, setMenuState] = useState({
    menuViz: false
  });

  const handleMenuStateClick = () => {
    const doesShow = menuState.menuViz;
    setMenuState({
      ...menuState,
      menuViz: !doesShow
    })
  }

  let mobileNavMenu = null;

  if (menuState.dispatchmenuViz) {
    mobileNavMenu = (
      <ul className='burger-dropdown'>
        <li>
          <Link className='is-size-6 has-text-grey-dark' to='/create-post'>New Post</Link>
        </li>
        <li>
          <Link className='is-size-6 has-text-grey-dark' to='/profile'>Profile</Link>
        </li>
        <li>
          <Link className='is-size-6 has-text-grey-dark' to='/about'>About</Link>
        </li>
        <li>
          <Link className='is-size-6 has-text-grey-dark' to='/signin'>Sign In</Link>
        </li>
        <li>
          <Link className='is-size-6 has-text-grey-dark' to='/signup'>Sign Up</Link>
        </li>
      </ul>
    )
  }

  return (
    <header>
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='navbar-brand'>
          <div className='navbar-item'>
            <Link to='/'>
              <h1 className='title'>Blergit</h1>
            </Link>
          </div>

          {/* Hamburger menu */}
          <button  className='navbar-burger'
          aria-label='menu'
          aria-expanded={menuState.menuViz}
          onClick={handleMenuStateClick}>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          {mobileNavMenu}
          </button>

        </div>

        <div className='navbar-menu'>
          <div className='navbar-start'>
            <div className='navbar-item'>
              <Link to='/create-post'>New Post</Link>
            </div>

            <div className='navbar-item'>
              <Link to='/about'>About</Link>
            </div>

            <div className="auth-links">
              {props.auth.uid ? null :
                <div className='navbar-item'>
                  <Link className='is-size-6 has-text-grey-dark' to='/signin'>Sign In</Link>
                </div>
              }

              {props.auth.uid ? null :
                <div className='navbar-item'>
                  <Link className='is-size-6 has-text-grey-dark' to='/signup'>Sign Up</Link>
                </div>
              }

              {props.auth.uid ?
                <div className='navbar-item'>
                  <button className='sign-out-btn' onClick={props.signOut}>Sign Out</button>
                </div>
              : null}

              {props.auth.uid ?
                <div className='navbar-item'>
                  <Link to='/profile'>Profile</Link>
                </div>
              : null}
            </div>
          </div>
        </div>
      </nav>
    </header>
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
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)