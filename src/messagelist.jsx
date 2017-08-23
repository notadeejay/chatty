
import React, {Component} from 'react';
import Message from './Message.jsx'
import Notification from './Notification.jsx'

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
       {this.props.messages.map((message) => {
         if (message.type === 'incomingNotification') {
              return <Notification notification={message.content} 
              key={message.id} />;
            } else {
              console.log(this.props.usercolour)
              return <Message content={message.content} 
              username={message.username} 
              key={message.id} 
              usercolour={this.props.usercolour} />;
            }
          })
        }
      </main>
      
    );    
  }
}

export default MessageList;

