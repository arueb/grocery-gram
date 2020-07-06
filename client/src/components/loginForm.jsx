import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";

class LoginForm extends Form {
  //   username = React.createRef(); //as a best practice, minimize the user of ref
  // gives the username field focus upon loading the component

  //   componentDidMount() {
  //     this.username.current.focus();
  //   }
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  doSubmit = async () => {
    try {
      const { email, password } = this.state.data;
      await auth.login(email, password);
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
      <React.Fragment>
        <div>
          <h1>Login</h1>

          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
