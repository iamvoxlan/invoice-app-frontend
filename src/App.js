import logo from "./logo.svg";
import "./App.css";
import Login from "./views/login";
import Register from "./views/register";
import Invoice from "./views/invoice";
import Create from "./views/create"
import Home from "./views/home";
import Edit from "./views/edit"
import { Component } from "react";
import cookie from "react-cookies";
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  render() {
    const token = cookie.load("token");
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/">
              {token ? <Home /> : <Login />}
            </Route>
            <Route exact path="/invoice/:id" component={Invoice} />
            <Route exact path="/edit/:id" component={Edit} />
            <Route exact path="/create">
              <Create />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
