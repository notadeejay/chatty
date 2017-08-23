import React, { Component } from 'react';

class Message extends Component {
  renderImage = () => {
    if (this.props.url) {
      return <span><img className="message-img" src={this.props.url} /> </span>
    } else {
      return <div></div>
    }
  }

  render() {
    return (
      <div>
        <div className="message">
          <span className="message-username" style={{color: this.props.usercolour}}> {this.props.username} </span>
          <div className="message-content">
            <span>{this.props.content}</span>
            <span> {this.renderImage()} </span>
         </div>
        </div>
      </div>
    );
  }
}

export default Message;

