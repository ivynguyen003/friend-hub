import React, { Component } from "react";
import App from "../App";

class User extends Component {

  handleSignIn = () => {
    console.log("sign in");
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  };

  handleSignOut = () => {
    console.log("sign out");
    this.props.firebase.auth().signOut();
  };

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged(user =>{this.props.setUser(user);
    })}

  render() {
    return <section className="user-auth">
        {this.props.user && <h3 className="user-name">
            {this.props.user.displayName}
          </h3>}
        {/* <h3 className="user-name">{!this.props.user ? null : this.props.user.displayName}</h3> */}
        <button className="sign-in" onClick={this.handleSignIn}>
          Sign In
        </button>
        <button className="sign-out" onClick={this.handleSignOut}>
          Sign Out
        </button>
      </section>;
  }
}

export default User;
