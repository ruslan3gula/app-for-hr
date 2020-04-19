import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import fire from "./config";

import { render } from "react-dom";
// import Button from "material-ui/Button";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { CardHeader, CardContent, CardActions } from "@material-ui/core";

import ResponsiveCard from "./ResponsiveCard.js";
import ResponsiveContainerGrid from "./ResponsiveContainerGrid.js";

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.props.saveUser(user);
        this.props.history.push("/home");
      })
      .catch(error => {
        console.log(error);
      });
  }

  signup(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { error } = this.props.error;
    return (
      <div>
        {/* <ResponsiveContainerGrid> */}
        <Grid item xs={12} sm={6}>
          {/* <ResponsiveCard> */}
          <form>
            <CardHeader
              title="Sign in"
              subheader="to the system
                "
            />

            <CardContent>
              <TextField
                value={this.state.email}
                onChange={this.handleChange}
                type="email"
                name="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              {/* <small id="emailHelp" class="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small> */}

              <TextField
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                name="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </CardContent>
            <CardActions style={{ justifyContent: "space-between" }}>
              <Button
                type="submit"
                style={{ marginLeft: "25px" }}
                onClick={this.login}
                class="btn btn-primary"
              >
                Login
              </Button>
              <Button
                onClick={this.signup}
                style={{ marginLeft: "25px" }}
                className="btn btn-success"
              >
                Signup
              </Button>
            </CardActions>
          </form>
          {/* </ResponsiveCard> */}
        </Grid>
        {/* </ResponsiveContainerGrid> */}
        <h3>{error}</h3>
      </div>
    );
  }
}
export default withRouter(Login);
