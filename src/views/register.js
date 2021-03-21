import { Component } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import api from "../utils/api";
import { Link, Switch, Route } from "react-router-dom";
import Login from "./login";
import Alert from "@material-ui/lab/Alert";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      role: "",
      regist_error: false,
    };
  }

  handleRole = (event) => {
    this.setState({ role: event.target.value });
  };

  register = (event) => {
    event.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    const data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    data.append("role", this.state.role);

    api
      .post("auth/register/", data, { headers })
      .then(function (response) {
        alert("Registration succeed");
      })
      .catch(function (error) {
        alert("Registration failed");
      });
  };

  render() {
    return (
      <div>
        <Container maxWidth="sm">
          {this.state.regist_error && (
            <Alert severity="success">
              This is a success alert — check it out!
            </Alert>
          )}
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
            <FormControl>
              <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={this.state.role}
                onChange={this.handleRole}
              >
                <MenuItem value={"S"}>Staff</MenuItem>
                <MenuItem value={"L"}>Lead</MenuItem>
                <MenuItem value={"D"}>Director</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.register.bind(this)}
            >
              Register
            </Button>
          </form>
          <Link to="/login">Login</Link>

          <Switch>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Container>
      </div>
    );
  }
}

export default Register;
