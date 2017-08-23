import React, { Component } from 'react';

class Message extends Component {
  renderImage = () => {
    if (this.props.url) {
      return <img className="message-img" src={this.props.url} />
    } else {
      return <div></div>
    }
  }

  
  render() {
    return (
      <div>
        <div className="message">
          <span className="message-username" style={{color: this.props.usercolour}}> {this.props.username} </span>
          <span className="message-content">{this.props.content} </span>
          {this.renderImage()}
        </div>
      </div>
    );
  }
}

export default Message;

