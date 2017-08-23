import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      content: ''
      };
  }


  handleChange(event) {
    if (event.key === 'Enter') {
      this.setState({
        message:event.target.value
      })
    }
      this.props.onSendMessage(this.state.message);
      event.target.value = '';
      ;
    }
  

  handleUsername(event) {
    if (event.key === 'Enter') {
      // if (!this.state.username) {
      //   this.state.username = 'Anonymous';
      // }
      this.setState({
        username:event.target.value
      });
      this.props.onSendUser(this.state.username);
    }
  }

  render() {
    return (

      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          onKeyPress={this.handleUsername.bind(this)} />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.handleChange.bind(this)}
          value={this.state.usermessage}/>
      </footer>
    )
  }
 }

export default ChatBar;