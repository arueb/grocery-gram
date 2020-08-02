import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import http from "../services/httpService";
import { updateUserProperty, getUserReviews } from "../services/userService";
import { loginWithJwt } from "../services/authService"
import AvgStarRating from "./common/avgStarRating";

class UserProfile extends Form {
  constructor(props) {
    super(props);

    this.state = {
      profileImageUrl: process.env.REACT_APP_SERVER_URL + "/images/blank-profile.png",
      imageFileToUpload: "",
      data: { email: "", password: "" },
      userReviews: [],
      errors: {},
      modalReview: {},
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

    this.setState({ profileImageUrl: imageData.data.thumbUrl });

    const newUserData = await updateUserProperty(this.props.user._id, { profileImageUrl: this.state.profileImageUrl })
    // Need to send image url to mongodb field profileImageUrl
    loginWithJwt(newUserData.headers["x-auth-token"]);

    // window.location.reload();
    await this.props.appCDM();

    toast.success('Profile Image Updated!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  async componentDidMount() {
    document.title = this.props.pageTitle

    if (this.props.user.profileImageUrl) {
      this.setState({ profileImageUrl: this.props.user.profileImageUrl })
    }

    this.populateReviews();
  }

  async populateReviews() {
    const reviews = await getUserReviews(this.props.user._id);
    this.setState({ userReviews: reviews.data });
  }

  storeImageFile(e) {
    this.setState({ imageFileToUpload: e.target.files[0] });
    this.setState({ profileImageUrl: URL.createObjectURL(e.target.files[0]) });
  }

  populateDeleteModal(review) {
    this.setState({modalReview: review});
  }

  render() {
    return (
      <React.Fragment>
        <div className="sl-page-heading">
          <h2>User Profile</h2>
          <hr className="divider" />
          <div className="mx-auto mt-4 modal-form row">
            <div className="col-md-5 left-col bg-info text-center">
              <img
                className="rounded-circle m-5 img-thumbnail"
                style={{ "maxWidth": "50%" }}
                src={this.state.profileImageUrl}
                alt="user profile" />
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
          <h2>Your Reviews:</h2>
          <div className="alert alert-danger" role="alert">
            Below is a horribly inefficient query
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Recipe</th>
                  <th scope="col">Your Rating</th>
                  <th scope="col">Comments</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.userReviews.map(review => (
                  <tr key={review._id}>
                    <td><a href={"/recipes/" + review.recipeId} >{review.recipeTitle}</a></td>
                    <td>
                      <AvgStarRating
                        avgRating={review.rating}
                        starSize={15}
                      />
                    </td>
                    <td>{review.comments}</td>
                    <td><button type="button" className="btn btn-warning" data-toggle="modal" data-target="#editModal">Edit</button></td>
                    <td><button type="button" className="btn btn-danger"  data-toggle="modal" data-target="#deleteModal" onClick={() => this.populateDeleteModal(review)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>I don't believe there is a patch reviews route at all, so that would need to be included</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Modal */}
        <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Delete Review</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>There is already a route for delete review, but it does not correctly handle changing the review average</p>
                <p>{JSON.stringify(this.state.modalReview)}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserProfile;
