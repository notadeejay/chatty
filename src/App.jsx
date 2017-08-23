import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentUser: {name: "Anonymous"},
        usercolour: '#000000', // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [],
        usercount: ''
   }
}


handleSubmit (username, content, img) {
  const regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/igm
  const urlArr = (content).match(regex)
    if (urlArr) {
      var url = urlArr.toString();
      var result = content.replace(url,"");
    } else {
      url = null;
      result = content;
    }

   this.setState({
      currentUser: {name: username}
    });
  
   const newMessage = {
      type: 'postMessage',
      username: username,
      content: result,
      img: url
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
    console.log(data) 
    switch(data.type) {
      case 'incomingMessage':
      case 'incomingNotification':
        const newMessages = this.state.messages.concat(data);
            this.setState({
              messages: newMessages
            });
      break;
      case 'userCount':
       if (this.state.usercolour === '#000000') {
        this.setState({usercolour: data.usercolour,
          usercount: data.userCount
        })
       } else {
         this.setState({
          usercount: data.userCount
        })
       }
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
        <MessageList messages={this.state.messages} usercolour={this.state.usercolour}/>
        <ChatBar handleSubmit={this.handleSubmit.bind(this)}  notifyUsers={this.addNewNotification.bind(this)} currentUser={this.state.currentUser.name}/>        
      </div>
      
    );
  }
}
export default App;
