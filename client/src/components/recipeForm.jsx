import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import http from "../services/httpService";
import { getUnits } from "../services/unitService";
import { getQuantities } from "../services/qtyService";
import { getCategories } from "../services/categoryService";
import {
  getRecipe,
  deleteRecipe,
  updateRecipe,
  newRecipe,
} from "../services/recipeService";
import { FaTrash } from "react-icons/fa";
import ItemSearch from "../components/itemSearch";
import SortableComponent from "../components/sortableComponent"
import arrayMove from 'array-move';
// import * as recipeService from "../services/recipeService";

//const UPLOAD_LIST_PLACEHOLDER =
//  process.env.REACT_APP_SERVER_URL + "/images/image-uploader-blank.jpg";

class RecipeForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      recipeImages: [],
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
      //   ingredients: [{ qty: "", unit: "", itemId: "", notes: "" }],
      ingredients: [],
    };
    this.handleThumbnailAdd = this.handleThumbnailAdd.bind(this);
    this.fileInput = React.createRef();
  }

  schema = {
    title: Joi.string().label("Recipe Name"),
    category: Joi.string().label("Recipe Category"),
    isPublished: Joi.boolean().label("Recipe Published Slider"),
    instructions: Joi.string().label("Recipe Instructions"),
    filesToUpload: Joi.array().label("Files"),
    qty: Joi.string().label("Qty"),
    unit: Joi.string().label("Unit"),
    itemId: Joi.string().label("Item"),
    notes: Joi.string().label("Notes").optional(),
  };

  ingredientsSchema = {
    qty: Joi.string().label("Qty"),
    unit: Joi.string().label("Unit"),
    itemId: Joi.string().label("Item").required(),
    notes: Joi.string().label("Notes").allow(""),
  };

  async componentDidMount() {
    // Bind the this context to the handler function
    this.handleIngredientUpdate = this.handleIngredientUpdate.bind(this);
    this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
    // this.handleValidation = this.handleValidation.bind(this);

    // load the recipe (unless new)
    await this.populateRecipe();

    // load the units and quantitiy options for select boxes into local state
    this.setState({ units: getUnits(), quantities: getQuantities() });
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

      recipe[0].images.forEach(image => {
        image.fileId = image.fullsizeUrl
      });

      this.setState({ recipeImages : recipe[0].images});
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  handleThumbnailAdd(e) {
    if (e.target.files.length === 0) {
      return;
    }

    let newFile = e.target.files[0];

    newFile.fileId = Date.now();

    let oldFiles = this.state.recipeImages;
    this.setState({
      recipeImages: oldFiles.concat(newFile),
    });
  }

  handleThumbnailRemove = (e) => {
    const remainingFiles = this.state.recipeImages.filter((el) => {
      return el.fileId !== e.fileId;
    });
    this.setState({ recipeImages: remainingFiles });
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ recipeImages }) => ({
      recipeImages: arrayMove(recipeImages, oldIndex, newIndex),
    }));
  };

  renderDeleteButton() {
    if (this.props.match.params.id !== "new") {
      return this.renderButtonCustomHandler(
        "Delete Recipe",
        this.handleDeleteRecipe
      );
    }
  }

  async handleDeleteRecipe(e) {
    e.preventDefault();
    const { recipeId } = this.state;
    try {
      await deleteRecipe(recipeId);
      this.props.history.push("/my-recipes");
    } catch (err) { }
  }

  renderHeader() {
    if (this.props.match.params.id === "new") {
      return <h2>Create A Recipe</h2>;
    } else {
      return <h2>Edit Recipe</h2>;
    }
  }

  // handle adding a new row to the ingredients table
  handleAddRow = (e) => {
    e.preventDefault();
    const ingredient = {
      qty: "",
      unit: "",
      item: "",
      notes: "",
    };
    const ingredients = [...this.state.ingredients, ingredient];
    this.setState({ ingredients, validateIngredientsRow: null });
    // console.log(this.state.ingredients);
  };

  // handle deleting a row from the ingredients table
  handleRemoveSpecificRow = (idx) => () => {
    const ingredients = [...this.state.ingredients];
    ingredients.splice(idx, 1);
    this.setState({ ingredients, validateIngredientsRow: null });
    // this.setState({ validateIngredientsRow: null });
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

  validateIngredients = (row) => {
    // console.log("validateIngrents() fired");
    const options = { abortEarly: true };
    const ingredient = this.state.ingredients[row];
    // console.log("ingredient to be validated", ingredient);
    // delete ingredient.notes;
    delete ingredient.item;
    const { error } = Joi.validate(
      //   this.state.ingredients[row],
      ingredient,
      this.ingredientsSchema,
      options
    );
    // console.log("validationerror", error);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  doSubmit = async () => {
    // console.log("called doSubmit");
    // console.log("ing length:", this.state.ingredients.length);

    const { ingredients } = this.state;
    console.log("validate ingredients form");
    if (ingredients.length > 0) {
      ingredients.forEach((ingredient, row) => {
        // console.log("row", row);
        const errors = this.validateIngredients(row);
        // console.log(errors);
        this.setState({ errors: errors || {} });
        if (errors) {
          this.setState({ validateIngredientsRow: row });
          return;
        }
        this.setState({ validateIngredientsRow: null });
      });

      //   console.log(this.validateIngredients());
    }
    console.log("state errors", this.state.errors);
    if (this.state.validateIgredientsRow) return;
    console.log("maded it past state errosr!");

    let imageLinks = [];

    for (const imageFile of this.state.recipeImages) {
      if (imageFile instanceof File) {
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
      } else {

        imageLinks.push(imageFile);
      }

    }

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

    const { id } = this.props.match.params;
    try {
      if (id === "new") {
        // console.log("saving new recipe", recipeRecord);
        await newRecipe(recipeRecord);
      } else {
        // update an existing record via patch
        await updateRecipe(id, recipeRecord);
        // console.log("patch success");
      }
      // redirect to my-recipes page
      this.props.history.push("/my-recipes");
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
          <div className="row sl-page-heading">
            <div className="col-md-4">{this.renderHeader()}</div>
          </div>
          <hr className="divider" />
          {/* {this.renderHeader()} */}
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title")}

            <div className="form-group">
              <label htmlFor="addImg" style={{ display: "block" }}>Recipe Images <small><em>(First image is thumbnail)</em></small></label>
              <SortableComponent images={this.state.recipeImages} imgClick={this.handleThumbnailRemove} onSortEnd={this.onSortEnd} />
              <button
                name="addImg"
                className="btn btn-outline-dark"
                onClick={(event) => {
                  this.triggerInputFile(event);
                }}
                style={{ display: "block" }}
              >
                Add Image +
              </button>
            </div>

            <div className="form-group mb-5 mt-5 ingredients-form">
              <div>
                <label className="ingredients-label">Ingredients</label>
              </div>
              {ingredients.length > 0 && (
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
                              {this.state.validateIngredientsRow === i &&
                                this.state.errors.itemId && (
                                  <div className="alert alert-danger">
                                    {this.state.errors.itemId}
                                  </div>
                                )}
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
              )}

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
