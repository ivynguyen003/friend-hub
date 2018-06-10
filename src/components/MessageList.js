import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: {
        content: "",
        roomId: "",
        sentAt: "",
        username: "",
        newMessage: ""
      }
    };
    this.state.messages.sentAt = this.props.firebase.database.ServerValue.TIMESTAMP;
    this.messagingRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messagingRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({
        messages: this.state.messages.concat(message)
        // content: ""
      });
      // console.log(this.state.messages.username);
    });
  }

  //   createMessage(message){
  //     this.messagingRef.push({
  //           content: this.state.value,
  //           rommID: this.props.activeRoom.key,
  //           username: this.props.user ? this.props.user.displayName : "Guest",
  //           sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
  //           newMessage:''
  //   })

  // }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.name) {
      return;
    }
    this.messagingRef.push({
      content: this.state.value,
      rommID: this.props.activeRoom.key,
      username: this.props.user ? this.props.user.displayName : "Guest",
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      newMessage: ""
    });
  };

  handleChange(e) {
    this.setState({ newMessage: e.target.value });
  }

  // userName(user) {
  //   this.props.userName(user);
  // }

  render() {
    const activeKey = this.props.activeKey;
    return (
      <section>
        <div>
          {this.state.messages.map((message, index) => {
            if (activeKey === "") {
              return null;
            } else if (activeKey == message.roomId) {
              return (
                <section className="message-display">
                  <p className="user-name">{message.username}</p>
                  <p key={index} className="message">
                    {message.content}
                    {message.sentAt}
                  </p>
                </section>
              );
            }
          })}
        </div>
        <section className="message-form">
          <form onSubmit={e => this.handleSubmit(e)}>
            <input
              type="text"
              onChange={e => this.handleChange(e)}
              value={this.state.value}
            />
          </form>
          <button type="submit" onClick={e => this.handleSubmit(e)}>
            Submit
          </button>
        </section>
        <section className="message-display">
          {this.state.newMessage}
          {this.state.username}
        </section>
      </section>
    );
  }
}

export default MessageList;
