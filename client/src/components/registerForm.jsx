import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
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
      auth.loginWithJwt(res.headers["x-auth-token"]);
      this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
    console.log("submitted");
  };

  render() {
    return (
      <div className="d-flex h-100">
        <div className="row align-self-center w-100">
          <div className="col-7 mx-auto modal-form row">
            <div className="col-5 left-col bg-info"></div>
            <div className="col-7 right-col">
              <h2>Let's Get Started</h2>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("email", "Email")}
                {this.renderInput("username", "Username")}
                {this.renderInput("password", "Password", "password")}
                {/* {this.renderInput("password2", "Re-enter Password", "password")} */}
                {this.renderButton("Login")}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
