import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { isAuthenticated } from "../services/authService"

class ProtectedRoute extends Component {

  render() {
      console.log("private", this);
      const Component = this.props.component;
     
      return isAuthenticated() ? (
          <Component {...this.props}/>
      ) : (
          <Redirect to={{ pathname: '/login' }} />
      );
  }
}

export default ProtectedRoute;