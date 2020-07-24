import React, { Component } from "react";
import { getUserRecipes } from "../services/userService";
import RecipeBlock from "./recipeBlock";
import { getCategories } from "../services/categoryService";
import Pagination from "./common/pagination";

class MyRecipes extends Component {
  state = {
    data: "",
    recipes: [],
    pageSize: 4,
  };

  onNewRecipe = () => {
    // test for user logged in?
    window.location = "/my-recipes/new";
  };

  async componentDidMount() {
    console.log("CDM props:", this.props);
    console.log(this.state);
    try {
      console.log("predownload");
      //   const { data: recipes } = await recipeService.getRecipes();
      const user = this.props.user;
      if (user) {
        const { data: recipes } = await getUserRecipes(user._id);
        this.setState({ recipes });
      }
      // console.log("postdownload");
      // console.log(this.state.recipes[0]);
      //this.renderRecipeBlocks()
    } catch (ex) {
      // console.log(ex);
    }
    console.log(this.state);
  }

  renderRecipeBlocks(recipes) {
    let items = [];
    if (recipes) {
      recipes.forEach(function (recipe) {
        items.push(<RecipeBlock key={recipe._id} recipe={recipe} />);
      });
    }
    return items;
  }

  handleOwnership = (type) => {
    if (type === "all") {
      console.log("showing all ");
    }
  };

  handleFilterByCategory = ({ currentTarget: input }) => {
    console.log("filter by category...");
  };

  handlePageChange = page => {
    console.log(page);
  };

  render() {
    const options = getCategories();
    // const optionsPlus = ["Filter by Category", ...options]
    const { recipes, pageSize } = this.state;

    return (
      <React.Fragment>
        <div className="row sl-page-heading">
          <div className="col-md-4">
            <h2>My Recipes</h2>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4 new-recipe">
            <button onClick={this.onNewRecipe} className="btn btn-dark">
              + New Recipe
            </button>
          </div>
        </div>
        <hr className="divider" />
        <div className="row mr-button-row">
          <div className="col-md-3">
            <div
              className="btn-group"
              data-toggle="button"
              role="group"
              aria-label="Type of Recipes"
            >
              <button
                onClick={() => this.handleOwnership("all")}
                type="button"
                className="btn btn-outline-dark active"
              >
                All
              </button>
              <button type="button" className="btn btn-outline-dark">
                Saved
              </button>
              <button type="button" className="btn btn-outline-dark">
                My Own
              </button>
            </div>
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              id="mr-category"
              name="mr-category"
              // onChange="this.handleFilterByCategory"
            >
              <option selected disabled value="">
                Filter by Category
              </option>
              {options.map((option) => (
                <option key={option._id} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <input type="text" value="Search" className="form-control"></input>
          </div>
        </div>
        <div className="row">{this.renderRecipeBlocks(this.state.recipes)}</div>
        <Pagination
          onPageChange={this.handlePageChange}
          recipesCount={recipes.length}
          pageSize={pageSize} />
      </React.Fragment>
    );
  }
}

export default MyRecipes;
