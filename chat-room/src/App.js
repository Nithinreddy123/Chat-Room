import React from "react";

import "./App.css";
import Login from "./components/Login";
import Success from "./components/Success";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      room_name: "",
      isLogged: false,
    };
  }
  change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  validate = () => {
    if (this.state.user_name) {
      this.setState({ isLogged: true });
    } else alert("Name cannot be Empty");
  };

  render() {
    if (!this.state.isLogged) {
      return (
        <Router>
          <div className="App">
            <Login validate={this.validate} change={this.change} />
          </div>
        </Router>
      );
    } else {
      return <Success user={this.state.user_name} room_name={this.state.room_name}/>
    }
  }
}

export default App;
