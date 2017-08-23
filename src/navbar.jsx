import React, { Component } from 'react';

class Navbar extends Component {
  
  render() {
    return (
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className='usercount'> Number of users online: {this.props.usercount} </span>
        </nav>
    );
  }
}

export default Navbar;