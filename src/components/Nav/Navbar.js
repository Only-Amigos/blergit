import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions.js';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuViz: false
    };
  }

  handleMenuVizClick = () => {
    const doesShow = this.state.menuViz;
    this.setState({menuViz: !doesShow});
  }

  render() {
    let mobileNavMenu = null;

    if (this.state.menuViz) {
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
            aria-expanded={this.state.menuViz}
            onClick={this.handleMenuVizClick}>
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
                <Link to='/profile'>Profile</Link>
              </div>

              <div className='navbar-item'>
                <Link to='/about'>About</Link>
              </div>

              {this.props.isLoggedIn ? null :
                <div className='navbar-item'>
                  <Link className='is-size-6 has-text-grey-dark' to='/signin'>Sign In</Link>
                </div>
              }

              {this.props.isLoggedIn ? null :
                <div className='navbar-item'>
                  <Link className='is-size-6 has-text-grey-dark' to='/signup'>Sign Up</Link>
                </div>
              }

              {this.props.isLoggedIn ?
                <div className='navbar-item'>
                  <button className='sign-out-btn' onClick={this.props.signOut}>Sign Out</button>
                </div>
              : null}
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    authError: state.auth.authError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)