import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import http from "../services/httpService";
import { getUnits } from "../services/unitService";
import { getQuantities } from "../services/qtyService";
import { getCategories } from "../services/categoryService";
import { getRecipe } from "../services/recipeService";
import { FaTrash } from "react-icons/fa";
import ItemSearch from "../components/itemSearch";
import * as recipeService from "../services/recipeService";

//const UPLOAD_LIST_PLACEHOLDER =
//  process.env.REACT_APP_SERVER_URL + "/images/image-uploader-blank.jpg";

class RecipeForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      units: [],
      quantities: [],
      rows: [{}],
      data: {
        title: "",
        category: "",
        isPublished: false,
        instructions: "",
        filesToUpload: [],
      },
      ingredients: [{ qty: "", unit: "", itemId: "", notes: "" }],
    };
    this.handleThumbnailAdd = this.handleThumbnailAdd.bind(this);
    this.fileInput = React.createRef();
  }

  schema = {
    title: Joi.string().min(5).required().label("Recipe Name"),
    category: Joi.string().required().label("Recipe Category"),
    isPublished: Joi.boolean().required().label("Recipe Published Slider"),
    instructions: Joi.string().required().label("Recipe Instructions"),
    filesToUpload: Joi.array().required().min(1).label("Files"),
    qty: Joi.string().required().label("Qty"),
    unit: Joi.string().required().label("Unit"),
    itemId: Joi.string().required().label("Item"),
    notes: Joi.string().label("Notes"),
  };

  // This is used to make the images picker/uploader
  ImagePreviews = (props) => (
    <div>
      {props.items.map((item, index) => (
        <img
          key={item + index}
          id={item.fileId}
          src={URL.createObjectURL(item)}
          alt={index}
          //   style={{ height: "50px" }}
          style={{ height: "80px" }}
          onClick={props.onClick}
        />
      ))}
    </div>
  );

  handleThumbnailAdd(e) {
    if (e.target.files.length === 0) {
      return;
    }

    let newFile = e.target.files[0];

    newFile.fileId = Date.now();

    let updatedFiles = this.state.data.filesToUpload;
    this.setState({
      data: {
        ...this.state.data,
        filesToUpload: [newFile].concat(updatedFiles),
      },
    });
  }

  handleThumbnailRemove(e) {
    let originalArray = [...this.state.data.filesToUpload];
    const remainingFiles = originalArray.filter((el) => {
      return el.fileId.toString() !== e.target.id;
    });
    this.setState({
      data: {
        ...this.state.data,
        filesToUpload: remainingFiles,
      },
    });
  }

  renderDeleteButton() {
    if (this.props.match.params.id !== "new") {
      return this.renderButton("Delete Recipe");
    }
  }
  
  renderHeader() {
    if (this.props.match.params.id === "new") {
      return <h2>Create A Recipe</h2>;
    } else {
      return <h2>Edit Recipe</h2>;
    }
  }
  // populates recipe in state if valid recipe id
  async populateRecipe() {
    try {
      const recipeId = this.props.match.params.id;
      //   console.log("recipeId", recipeId);
      if (recipeId === "new") return; /// TODO:  Change this "new" instead of test

      const { data: recipe } = await getRecipe(recipeId);
      this.setState({
        recipeId: recipe[0]._id,
        ingredients: recipe[0].ingredients,
        // ingredients: this.mapToViewModel(recipe),
      });

      const data = { ...this.state.data };
      data.title = recipe[0].title;
      data.category = recipe[0].category;
      data.instructions = recipe[0].instructions;
      data.isPublished = recipe[0].isPublished;
      this.setState({ data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    // Bind the this context to the handler function
    this.handleIngredientUpdate = this.handleIngredientUpdate.bind(this);
    // this.handleValidation = this.handleValidation.bind(this);

    // load the recipe (unless new)
    await this.populateRecipe();

    // load the units and quantitiy options for select boxes into local state
    this.setState({ units: getUnits(), quantities: getQuantities() });
  }

  // handle adding a new row to the ingredients table
  handleAddRow = () => {
    const ingredient = {
      qty: "",
      unit: "",
      item: "",
      notes: "",
    };
    const ingredients = [...this.state.ingredients, ingredient];
    this.setState({ ingredients });
    console.log(this.state.ingredients);
  };

  // handle deleting a row from the ingredients table
  handleRemoveSpecificRow = (idx) => () => {
    const ingredients = [...this.state.ingredients];
    ingredients.splice(idx, 1);
    this.setState({ ingredients });
  };

  // handle updating ingredients from child itemSearch component
  // updates itemId
  handleIngredientUpdate(value, row) {
    const ingredients = [...this.state.ingredients];
    ingredients[row].itemId = value;
    this.setState({ ingredients });
  }

  triggerInputFile = (event) => {
    event.preventDefault();
    this.fileInput.click();
  };

  doSubmit = async () => {
    console.log("called doSubmit");
    let imageLinks = [];

    for (const imageFile of this.state.data.filesToUpload) {
      var formData = new FormData();
      formData.append("name", "file");
      formData.append("file", imageFile);

      const imageData = await http.post(
        process.env.REACT_APP_API_URL + "/img",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      imageLinks.push(imageData.data);
    }

    // console.log("ingredients", this.state.ingredients);

    let recipeRecord = {
      title: this.state.data.title,
      userId: this.props.user._id,
      avgRating: 0,
      numReviews: 0,
      category: this.state.data.category,
      images: imageLinks,
      isPublished: this.state.data.isPublished,
      instructions: this.state.data.instructions,
      ingredients: this.state.ingredients,
    };
    // console.log("recipeRecord", recipeRecord);

    try {
      await recipeService.newRecipe(recipeRecord);

      //   console.log(res);
      this.props.history.push("/my-recipes");
      // This should bounce page over to the view recipe page
    } catch (ex) {
      console.log("Something went wrong with uploading a recipe");
      console.log(ex);
    }
  };

  render() {
    const { ingredients } = this.state;

    return (
      <React.Fragment>
        <input
          id="myInput"
          type="file"
          ref={(fileInput) => (this.fileInput = fileInput)}
          onChange={this.handleThumbnailAdd}
          style={{ display: "none" }}
        />

        <section id="add-recipe-form">
          {this.renderHeader()}
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title")}

            <div className="form-group">
              <label htmlFor="addImg">Recipe Images</label>
              <this.ImagePreviews
                items={this.state.data.filesToUpload}
                onClick={this.handleThumbnailRemove.bind(this)}
                fileInputClick={this.triggerInputFile}
              />
              <button
                name="addImg"
                className="btn btn-outline-dark"
                onClick={(event) => {
                  this.triggerInputFile(event);
                }}
              >
                Add Image +
              </button>
            </div>

            <div className="form-group mb-5 mt-5 ingredients">
              <label htmlFor="addImg">Ingredients</label>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th className="pl-2"> Qty </th>
                    <th className="pl-2"> Unit </th>
                    <th className="pl-2"> Item </th>
                    <th className="pl-2"> Notes </th>
                    <th className=""> </th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(ingredients.length)].map((row, i) => {
                    return (
                      (this.state.recipeId ||
                        this.props.match.params.id === "new") && (
                        <tr key={i}>
                          {/* </tr><tr key={i}>    */}
                          <td className="qty">
                            {this.renderMultiRowSelect(
                              "qty",
                              null,
                              // row,
                              i,
                              "ingredients",
                              this.state.quantities
                            )}
                          </td>
                          <td className="unit">
                            {this.renderMultiRowSelect(
                              "unit",
                              null,
                              // row,
                              i,
                              "ingredients",
                              this.state.units
                            )}
                          </td>
                          <td className="item">
                            <ItemSearch
                              items={this.props.items}
                              update={this.handleIngredientUpdate}
                              row={i}
                              initialValue={
                                ingredients[i].item
                                  ? ingredients[i].item.name
                                  : ""
                              }
                            />
                          </td>
                          <td className="notes">
                            {this.renderMultiRowInput(
                              "notes",
                              null,
                              i,
                              "ingredients",
                              "text",
                              "Notes"
                            )}
                          </td>
                          <td className="delete">
                            <FaTrash
                              className="hover-icon"
                              onClick={this.handleRemoveSpecificRow(i)}
                              // onClick={this.handleRemoveSpecificRow(i)} ********
                            />
                          </td>
                        </tr>
                      )
                    );
                  })}
                </tbody>
              </table>
              <button
                onClick={this.handleAddRow}
                className="btn btn-outline-dark"
              >
                Add Ingredient +
              </button>
            </div>

            {this.renderSelect("category", "Category", getCategories())}

            {this.renderTextArea("instructions", "Recipe Instructions", 5)}

            {this.renderSlider(
              "isPublished",
              "Publish",
              this.state.data.isPublished
            )}

            {this.renderButton("Save Recipe")}

            {this.renderDeleteButton()}
          </form>
        </section>
      </React.Fragment>
    );
  }
}

export default RecipeForm;

// <tbody>
// {[...Array(ingredients.length)].map((row, i) => {
//   return (
//     (this.state.recipeId ||
//       this.props.match.params.id === "test") && (
//       <tr key={i}>
//         {/* </tr><tr key={i}>    */}
//         <td>
//           {this.renderMultiRowSelect(
//             "qty",
//             null,
//             // row,
//             i,
//             "ingredients",
//             this.state.quantities
//           )}
//         </td>
//         <td>
//           {this.renderMultiRowSelect(
//             "unit",
//             null,
//             // row,
//             i,
//             "ingredients",
//             this.state.units
//           )}
//         </td>
//         <td>
//           <ItemSearch
//             items={this.props.items}
//             update={this.handleIngredientUpdate}
//             row={i}
//             initialValue={
//               ingredients[i].item ? ingredients[i].item.name : ""
//             }
//           />
//         </td>
//         <td>
//           {this.renderMultiRowInput(
//             "notes",
//             null,
//             i,
//             "ingredients",
//             "text",
//             "Notes"
//           )}
//         </td>
//         <td className="delete">
//           <FaTrash
//             className="hover-icon"
//             onClick={this.handleRemoveSpecificRow(i)}
//             // onClick={this.handleRemoveSpecificRow(i)} ********
//           />
//         </td>
//       </tr>
//     )
//   );
// })}
// </tbody>
