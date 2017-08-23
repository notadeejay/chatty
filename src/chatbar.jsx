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
      if(this.state.username !== this.props.currentUser) {
        let content = '🎉 ' + this.props.currentUser + ' has changed their username to ' + this.state.username
        this.props.notifyUsers(this.state.username, content);
      }
      if(event.target.name == "messagebox") {
        this.props.handleSubmit(this.state.username, this.state.content)
        
        this.setState({
          username: '',
          content: ''
          })
      }  
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
          defaultValue = {this.props.currentUser}
          onChange = {this.handleUsername}
          onKeyPress={this.handleSubmit.bind(this)}/>
        <input className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          name="messagebox"
          value={this.state.content}
          onChange={this.handleMessage}
          onKeyPress ={this.handleSubmit.bind(this)} />
    </footer>
    );
  }
}
export default Chatbar;