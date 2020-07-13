import React, { Component } from "react";

class ShoppingList extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="row page-heading">
          <div className="col-md-3"></div>
          <div className="col-md">
            <h2>Shopping List</h2>
          </div>
          <div className="col-md"></div>
        </div>
        <div className="row">
          <div className="col-md-5 order-md-4">
            <h4>This will be a search box</h4>
            <table className="table table-striped table-hover added">
              <tbody>
                <tr className="my-row">
                  <td>Added Item</td>
                  <td>$2.99</td>
                </tr>
                <tr className="my-row">
                  <td>Added Item</td>
                  <td>$2.99</td>
                </tr>
                <tr className="my-row">
                  <td>Added Item</td>
                  <td>$2.99</td>
                </tr>
                <tr className="my-row">
                  <td>Added Item</td>
                  <td>$2.99</td>
                </tr>
                <tr className="my-row">
                  <td>Added Item</td>
                  <td>$2.99</td>
                </tr>
                <tr className="my-row">
                  <td>Added Item</td>
                  <td>$2.99</td>
                </tr>
                <tr className="my-row">
                  <td>Added Item</td>
                  <td>$2.99</td>
                </tr>
                <tr className="my-row">
                  <td>Added Item</td>
                  <td>$2.99</td>
                </tr>
              </tbody>
            </table>
            <table className="table table-borderless table-hover removed">
              <tbody>
                <tr className="my-row">
                  <td>
                    <del>Removed Item</del>
                  </td>
                  <td></td>
                </tr>
                <tr className="my-row">
                  <td>
                    <del>Removed Item</del>
                  </td>
                  <td></td>
                </tr>
                <tr className="my-row">
                  <td>
                    <del>Removed Item</del>
                  </td>
                  <td></td>
                </tr>
                <tr className="my-row">
                  <td>
                    <del>Removed Item</del>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-3 order-md-1">
            <h5>My Staples</h5>
            <table className="table table-borderless table-hover my-staples">
              <tbody>
                <tr className="my-row">
                  <td>A staple</td>
                </tr>
                <tr className="my-row">
                  <td>A staple</td>
                </tr>
                <tr className="my-row">
                  <td>A staple</td>
                </tr>
                <tr className="my-row">
                  <td>A staple</td>
                </tr>
                <tr className="my-row">
                  <td>A staple</td>
                </tr>
                <tr className="my-row">
                  <td>A staple</td>
                </tr>
                <tr className="my-row">
                  <td>A staple</td>
                </tr>
              </tbody>
            </table>
            <h5 className="my-recipes-header">My Recipes</h5>
            <table className="table table-borderless table-hover my-recipes">
              <tbody>
                <tr className="my-row">
                  <td>A recipe</td>
                </tr>
                <tr className="my-row">
                  <td>A recipe</td>
                </tr>
                <tr className="my-row">
                  <td>A recipe</td>
                </tr>
                <tr className="my-row">
                  <td>A recipe</td>
                </tr>
                <tr className="my-row">
                  <td>A recipe</td>
                </tr>
                <tr className="my-row">
                  <td>A recipe</td>
                </tr>
                <tr className="my-row">
                  <td>A recipe</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-4 order-md-12">
            <h5>Totals</h5>
            <h6>10 items: $32.12</h6>
            <img
              src="pie_explode.jpg"
              alt="Girl in a jacket"
              width="300"
              height="300"
              className="pie"
            ></img>
            <ul style={{ fontSize: "20px", listStyleType: "none" }}>
              <li>
                <span style={{ color: "red" }}>&#9632;</span> Fruit
              </li>
              <li>
                <span style={{ color: "blue" }}>&#9632;</span> Vegetables
              </li>
              <li>
                <span style={{ color: "orange" }}>&#9632;</span> Meat/Poultry
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ShoppingList;
