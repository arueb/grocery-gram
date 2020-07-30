import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import http from "../services/httpService";
import { getUserData, updateUserProperty } from "../services/userService";

class UserProfile extends Form {
  constructor(props) {
    super(props);

    this.state = {
      profileImageUrl: "/blank-profile.png",
      imageFileToUpload: "",
      data: { email: "", password: "" },
      errors: {},
    };

    this.storeImageFile = this.storeImageFile.bind(this);
    this.handleImageSubmit = this.handleImageSubmit.bind(this);
  }

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  doSubmit = async () => {
    try {

    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
    console.log("submitted");
  };

  async handleImageSubmit(e) {
    var formData = new FormData();
    formData.append("name", "file");
    console.log(this);
    formData.append("file", this.state.imageFileToUpload);

    const imageData = await http.post(
      process.env.REACT_APP_API_URL + "/img",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    this.setState({ profileImageUrl: imageData.data.fullsizeUrl });

    updateUserProperty(this.props.user._id, { profileImageUrl : this.state.profileImageUrl})
    // Need to send image url to mongodb field profileImageUrl
  }

  async componentDidMount() {
    // User Profile Image
    const userData = await getUserData(this.props.user._id);
console.log(userData.data)
    // load the units and quantitiy options for select boxes into local state
   // this.setState({ units: getUnits(), quantities: getQuantities() });
  }

  storeImageFile(e) {
    this.setState({ imageFileToUpload: e.target.files[0] });
    this.setState({ profileImageUrl: URL.createObjectURL(e.target.files[0]) });
  }
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h1>User Profile</h1>
          <div className="mx-auto modal-form row">
            <div className="col-md-5 left-col bg-info">
              <img className="img-fluid img-thumbnail" src={this.state.profileImageUrl} alt="user profile" />
              <input type="file" onChange={this.storeImageFile}></input>
              {this.renderButtonCustomHandler("Change Profile Picture", this.handleImageSubmit)}
            </div>
            <div className="col-md-7 right-col">
              <h2>{this.props.user.username}</h2>
              <h6>Change Password</h6>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("oldPassword", "Old Password")}
                {this.renderInput("newPassword", "New Password")}
                {this.renderInput("confirmPassword", "Confirm Password")}
                {this.renderButton("Change Password")}
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserProfile;
