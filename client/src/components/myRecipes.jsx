import React, { Component } from "react";
import { getUserRecipes } from "../services/userService";
import RecipeBlock from "./recipeBlock";
import { getCategories } from "../services/categoryService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";

class MyRecipes extends Component {
  state = {
    data: "",
    recipes: [],
    pageSize: 8,
    currentPage: 1,
    listGroupLabels: ["All", "Saved", "My Own"],
    selectedOwnerType: "All",
    selectValue: "",
  };

  getInitialSelectVal() {
    return "Select a Category";
  }

  onNewRecipe = () => {
    window.location = "/my-recipes/new";
  };

  async componentDidMount() {
    this.setState({ selectValue: this.getInitialSelectVal() });

    try {
      const user = this.props.user;
      if (user) {
        const { data: recipes } = await getUserRecipes(user._id);
        this.setState({ recipes });
      }
    } catch (ex) {
      console.log("Something failed", ex);
    }
  }

  renderRecipeBlocks(recipes, userId) {
    let items = [];
    if (recipes) {
      recipes.forEach(function (recipe) {
        items.push(
          <RecipeBlock userId={userId} key={recipe._id} recipe={recipe} />
        );
      });
    }
    return items;
  }

  handleOwnerSelect = (ownerType) => {
    this.setState({ selectedOwnerType: ownerType, currentPage: 1 });
  };

  handleFilterByCategory = (event) => {
    // console.log("you chose", event.target.value);
    this.setState({ selectValue: event.target.value });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const {
      recipes: allRecipes,
      pageSize,
      currentPage,
      listGroupLabels,
      selectedOwnerType,
      selectValue,
    } = this.state;

    const { user } = this.props;

    const options = getCategories();

    let filtered;
    if (selectedOwnerType) {
      if (selectedOwnerType === "Saved") {
        filtered = allRecipes.filter((r) => r.userId !== user._id);
      } else if (selectedOwnerType === "My Own") {
        filtered = allRecipes.filter((r) => r.userId === user._id);
      } else {
        filtered = allRecipes;
      }
    }

    let filteredByCat = filtered;
    if (selectValue === this.getInitialSelectVal() || selectValue === "") {
      filteredByCat = filtered;
    } else {
      filteredByCat = filtered.filter((r) => r.category === selectValue);
    }

    const recipes = paginate(filteredByCat, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="row sl-page-heading">
          <div className="col-md-4">
            <h2>My Recipes</h2>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4 new-recipe">
            <button onClick={this.onNewRecipe} className="btn btn-dark">
              New Recipe +
            </button>
          </div>
        </div>
        <hr className="divider" />
        <div className="row list-group-row">
          <div className="col-md-4">
            <ListGroup
              items={listGroupLabels}
              selectedItem={selectedOwnerType}
              onItemSelect={this.handleOwnerSelect}
            />
          </div>
          <div className="col-md-4">
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
          <div className="col-md-4">
            Search Box Coming Soon...
            {/* <input type="text" value="Search" className="form-control"></input> */}
          </div>
        </div>
        <div className="row">
          {this.renderRecipeBlocks(recipes, this.props.user._id)}
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

export default MyRecipes;
