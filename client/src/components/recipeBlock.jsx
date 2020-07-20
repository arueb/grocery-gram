import React, { Component } from "react";

class RecipeBlock extends Component {

  render(props) {
    return (
      <React.Fragment>
        {console.log("hey from RecipeBlock")}
        <p>{this.props._id}</p>
      </React.Fragment>
    )
  }
}

export default RecipeBlock;