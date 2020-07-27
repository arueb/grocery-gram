import React, { Component } from "react";
import { getPublishedRecipes } from "../services/recipeService";
import { getAllCategories } from "../services/categoryService";
import RecipeBlock from "./recipeBlock";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class ExploreRecipes extends Component {
  state = {
    data: "",
    recipes: [],
    pageSize: 8,
    currentPage: 1,
    selectValue: "",
  };

  getInitialSelectVal() {
    return "Select a Category";
  }

  async componentDidMount() {
    this.setState({ selectValue: this.getInitialSelectVal() });

    try {
      const user = this.props.user;

      if (user) {
        const { data: recipes } = await getPublishedRecipes();
        this.setState({ recipes });
      }
    } catch (ex) {
      console.log("Something failed", ex);
    }
  }

  renderExploreRecipeBlocks(recipes, userId) {
    let items = [];
    if (recipes) {
      recipes.forEach(function (recipe) {
        items.push(
          <RecipeBlock
            userId={userId}
            key={recipe._id}
            recipe={recipe}
            forExplore={true}
          />
        );
      });
    }
    return items;
  }

  handleFilterByCategory = (event) => {
    // console.log("you chose", event.target.value);
    this.setState({ selectValue: event.target.value, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const {
      recipes: allRecipes,
      selectValue,
      pageSize,
      currentPage,
    } = this.state;

    console.log('allRecipes from render:', allRecipes);

    // const { user } = this.props;

    const options = getAllCategories();

    let filtered = allRecipes;
    if (selectValue === this.getInitialSelectVal() || selectValue === "") {
      filtered = allRecipes;
    } else {
      filtered = allRecipes.filter((r) => r.category === selectValue);
    }

    const recipes = paginate(filtered, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="row sl-page-heading">
          <div className="col-md">
            <h2>Explore Recipes</h2>
          </div>
        </div>
        <hr className="divider" />
        <div className="row list-group-row">
          <div className="col-md-6">
            <select
              className="form-control"
              id="mr-category"
              name="mr-category"
              onChange={this.handleFilterByCategory}
              value={selectValue}
            >
              <option disabled>{this.getInitialSelectVal()}</option>
              {options.map((option) => (
                <option key={option._id} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">Search Box Coming Soon...</div>
        </div>
        <div className="row">
          {console.log('userId:', this.props.user._id)}
          {this.renderExploreRecipeBlocks(recipes, this.props.user._id)}
        </div>
        <Pagination
          recipesCount={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default ExploreRecipes;
