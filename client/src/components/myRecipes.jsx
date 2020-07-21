import React, { Component } from "react";
import * as recipeService from "../services/recipeService";
import RecipeBlock from "./recipeBlock";
import { getCategories } from "../services/categoryService";

class MyRecipes extends Component {
  state = {
    data: "",
    recipes: [
      // {
      //   avgRating: 3.5,
      //   numReviews: 20,
      //   isPublished: true,
      //   _id: "5f15c469ce6c5e2f7ca8a6b5",
      //   title: "midpoint test recipe",
      //   userId: "5f15ac663a4d9d10c0b19d4b",
      //   category: "Noodles",
      //   images: [
      //     {
      //       _id: "5f15c469ce6c5e2f7ca8a6b6",
      //       fullsizeUrl:
      //         "https://storage.googleapis.com/grocerygramapi_bucket/jqFPjlo45_1595262055455.jpeg",
      //       thumbHeight: 200,
      //       thumbUrl:
      //         "https://storage.googleapis.com/grocerygramapi_bucket/AGZtkC-Wyb_thumb_1595262056061.jpeg",
      //       thumbWidth: 200,
      //     },
      //     {
      //       _id: "5f15c469ce6c5e2f7ca8a6b7",
      //       fullsizeUrl:
      //         "https://storage.googleapis.com/grocerygramapi_bucket/Tp5YugtPK_1595262056274.jpg",
      //       thumbHeight: 200,
      //       thumbUrl:
      //         "https://storage.googleapis.com/grocerygramapi_bucket/tUt5Eg4zHv_thumb_1595262056539.jpg",
      //       thumbWidth: 200,
      //     },
      //   ],
      //   instructions: "asdf",
      //   ingredients: [
      //     {
      //       _id: "5f15c469ce6c5e2f7ca8a6b8",
      //       qty: "1/8",
      //       unit: "Dash",
      //       itemId: "5f0f556c5fcb370ff0b48acd",
      //       notes: "gfd",
      //     },
      //   ],
      //   createdOn: "2020-07-20T16:20:57.175Z",
      //   __v: 0,
      // },
      // {
      //   avgRating: 3.5,
      //   numReviews: 20,
      //   isPublished: true,
      //   _id: "5f15c469ce6c5e2f7ca8a6b5",
      //   title: "midpoint test recipe",
      //   userId: "5f15ac663a4d9d10c0b19d4b",
      //   category: "Noodles",
      //   images: [
      //     {
      //       _id: "5f15c469ce6c5e2f7ca8a6b6",
      //       fullsizeUrl:
      //         "https://storage.googleapis.com/grocerygramapi_bucket/jqFPjlo45_1595262055455.jpeg",
      //       thumbHeight: 200,
      //       thumbUrl:
      //         "https://storage.googleapis.com/grocerygramapi_bucket/AGZtkC-Wyb_thumb_1595262056061.jpeg",
      //       thumbWidth: 200,
      //     },
      //     {
      //       _id: "5f15c469ce6c5e2f7ca8a6b7",
      //       fullsizeUrl:
      //         "https://storage.googleapis.com/grocerygramapi_bucket/Tp5YugtPK_1595262056274.jpg",
      //       thumbHeight: 200,
      //       thumbUrl:
      //         "https://storage.googleapis.com/grocerygramapi_bucket/tUt5Eg4zHv_thumb_1595262056539.jpg",
      //       thumbWidth: 200,
      //     },
      //   ],
      //   instructions: "asdf",
      //   ingredients: [
      //     {
      //       _id: "5f15c469ce6c5e2f7ca8a6b8",
      //       qty: "1/8",
      //       unit: "Dash",
      //       itemId: "5f0f556c5fcb370ff0b48acd",
      //       notes: "gfd",
      //     },
      //   ],
      //   createdOn: "2020-07-20T16:20:57.175Z",
      //   __v: 0,
      // },
      // {
      //   avgRating: 3.5,
      //   numReviews: 20,
      //   isPublished: true,
      //   _id: "5f15c469ce6c5e2f7ca8a6b5",
      //   title: "midpoint test recipe",
      //   userId: "5f15ac663a4d9d10c0b19d4b",
      //   category: "Noodles",
      //   images: [
      //     {
      //       _id: "5f15c469ce6c5e2f7ca8a6b6",
      //       fullsizeUrl:
      //         "https://storage.googleapis.com/grocerygramapi_bucket/jqFPjlo45_1595262055455.jpeg",
      //       thumbHeight: 200,
      //       thumbUrl:
      //         "https://storage.googleapis.com/grocerygramapi_bucket/AGZtkC-Wyb_thumb_1595262056061.jpeg",
      //       thumbWidth: 200,
      //     },
      //     {
      //       _id: "5f15c469ce6c5e2f7ca8a6b7",
      //       fullsizeUrl:
      //         "https://storage.googleapis.com/grocerygramapi_bucket/Tp5YugtPK_1595262056274.jpg",
      //       thumbHeight: 200,
      //       thumbUrl:
      //         "https://storage.googleapis.com/grocerygramapi_bucket/tUt5Eg4zHv_thumb_1595262056539.jpg",
      //       thumbWidth: 200,
      //     },
      //   ],
      //   instructions: "asdf",
      //   ingredients: [
      //     {
      //       _id: "5f15c469ce6c5e2f7ca8a6b8",
      //       qty: "1/8",
      //       unit: "Dash",
      //       itemId: "5f0f556c5fcb370ff0b48acd",
      //       notes: "gfd",
      //     },
      //   ],
      //   createdOn: "2020-07-20T16:20:57.175Z",
      //   __v: 0,
      // },
      // {
      //   avgRating: 3.5,
      //   numReviews: 20,
      //   isPublished: true,
      //   _id: "5f15c469ce6c5e2f7ca8a6b5",
      //   title: "midpoint test recipe",
      //   userId: "5f15ac663a4d9d10c0b19d4b",
      //   category: "Noodles",
      //   images: [
      //     {
      //       _id: "5f15c469ce6c5e2f7ca8a6b6",
      //       fullsizeUrl:
      //         "https://storage.googleapis.com/grocerygramapi_bucket/jqFPjlo45_1595262055455.jpeg",
      //       thumbHeight: 200,
      //       thumbUrl:
      //         "https://storage.googleapis.com/grocerygramapi_bucket/AGZtkC-Wyb_thumb_1595262056061.jpeg",
      //       thumbWidth: 200,
      //     },
      //     {
      //       _id: "5f15c469ce6c5e2f7ca8a6b7",
      //       fullsizeUrl:
      //         "https://storage.googleapis.com/grocerygramapi_bucket/Tp5YugtPK_1595262056274.jpg",
      //       thumbHeight: 200,
      //       thumbUrl:
      //         "https://storage.googleapis.com/grocerygramapi_bucket/tUt5Eg4zHv_thumb_1595262056539.jpg",
      //       thumbWidth: 200,
      //     },
      //   ],
      //   instructions: "asdf",
      //   ingredients: [
      //     {
      //       _id: "5f15c469ce6c5e2f7ca8a6b8",
      //       qty: "1/8",
      //       unit: "Dash",
      //       itemId: "5f0f556c5fcb370ff0b48acd",
      //       notes: "gfd",
      //     },
      //   ],
      //   createdOn: "2020-07-20T16:20:57.175Z",
      //   __v: 0,
      // },
    ],
  };

  onNewRecipe = () => {
    // test for user logged in?
    // console.log("clicked button");
    window.location = "/my-recipes/new";
  };

  async componentDidMount() {
    console.log(this.state);
    try {
      console.log("predownload");
      const { data: recipes } = await recipeService.getRecipes();
      this.setState({ recipes });
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

  handleFilterByCategory = ({ currentTarget: input }) => {
    console.log("filter by category...");
  };

  render() {
    const options = getCategories();
    // const optionsPlus = ["Filter by Category", ...options]

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
              role="group"
              aria-label="Type of Recipes"
            >
              <button type="button" className="btn btn-outline-dark">
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
      </React.Fragment>
    );
  }
}

export default MyRecipes;
