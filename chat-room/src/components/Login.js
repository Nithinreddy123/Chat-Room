import React from "react";
import { useHistory } from "react-router-dom";

class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <div className="root-div">
          <div className="inner-div">
            <div className="header-line">
              <h3>Join Room</h3>
            </div>
            <form>
              <input
                type="text"
                placeholder="User name"
                name="user_name"
                className="input"
                onChange={(e) => this.props.change(e)}
              />
              <br />

              <input
                type="text"
                placeholder="Room name"
                name="room_name"
                className="input"
                onChange={(e) => this.props.change(e)}
              />
              <br />

              <input
                type="button"
                value="Join room"
                className="join-button"
                onClick={this.props.validate}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
