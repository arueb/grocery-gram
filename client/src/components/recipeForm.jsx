import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
// import auth from "../services/authService";
// import http from "../services/httpService";
import axios from "axios"

const UPLOAD_LIST_PLACEHOLDER =
  process.env.REACT_APP_SERVER_URL + "/images/image-uploader-blank.jpg";

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
        publish: "on",
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
    publish: Joi.string().label("Recipe Published Slider"),
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
        filesToUpload: updatedFiles.concat(
          URL.createObjectURL(e.target.files[0])
        ),
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
      return this.renderButton("Delete Recipe");
    }
  }

  doSubmit = async () => {
    var formData = new FormData();
    formData.append("name", "sampleFile",)
    console.log("here comes formdata");
    console.log(formData);    
    formData.append("files", this.state.data.filesToUpload[0]);
    console.log("Appended = " + this.state.data.filesToUpload[0]);
    console.log("here comes formdata");
    console.log(formData);
    console.log("here comes more formdata");
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
  }

    axios.post(process.env.REACT_APP_API_URL + "/img", formData, {
      
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  onChangeHandler=event=>{

    console.log(event.target)

}

  render() {
    return (
      <section id="create-recipe-form">


    <form ref='uploadForm' 
      id='uploadForm' 
      action={ process.env.REACT_APP_API_URL + "/img" } 
      method='post' 
      encType="multipart/form-data"
      onChange={this.onChangeHandler}>
        <input type="file" name="sampleFile" />
        <input type='submit' value='Upload!' />
    </form> 


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
          <label htmlFor="category">
              Category
            </label>
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
      </section>
    );
  }
}

export default RecipeForm;
