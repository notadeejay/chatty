import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentUser: {name: "Anonymous",
        usercolor: '#000000'}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [],
        usercount: ''
   }
}

getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

handleSubmit (username, content) {
  let colour = this.getRandomColor()
   this.setState({
      currentUser: {name: username,
      usercolor: colour}
    });

   const newMessage = {
      type: 'postMessage',
      username: username,
      content: content,
      usercolor: colour
    };

    this.socket.send(JSON.stringify(newMessage))  
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
      case 'incomingMessage':
      case 'incomingNotification':
        const newMessages = this.state.messages.concat(data);
            this.setState({
              messages: newMessages
            });
      break;
      case 'userCount':
        this.setState({
          usercount: data.userCount
        })
      break;
      default:
        throw new Error("Unknown event type " + data.type);
    }
  }
}
     
  render() {
    return (
      <div>
        <Navbar usercount={this.state.usercount} />
        <MessageList messages={this.state.messages}/>
        <ChatBar handleSubmit={this.handleSubmit.bind(this)}  notifyUsers={this.addNewNotification.bind(this)} currentUser={this.state.currentUser.name}/>        
      </div>
      
    );
  }
}
export default App;
