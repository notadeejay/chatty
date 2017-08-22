import React, { Component } from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      content: ''
      };

    this.handleMessage = this.handleMessage.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
  }
  

  handleSubmit(event) {
  if(event.key == 'Enter') {
    this.props.handleSubmit(this.state.username, this.state.content)
    this.setState({
      username: '',
      content: ''
      })
    }
  }

  handleUsername (event) {
   this.setState({
        username: event.target.value
      })
  }

  handleMessage (event) {
     this.setState({
        content: event.target.value
      })
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" 
          placeholder='Your name' 
          value= {this.state.username}
          onChange = {this.handleUsername}
          onKeyPress={this.handleSubmit.bind(this)}/>
        <input className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          value={this.state.content}
          onChange={this.handleMessage}
          onKeyPress ={this.handleSubmit.bind(this)} />
    </footer>
    );
  }
}
export default Chatbar;