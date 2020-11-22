import React from "react";
import "./css/HomeContainer.css";
import send_message from "./images/send_message.svg";

class Success extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      current_message: "",
    };
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount() {
    this.soc_conn = new WebSocket(
      `ws://localhost:3033/${this.props.room_name}`
    );
    this.soc_conn.onopen = () => {
      console.log("connection initiated");
    };
    this.soc_conn.onmessage = (message) => {
      this.renderOthersMessages(JSON.parse(message.data));
    };
  }

  renderOthersMessages = (message) => {
    let msg_to_render = (
      <div className="chat-message bot-mode">
        <div className="chat-bot-message-box">
          <div className="chat-bot-message">
            <div align="left">
              <p
                style={{
                  fontSize: "11px",
                  margin: "0",
                  color: "green",
                  marginBottom: "3px",
                }}
              >
                {message.name}
              </p>
            </div>
            <div style={{ overflowWrap: "break-word" }}>{message.msg}</div>
            <div align="right">
              <span className="chat-bot-message-time">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );

    this.setState({ messages: [...this.state.messages, msg_to_render] });
  };

  updateUserMessage = () => {
    let user_render_msg = (
      <div  className="chat-message">
        <div className="chat-user-message">
          <div style={{ overflowWrap: "break-word" }}>
            {this.state.current_message}
          </div>
          <div align="right">
            <span className="chat-bot-message-time">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
        
      </div>
    );
    this.setState({messages:[...this.state.messages,user_render_msg]})
  };

  sendMsg = () => {
    if (this.state.current_message !== "") {
      this.updateUserMessage();
      this.payload = { name: this.props.user, msg: this.state.current_message };
      this.soc_conn.send(JSON.stringify(this.payload));
      this.setState({ current_message: "" });
    }
  };
  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.sendMsg();
    }
  };
  scrollToBottom() {
    this.el.scrollIntoView({ behavior: "smooth" });
  }
  render() {
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <div className="chat-window">
          <div className="chat-box">
            <div className="chat-header">
              <div style={{ display: "flex", width: "100%" }}>
                <div
                  style={{ paddingTop: 17, paddingLeft: 7, margin: "0 auto" }}
                >
                  <small style={{ fontSize: 14 }}>
                    Room : {this.props.room_name}
                  </small>
                </div>
              </div>
            </div>
            <div className="chat-body" id="chat-body">
              {this.state.messages}
              <div
                ref={(el) => {
                  this.el = el;
                }}
              />
            </div>
            <div className="chat-footer">
              <div className="footer-contents">
                <input
                  style={{ padding: 3 }}
                  autoComplete="off"
                  className="chat-input"
                  placeholder="Enter your message"
                  value={this.state.current_message}
                  name="current_message"
                  onKeyDown={(e) => this._handleKeyDown(e)}
                  onChange={(e) =>
                    this.setState({ current_message: e.target.value })
                  }
                />
              </div>

              <div
                className="footer-send-message"
                onClick={(e) => this.sendMsg()}
              >
                <img src={send_message} alt="send" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Success;
