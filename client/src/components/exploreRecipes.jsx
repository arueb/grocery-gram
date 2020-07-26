import React, { Component } from "react";
import { getPublishedRecipes } from "../services/recipeService";

class ExploreRecipes extends Component {
  state = {
    data: "",
    recipes: [],
    pageSize: 8,
    currentPage: 1
  };

  async componentDidMount() {


    try {
      const { data: recipes } = await getPublishedRecipes();
      this.setState({ recipes });
    }
    catch(ex) {
      console.log("Something failed", ex);
    }
  }


  render() {

    const { recipes } = this.state;
    console.log('published recipes:', recipes);

    return (
      <React.Fragment>
        <div className="row sl-page-heading">
          <div className="col-md-6">
            <h2>Explore Recipes</h2>
          </div>
          <div className="col-md-6 new-recipe"></div>
        </div>
        <hr className="divider" />
        <div className="row list-group-row">
          <div className="col-md-6">
            <button>Filter by Category - this is a really long button, </button>
          </div>
          <div className="col-md-6">
            <button>Search - this is also a fairly long button</button>
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

export default ExploreRecipes;
