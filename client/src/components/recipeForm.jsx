import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
// import auth from "../services/authService";
// import http from "../services/httpService";
import axios from "axios";

const UPLOAD_LIST_PLACEHOLDER =
  process.env.REACT_APP_SERVER_URL + "/images/image-uploader-blank.jpg";

const FileInput = React.forwardRef((props, ref) => (
  <input type="file" ref={ref} />
));

const fileInputRef = React.createRef();

class RecipeForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: "Testing Recipe Name",
        category: "Testing Food",
        publish: "on",
        instructions: "Testing Cook the food.",
        filesToUpload: [],
      },
      errors: {},
    };
    this.handleThumbnailAdd = this.handleThumbnailAdd.bind(this);
    //    this.fileInput = React.createRef();
  }

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

  // define schema for input validation in browser
  schema = {
    title: Joi.string().label("Recipe Name"),
    category: Joi.string().label("Recipe Category"),
    publish: Joi.string().label("Recipe Published Slider"),
    instructions: Joi.string().label("Recipe Instructions"),
    filesToUpload: Joi.array().label("Files"),
  };

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

  doSubmit = async () => {

    let imageUrls = [];

    for (const imageFile of this.state.data.filesToUpload) {
      var formData = new FormData();
      formData.append("name", "sampleFile");
      formData.append("sampleFile", imageFile);

      const imageUrl = await
    }



    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    axios.post(process.env.REACT_APP_API_URL + "/img", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  onChangeHandler = (event) => {
    console.log(event.target);
  };

  onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    console.log(file);
    this.setState({ file }); /// if you want to upload latter
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.focus();
  }

  triggerInputFile = () => {
    this.fileInput.click();
  }

  render() {
    return (
      <section id="create-recipe-form">
        <input
          id="myInput"
          type="file"
          ref={fileInput => this.fileInput = fileInput}
          onChange={this.handleThumbnailAdd}
          style={{ display: "none" }}
        />

        <h1>Create a Recipe</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Recipe Name*")}

          <div>
            <h2>Recipe Images:</h2>
            <this.ImagePreviews
              items={this.state.data.filesToUpload}
              onClick={this.handleThumbnailRemove.bind(this)}
              fileInputClick={this.triggerInputFile}
            />
          </div>

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
      </section>
    );
  }
}

export default RecipeForm;
