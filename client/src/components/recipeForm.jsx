import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

const UPLOAD_LIST_PLACEHOLDER = process.env.REACT_APP_IMAGES_FOLDER + "images/image-uploader-blank.jpg";

const ImagePreviews = (props) => (
  <div>
    {props.items.map((item, index) => (
      <img
        key={item}
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
      data: { title: "", files: [ UPLOAD_LIST_PLACEHOLDER ] },
      errors: {},
    };
    this.handleThumbnailAdd = this.handleThumbnailAdd.bind(this);
  }

  // define schema for input validation in browser
  schema = {
          title: Joi.string().label("Recipe Name"),
    //      confirmPassword: Joi.string().label("Password"),
    files: Joi.array().label("Files"),
  };

  handleThumbnailAdd(e) {
    let updatedFiles = this.state.data.files
    if (updatedFiles.length === 1 && updatedFiles[0] === UPLOAD_LIST_PLACEHOLDER) {
      updatedFiles = [];
    }

    this.setState({
      data: {
        ...this.state.data,
        files: updatedFiles.concat(
          URL.createObjectURL(e.target.files[0])
        ),
      },
    });
  }

  handleThumbnailRemove(e) {
    let remainingFiles = [...this.state.data.files];
    var index = remainingFiles.indexOf(e.target.src);
    if (index !== -1) {
      remainingFiles.splice(index, 1);
      if (remainingFiles.length === 0) {
        remainingFiles = [ UPLOAD_LIST_PLACEHOLDER ];
      }
      this.setState({
        data: {
          ...this.state.data,
          files: remainingFiles,
        },
      });
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
              items={this.state.data.files}
              onClick={this.handleThumbnailRemove.bind(this)}
            />
          </div>
          <select
          //defaultValue={this.state.selectValue}
          //onChange={this.handleChange}
          >
            <option selected disabled value="Select a Category">
              Orange
            </option>
            <option value="Radish">Radish</option>
            <option value="Cherry">Cherry</option>
          </select>
          <p>yo</p>

          <div class="custom-control custom-switch">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customSwitch1"
            ></input>
            <label class="custom-control-label" for="customSwitch1">
              Publish
            </label>
          </div>

          <div class="form-group">
            <label for="exampleFormControlTextarea1">Example textarea</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          {this.renderButton("Save Recipe")}
          {this.renderButton("Delete Recipe")}
        </form>
      </section>
    );
  }
}

export default RecipeForm;
