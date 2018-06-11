import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message:{
          content: "",
          roomId: "",
          sentAt: "",
          username: ""
        },
      newMessage:""
      
    };
    this.state.messages.sentAt = this.props.firebase.database.ServerValue.TIMESTAMP;
    this.messagingRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messagingRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
      console.log(this.state.messages.username);
    });
  }

  newMessage=(messageContent)=>{
    this.messagingRef.push({
      username: !this.props.user ? "guest" : this.props.user.displayName,
      roomId: this.props.activeKey,
      newMessage: messageContent,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });
  }




  handleChange=(e)=>{
    this.setState({ newMessage: e.target.value });
    console.log(this.state.newMessage);
  }

  handleSubmit=(e)=>{
    e.preventDefault();
    if(!this.state.newMessage){
      return;
    }
    console.log('handlesubmit');
    this.newMessage(this.state.newMessage);
    this.setState({newMessage:''});
  }

  render() {
    const activeKey = this.props.activeKey;
    return <section>
        <div>
          {this.state.messages.map((message, index) => {
            if (activeKey === "") {
              return null;
            } else if (activeKey == message.roomId) {
              return <section className="message-display">
                  <p className="user-name">{message.username}</p>
                  <p key={index} className="message">
                    {message.content} {message.newMessage}
                  </p>
                </section>;
            }
          })}
        </div>
        <section className="message-form">
          <form onSubmit={e => this.handleSubmit(e)}>
            <input type="text" onChange={e => this.handleChange(e)} value={this.state.newMessage} />
          </form>
          <button type="submit" onClick={e => this.handleSubmit(e)}>
            Submit
          </button>
        </section>
      </section>;
  }
}

export default MessageList;
