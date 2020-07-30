import React, { Component, Route } from 'react'
import { Redirect } from 'react-router-dom'

class ProtectedRoute extends Component {

  render() {
    const path = this.props.path;
    const Component = this.props.component;
    const isAuthenticated = true;

    return isAuthenticated ? (
      <Route
        path={path}
        render={(props) => <Component {...props} />}
      />
    ) : (
        <Redirect to={{ pathname: '/login' }} />
      );
  }
}

export default ProtectedRoute;