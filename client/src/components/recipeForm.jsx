import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

const UPLOAD_LIST_PLACEHOLDER =
  process.env.REACT_APP_IMAGES_FOLDER + "images/image-uploader-blank.jpg";

const ImagePreviews = (props) => (
  <div>
    {props.items.map((item, index) => (
      <img
        key={item + index}
        src={item}
        alt={index}
        style={{ width: "50px", height: "50px" }}
        onClick={props.onClick}
      />
    ))}
  </div>
);

class RecipeForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { 
        title: "",
        category: "",
        publish: false,
        instructions: "",
        filesToUpload: [UPLOAD_LIST_PLACEHOLDER],
      },
      errors: {},
    };
    this.handleThumbnailAdd = this.handleThumbnailAdd.bind(this);
  }

  // define schema for input validation in browser
  schema = {
    title: Joi.string().label("Recipe Name"),
    category: Joi.string().label("Recipe Category"),
    publish: Joi.boolean().label("Recipe Published Slider"),
    instructions: Joi.string().label("Recipe Instructions"),
    filesToUpload: Joi.array().label("Files"),
  };

  handleThumbnailAdd(e) {
    let updatedFiles = this.state.data.filesToUpload;
    if (
      updatedFiles.length === 1 &&
      updatedFiles[0] === UPLOAD_LIST_PLACEHOLDER
    ) {
      updatedFiles = [];
    }

    this.setState({
      data: {
        ...this.state.data,
        filesToUpload: updatedFiles.concat(URL.createObjectURL(e.target.files[0])),
      },
    });
  }

  handleThumbnailRemove(e) {
    let remainingFiles = [...this.state.data.filesToUpload];
    var index = remainingFiles.indexOf(e.target.src);
    if (index !== -1) {
      remainingFiles.splice(index, 1);
      if (remainingFiles.length === 0) {
        remainingFiles = [UPLOAD_LIST_PLACEHOLDER];
      }
      this.setState({
        data: {
          ...this.state.data,
          filesToUpload: remainingFiles,
        },
      });
    }
  }

  renderDeleteButton() {
    if (this.props.match.params.id !== "new") {
      return this.renderButton("Delete Recipe")
    }    
  }

  render() {
    return (
      <section id="create-recipe-form">
        <h1>Create a Recipe</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Recipe Name*")}
          <div>
            <input type="file" onChange={this.handleThumbnailAdd} />
            <ImagePreviews
              items={this.state.data.filesToUpload}
              onClick={this.handleThumbnailRemove.bind(this)}
            />
          </div>
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
          <p>yo</p>

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
              Example textarea
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          {this.renderButton("Save Recipe")}
          {this.renderDeleteButton()}
        </form>
      </section>
    );
  }
}

export default RecipeForm;
