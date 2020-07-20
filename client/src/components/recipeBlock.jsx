import React, { Component } from "react";

class RecipeBlock extends Component {

  render(props) {
    return (
      <React.Fragment>
        {console.log("hey from RecipeBlock")}
        {console.log(this.props.recipe)}
        <div className="card" style={{ width: '18rem' }}>
          <img className="card-img-top" src={this.props.recipe.images[0].thumbUrl} alt="the thing" />
          <div className="card-body">
            <h5 className="card-title">{this.props.recipe.title}</h5>
            <p className="card-text">{this.props.recipe.instructions}</p>
            <a href={process.env.REACT_APP_API_URL + '/recipes/' + this.props.recipe._id} class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default RecipeBlock;