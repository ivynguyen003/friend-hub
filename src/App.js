import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import User from "./components/User";
import * as firebase from "firebase";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";

var config = {
  apiKey: "AIzaSyAIAFENMjKyeMklX30r5GvmC5PIK1RmDJM",
  authDomain: "chat-app-ivy.firebaseapp.com",
  databaseURL: "https://chat-app-ivy.firebaseio.com",
  projectId: "chat-app-ivy",
  storageBucket: "chat-app-ivy.appspot.com",
  messagingSenderId: "814466748811"
};

firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: "",
      activeKey: "",
      user: "",
      userName:""
    };
  }

  setUser = user => {
    // const userName = {...this.state.user};
    const userName = this.state.user.displayName;
    console.log(user);
    this.setState({ user });
  };

  selectRoom = room => {
    this.setState({ activeKey: room.key });
    this.setState({ activeRoom: room });
    console.log(this.state.activeRoom);
  };

  // deleteRoom = (key)=>{
  //  const selectRoom = this.state.activeRoom;
  //  const value = selectRoom.target.value;
  //  delete selectRoom[value];
  // //  this.setState({activeRoom:selectRoom});
  // } 

  render() {
    return <div className="room-container">
        <aside className="side-bar">
          <h1>Let's Chat</h1>
          <RoomList firebase={firebase} activeRoom={this.selectRoom} deleteRoom={this.deleteRoom} />
        </aside>
        <section className="room-display">
          <section className="user-login">
            <User userName={this.state.user.displayName} setUser={this.setUser} firebase={firebase // signIn={this.handleSignIn}
              } signOut={this.handleSignOut} />
          </section>
          <section className="room-active">
            <h1>{this.state.activeRoom.name}</h1>
          </section>
          <section className="message">
            <MessageList firebase={firebase} activeKey={this.state.activeKey} user={this.state.user} userName={this.state.user.displayName} />
          </section>
        </section>
      </div>;
  }
}

export default App;
