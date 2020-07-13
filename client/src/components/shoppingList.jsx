import React, { Component } from "react";

class ShoppingList extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col text-center">
            <h1>Shopping List</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 order-md-4">
            <h1>Items Search Box</h1>
            <span></span>
          </div>
          <div className="col-md-3 order-md-1">
            <h1>My Staples</h1>
          </div>
          <div className="col-md-4 order-md-12">
            <h1>Totals</h1>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ShoppingList;
