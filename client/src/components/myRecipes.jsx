import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

class MyRecipes extends Component {
  state = {};

  onNewRecipe = () => {
    // test for user logged in?
    console.log('clicked button')
    // return <Redirect to="/my-recipes/new" />
    window.location = "/my-recipes/new"
  }

  render() {
    return (
      <React.Fragment>
        <div className="row sl-page-heading">
          <div className="col-md-4">
            <h2>My Recipes</h2>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4 new-recipe">
            <button
              onClick={this.onNewRecipe}
              className="btn btn-primary">+ New Recipe</button>
          </div>
        </div>
        <hr className="divider"/>
        <div className="row mr-button-row">
          <div className="col-md-4">
            <button>All</button>
            <button>Saved</button>
            <button>My Own</button>
          </div>
          <div className="col-md-4">
            <button>Filter by Category</button>
          </div>
          <div className="col-md-4">
            <button>Search</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <div className="col-md-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <div className="col-md-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MyRecipes;
