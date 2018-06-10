import React, { Component } from "react";
import UserImage from "../profile.png";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faUserPlus from "@fortawesome/fontawesome-free-solid/faUserPlus";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";
import "./RoomList.css";
import "../App.css";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      name: ""
    };
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room), name: "" });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.name) {
      return;
    }
    this.roomsRef.push({ name: this.state.name });
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  activeRoom(room) {
    this.props.activeRoom(room);
  }

  deleteRoom(key){
    this.props.deleteRoom(key);
  }

  render() {
    return <section>
        <div className="header">
          <img className="user" src={UserImage} alt={"userimage"} />
        </div>
        <div>
          <form onSubmit={e => this.handleSubmit(e)}>
            <input name="text" value={this.state.name} onChange={e => this.handleChange(e)} />
            <button type="submit">
              <FontAwesomeIcon icon={faUserPlus} pulse className="search" transform="grow-6" />
            </button>
          </form>
        </div>
        <section className="room-list">
          {this.state.rooms.map((room, index) => (
            <ul className="each-room" key={index}>
              <li onClick={() => this.props.activeRoom(room)}>
                {room.name}
              </li>
              <button onClick={(key)=>this.props.deleteRoom(key)} value={index}>
                  <FontAwesomeIcon
                    icon={faTimes}
                  />
              </button>
            </ul>
          ))}
        </section>
      </section>;
  }
}

export default RoomList;
