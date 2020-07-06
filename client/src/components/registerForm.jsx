import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

// import { toast } from "react-toastify";

import * as userService from "../services/userService";
// import auth from "../services/authService";
// import { login } from "../services/authService";

class RegisterForm extends Form {
  //   username = React.createRef(); //as a best practice, minimize the user of ref
  // gives the username field focus upon loading the component

  //   componentDidMount() {
  //     this.username.current.focus();
  //   }
  state = {
    data: { username: "", email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
  };

  doSubmit = async () => {
    try {
      const res = await userService.register(this.state.data);
      console.log(res);
      //   auth.loginWithJwt(res.headers["x-auth-token"]);
      //   this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        // toast.error("The username is already taken");
      }
    }
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
