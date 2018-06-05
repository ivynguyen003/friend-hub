import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [{
        content: '',
        roomId: '',
        sentAt: '',
        username: ''
      }]
    }
    this.state.messages.sentAt = this.props.firebase.database.ServerValue.TIMESTAMP;
    this.messagingRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagingRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
      console.log(this.state.messages)
    })
  }


  render() {
    const activeKey = this.props.activeKey;
    return (
      <section>
        <div>
          {
            this.state.messages.map((message, index) => {
              if (activeKey === "") {
                return null;
              } else if (activeKey == message.roomId) {
                return (
                  <p key={index} className="message">{message.content}</p>
                )

              }
            }
            )
          }
        </div>
      </section>

    );
  }
}

export default MessageList;
