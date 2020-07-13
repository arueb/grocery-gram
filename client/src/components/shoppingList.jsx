import React, { Component } from "react";

class ShoppingList extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="row page-heading">
          <div className="col-md-3"></div>
          <div className="col-md">
            <h1>Shopping List</h1>
          </div>
          <div className="col-md"></div>
        </div>
        <div className="row">
          <div className="col-md-5 order-md-4">
            <h2>Items & Search Box</h2>
            <h3>This will be a search box</h3>
            <table className="table table-striped added">
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
            <table className="table table-borderless removed">
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
            <h2>My Staples</h2>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          </div>
          <div className="col-md-4 order-md-12">
            <h2>Totals/Pie Chart</h2>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ShoppingList;
