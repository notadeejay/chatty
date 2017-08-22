import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
      {
        username: "Bob",
        content: "Has anyone seen my marbles?",
        id: 123
      },
      {
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
        id: 456
      }
    ]
  }
}

handleSubmit (username, content) {
   const newMessage = {
      username: username,
      content: content
    };
    this.updateMessages(newMessage)
    this.socket.send(JSON.stringify(newMessage))
}

updateMessages(newMsg) {
  const changedMessages = this.state.messages.concat(newMsg);
  this.setState({ messages: changedMessages  })
}

   
componentDidMount() {
  this.socket = new WebSocket('ws://localhost:3001/')
    console.log("Connected to server"); 
}      
    
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className='usercount'>
          </span>
        </nav>
        <MessageList messages = {this.state.messages}/>
        <ChatBar handleSubmit={this.handleSubmit.bind(this)} />        
      </div>
      
    );
  }
}
export default App;
