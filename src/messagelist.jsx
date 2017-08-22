
import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
       {this.props.messages.map((message, index) => {
            return <Message message={message} key={index} />;
          })
        }
      </main>
      
    );    
  }
}

export default MessageList;

