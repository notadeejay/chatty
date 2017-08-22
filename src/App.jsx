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
      username: username,
      content: content
    };
    this.socket.send(JSON.stringify(newMessage))  

}


// updateMessages(newMsg) {
//   const changedMessages = this.state.messages.concat(newMsg);
//   this.setState({ messages: changedMessages  })
// }

   
componentDidMount() {
  this.socket = new WebSocket('ws://localhost:3001/')
  this.socket.onopen = (event) => {
  }

  this.socket.onmessage = (event) => {
    const newMessage = JSON.parse(event.data); 
      const newMessages = this.state.messages.concat(newMessage);
          this.setState({
            messages: newMessages
          })
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
        <MessageList messages = {this.state.messages}/>
        <ChatBar handleSubmit={this.handleSubmit.bind(this)} />        
      </div>
      
    );
  }
}
export default App;
