import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          content: "",
          roomId: "",
          sentAt: "",
          username: ""
        }
      ]
    };
    this.state.messages.sentAt = this.props.firebase.database.ServerValue.TIMESTAMP;
    this.messagingRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messagingRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message), content:"" });
      console.log(this.state.messages.username);
    });
  }

  handleSubmit(e){
    e.preventDefault();
    if(!this.state.name){
      return;
    }
    this.messagingRef.push({content:this.state.content})
  }

  handleChange(e){
    this.setState({content: e.target.value})
  }

  userName(user){
    this.props.userName(user);
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
                    {message.content}
                  </p>
                </section>;
            }
          })}
        </div>
        <section className="message-form">
          <form onSubmit={e => this.handleSubmit(e)}>
            <input type="text" onChange={e => this.handleChange(e)} />
          </form>
          <button type="submit">Submit</button>
        </section>
        <section className="message-list">
        {this.state.messages.map((message,index)=>(
          <ul className="each-message" key={index}>
          <li onClick={() => this.props.setUser(user)}>{message.content}</li>
          </ul>
        ))}
        </section>
      </section>
  }
}

export default MessageList;
