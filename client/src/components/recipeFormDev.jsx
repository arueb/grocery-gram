import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import http from "../services/httpService";
import { getUnits } from "../services/unitService";
import { getQuantities } from "../services/qtyService";
import { getRecipe } from "../services/recipeService";
import { FaTrash } from "react-icons/fa";
import ItemSearch from "../components/itemSearch";

const UPLOAD_LIST_PLACEHOLDER =
  process.env.REACT_APP_SERVER_URL + "/images/image-uploader-blank.jpg";

class RecipeFormDev extends Form {
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
        publish: "",
        instructions: "",
        filesToUpload: [],
      },
      ingredients: [{ qty: "", unit: "", item: "", notes: "" }],
    };
    this.handleThumbnailAdd = this.handleThumbnailAdd.bind(this);
    this.fileInput = React.createRef();
  }

  schema = {
    title: Joi.string().label("Recipe Name"),
    category: Joi.string().label("Recipe Category"),
    publish: Joi.string().label("Recipe Published Slider"),
    instructions: Joi.string().label("Recipe Instructions"),
    filesToUpload: Joi.array().label("Files"),
    qty: Joi.string().label("Qty"),
    unit: Joi.string().label("Unit"),
    itemId: Joi.string().label("Item"),
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
          style={{ width: "50px", height: "50px" }}
          onClick={props.onClick}
        />
      ))}
      <img
        key="imageUploadPlaceholder"
        src={UPLOAD_LIST_PLACEHOLDER}
        onClick={props.fileInputClick}
        alt="upload button"
        style={{ width: "50px", height: "50px" }}
      />
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

  triggerInputFile = () => {
    this.fileInput.click();
  }

  doSubmit = async () => {

    let imageLinks = [];

    for (const imageFile of this.state.data.filesToUpload) {

      var formData = new FormData();
      formData.append("name", "file");
      formData.append("file", imageFile);

      const imageData = await http.post(process.env.REACT_APP_API_URL + "/img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      imageLinks.push(imageData.data);
    }

    console.log(this.props)

    let recipeRecord = {
      title: this.state.data.title,
      author: this.props.user._id,
      avgRating: "TODO: calculate/store upon adding new review",
      numReviews: "TODO: calculate/store upon adding new review",
      category: this.state.data.category,
      images: imageLinks,
      isPublished: this.state.data.publish,
      instructions: this.state.data.instructions,
      ingredients: this.state.ingredients,
    }

    console.log(recipeRecord);
    // TODO: Send new recipe
  };

  render() {
    const { ingredients } = this.state;

    return (
      <React.Fragment>
        <input
          id="myInput"
          type="file"
          ref={fileInput => this.fileInput = fileInput}
          onChange={this.handleThumbnailAdd}
          style={{ display: "none" }}
        />

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}

          <div>
            <h3>Recipe Images:</h3>
            <this.ImagePreviews
              items={this.state.data.filesToUpload}
              onClick={this.handleThumbnailRemove.bind(this)}
              fileInputClick={this.triggerInputFile}
            />
          </div>

          <section className="ingredients-form">
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
                      this.props.match.params.id === "test") && (
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
                              ingredients[i].item ? ingredients[i].item.name : ""
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
            <button onClick={this.handleAddRow} className="btn btn-dark">
              Add Ingredient +
          </button>
          </section>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            //defaultValue={this.state.selectValue}
            onChange={this.handleChange}
          >
            <option defaultValue disabled value="Orange">
              Orange
            </option>
            <option value="Radish">Radish</option>
            <option value="Cherry">Cherry</option>
          </select>

          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customSwitch1"
              name="publish"
              onClick={this.handleChange}
            ></input>
            <label className="custom-control-label" htmlFor="customSwitch1">
              Publish
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
              Recipe Instructions
            </label>
            <textarea
              name="instructions"
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={this.handleChange}
            ></textarea>
          </div>
          {this.renderButton("Save Recipe")}
          {this.renderDeleteButton()}
        </form>
      </React.Fragment>
    );
  }
}

export default RecipeFormDev;

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
