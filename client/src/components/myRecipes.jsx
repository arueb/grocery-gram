import React, { Component } from "react";

class MyRecipes extends Component {
  state = {};
  render() {
    return (
    <React.Fragment>
      <div className="row sl-page-heading">
        <div className="col-md-9">
          <h2>My Recipes</h2>
        </div>
        <div className="col-md">
          <button className="">+ New Recipe</button>
        </div>
      </div>
    </React.Fragment>
    )
  }
}

export default MyRecipes;
