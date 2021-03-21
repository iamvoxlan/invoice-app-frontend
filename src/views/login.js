import { Component } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import api from "../utils/api";
import Register from "./register";
import { Link, Redirect } from "react-router-dom";
import cookie from "react-cookies";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  login = (event) => {
    event.preventDefault();

    const headers = {
      "Content-Type": "application/json",
    };
    const data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);

    api
      .post("auth/login/", data, { headers })
      .then(function (response) {
        cookie.save("token", response.data.data.tokens.access, {
          path: "/",
        });
        window.location = "/"
      })
      .catch(function (error) {
        alert("Login failed");
      });
  };

  render() {
    return (
      <div>
        <Container maxWidth="sm">
          <form>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => this.setState({ username: e.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.login}
            >
              Login
            </Button>
          </form>
          <Link to="/register">Register</Link>
        </Container>
      </div>
    );
  }
}

export default Login;
