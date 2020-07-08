import React from "react";
import Form from "./common/form";
import Joi, { ref } from "joi-browser";
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

      const { state } = this.props.location;
      console.log(state);
      window.location = state ? state.from.pathname : "/";
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
        <section id="register-form">
          <div className="col-lg-8 col-xl-7 mx-auto modal-form row">
            <div className="col-md-5 left-col bg-info"></div>
            <div className="col-md-7 right-col">
              <h2>Welcome Back</h2>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("email", "Email")}
                {this.renderInput("password", "Password", "password")}
                {this.renderButton("Login")}
              </form>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default LoginForm;
