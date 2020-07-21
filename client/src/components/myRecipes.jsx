import React, { Component } from "react";

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
              className="btn btn-dark">+ New Recipe</button>
          </div>
        </div>
        <hr className="divider"/>
        <div className="row mr-button-row">
          <div className="col-md-4">
            <div
              className="btn-group"
              role="group"
              aria-label="Type of Recipes"
            >
              <button type="button" class="btn btn-outline-dark">
                All
              </button>
              <button type="button" class="btn btn-outline-dark">
                Saved
              </button>
              <button type="button" class="btn btn-outline-dark">
                My Own
              </button>              
            </div>
          </div>
          <div className="col-md-4">
            <button>Filter by Category</button>
          </div>
          <div className="col-md-4">
            <button>Search</button>
          </div>
        </div>
       
      </React.Fragment>
    );
  }
}

export default MyRecipes;
