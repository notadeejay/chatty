import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: []
  }
}

handleSubmit (username, content) {
   const newMessage = {
      type: 'postMessage',
      username: username,
      content: content
    };
    this.socket.send(JSON.stringify(newMessage))  
    this.setState({
      currentUser: {name: username}
    });
}

addNewNotification(username, content){
  event.preventDefault();
  const newNotif = {
      type: 'postNotification',
      content
    };
   this.socket.send(JSON.stringify(newNotif));
   this.setState({
    currentUser: {name: username}
    });
};

componentDidMount() {
  this.socket = new WebSocket('ws://localhost:3001/')
  this.socket.onopen = (event) => {
  }

  this.socket.onmessage = (event) => {
    const data = JSON.parse(event.data);  
    switch(data.type) {
      case "incomingMessage":
      case "incomingNotification":
      const newMessages = this.state.messages.concat(data);
          this.setState({
            messages: newMessages
          });
      break;
      default:
   
        throw new Error("Unknown event type " + data.type);
    }
  }
}
     
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className='usercount'>
          </span>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar handleSubmit={this.handleSubmit.bind(this)}  notifyUsers={this.addNewNotification.bind(this)} currentUser = {this.state.currentUser.name}/>        
      </div>
      
    );
  }
}
export default App;
