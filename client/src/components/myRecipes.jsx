import React, { Component } from "react";
import * as recipeService from "../services/recipeService";
import RecipeBlock from "./recipeBlock";

class MyRecipes extends Component {
  state = {
    data: "",
    recipes: [{
      avgRating: 3.5,
      numReviews: 20,
      isPublished: true,
      _id: "5f15c469ce6c5e2f7ca8a6b5",
      title: "midpoint test recipe",
      userId: "5f15ac663a4d9d10c0b19d4b",
      category: "Noodles",
      images: [
        {
          _id: "5f15c469ce6c5e2f7ca8a6b6",
          fullsizeUrl: "https://storage.googleapis.com/grocerygramapi_bucket/jqFPjlo45_1595262055455.jpeg",
          thumbHeight: 200,
          thumbUrl: "https://storage.googleapis.com/grocerygramapi_bucket/AGZtkC-Wyb_thumb_1595262056061.jpeg",
          thumbWidth: 200
        },
        {
          _id: "5f15c469ce6c5e2f7ca8a6b7",
          fullsizeUrl: "https://storage.googleapis.com/grocerygramapi_bucket/Tp5YugtPK_1595262056274.jpg",
          thumbHeight: 200,
          thumbUrl: "https://storage.googleapis.com/grocerygramapi_bucket/tUt5Eg4zHv_thumb_1595262056539.jpg",
          thumbWidth: 200
        }],
      instructions: "asdf",
      ingredients: [{
        _id: "5f15c469ce6c5e2f7ca8a6b8",
        qty: "1/8",
        unit: "Dash",
        itemId: "5f0f556c5fcb370ff0b48acd",
        notes: "gfd"
      }],
      createdOn: "2020-07-20T16:20:57.175Z",
      __v: 0
    },
    {
      avgRating: 3.5,
      numReviews: 20,
      isPublished: true,
      _id: "5f15c469ce6c5e2f7ca8a6b5",
      title: "midpoint test recipe",
      userId: "5f15ac663a4d9d10c0b19d4b",
      category: "Noodles",
      images: [
        {
          _id: "5f15c469ce6c5e2f7ca8a6b6",
          fullsizeUrl: "https://storage.googleapis.com/grocerygramapi_bucket/jqFPjlo45_1595262055455.jpeg",
          thumbHeight: 200,
          thumbUrl: "https://storage.googleapis.com/grocerygramapi_bucket/AGZtkC-Wyb_thumb_1595262056061.jpeg",
          thumbWidth: 200
        },
        {
          _id: "5f15c469ce6c5e2f7ca8a6b7",
          fullsizeUrl: "https://storage.googleapis.com/grocerygramapi_bucket/Tp5YugtPK_1595262056274.jpg",
          thumbHeight: 200,
          thumbUrl: "https://storage.googleapis.com/grocerygramapi_bucket/tUt5Eg4zHv_thumb_1595262056539.jpg",
          thumbWidth: 200
        }],
      instructions: "asdf",
      ingredients: [{
        _id: "5f15c469ce6c5e2f7ca8a6b8",
        qty: "1/8",
        unit: "Dash",
        itemId: "5f0f556c5fcb370ff0b48acd",
        notes: "gfd"
      }],
      createdOn: "2020-07-20T16:20:57.175Z",
      __v: 0
    },
    {
      avgRating: 3.5,
      numReviews: 20,
      isPublished: true,
      _id: "5f15c469ce6c5e2f7ca8a6b5",
      title: "midpoint test recipe",
      userId: "5f15ac663a4d9d10c0b19d4b",
      category: "Noodles",
      images: [
        {
          _id: "5f15c469ce6c5e2f7ca8a6b6",
          fullsizeUrl: "https://storage.googleapis.com/grocerygramapi_bucket/jqFPjlo45_1595262055455.jpeg",
          thumbHeight: 200,
          thumbUrl: "https://storage.googleapis.com/grocerygramapi_bucket/AGZtkC-Wyb_thumb_1595262056061.jpeg",
          thumbWidth: 200
        },
        {
          _id: "5f15c469ce6c5e2f7ca8a6b7",
          fullsizeUrl: "https://storage.googleapis.com/grocerygramapi_bucket/Tp5YugtPK_1595262056274.jpg",
          thumbHeight: 200,
          thumbUrl: "https://storage.googleapis.com/grocerygramapi_bucket/tUt5Eg4zHv_thumb_1595262056539.jpg",
          thumbWidth: 200
        }],
      instructions: "asdf",
      ingredients: [{
        _id: "5f15c469ce6c5e2f7ca8a6b8",
        qty: "1/8",
        unit: "Dash",
        itemId: "5f0f556c5fcb370ff0b48acd",
        notes: "gfd"
      }],
      createdOn: "2020-07-20T16:20:57.175Z",
      __v: 0
    },
    {
      avgRating: 3.5,
      numReviews: 20,
      isPublished: true,
      _id: "5f15c469ce6c5e2f7ca8a6b5",
      title: "midpoint test recipe",
      userId: "5f15ac663a4d9d10c0b19d4b",
      category: "Noodles",
      images: [
        {
          _id: "5f15c469ce6c5e2f7ca8a6b6",
          fullsizeUrl: "https://storage.googleapis.com/grocerygramapi_bucket/jqFPjlo45_1595262055455.jpeg",
          thumbHeight: 200,
          thumbUrl: "https://storage.googleapis.com/grocerygramapi_bucket/AGZtkC-Wyb_thumb_1595262056061.jpeg",
          thumbWidth: 200
        },
        {
          _id: "5f15c469ce6c5e2f7ca8a6b7",
          fullsizeUrl: "https://storage.googleapis.com/grocerygramapi_bucket/Tp5YugtPK_1595262056274.jpg",
          thumbHeight: 200,
          thumbUrl: "https://storage.googleapis.com/grocerygramapi_bucket/tUt5Eg4zHv_thumb_1595262056539.jpg",
          thumbWidth: 200
        }],
      instructions: "asdf",
      ingredients: [{
        _id: "5f15c469ce6c5e2f7ca8a6b8",
        qty: "1/8",
        unit: "Dash",
        itemId: "5f0f556c5fcb370ff0b48acd",
        notes: "gfd"
      }],
      createdOn: "2020-07-20T16:20:57.175Z",
      __v: 0
    },]
  };

  onNewRecipe = () => {
    // test for user logged in?
    console.log('clicked button')
    // return <Redirect to="/my-recipes/new" />
    window.location = "/my-recipes/new"
  }

  async componentDidMount() {
    console.log(this.state);
    try {
      console.log("predownload");
      const { data: recipes } = await recipeService.getRecipes();
      this.setState({ recipes });
      console.log("postdownload")
      console.log(this.state.recipes[0]);
      //this.renderRecipeBlocks()
    } catch (ex) {
      console.log(ex);
    }
    console.log(this.state);
  }

  renderRecipeBlocks(recipes) {
    let items = [];
    if (recipes) {
      recipes.map(function (recipe) {
        items.push(<RecipeBlock recipe={recipe} />)
      })
    }
    return items;
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
        <hr className="divider" />
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
        {this.renderRecipeBlocks(this.state.recipes)}
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
