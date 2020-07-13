import React, { Component } from "react";

class ShoppingList extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="row sl-page-heading">
          <div className="col-md-3"></div>
          <div className="col-md">
            <h2>Shopping List</h2>
          </div>
          <div className="col-md"></div>
        </div>
        <div className="row">
          <div className="col-md-5 order-md-4">
            <h4>THIS WILL BE A SEARCH BOX</h4>
            <div className="list-group lst-grp-hover lst-grp-striped">
              <li className="list-group-item border-0">Added Item<span className="sl-price">$2.99</span></li>
              <li className="list-group-item border-0">Added Item<span className="sl-price">$2.99</span></li>
              <li className="list-group-item border-0">Added Item<span className="sl-price">$2.99</span></li>
              <li className="list-group-item border-0">Added Item<span className="sl-price">$2.99</span></li>
              <li className="list-group-item border-0">Added Item<span className="sl-price">$2.99</span></li>
              <li className="list-group-item border-0">Added Item<span className="sl-price">$2.99</span></li>
              <li className="list-group-item border-0">Added Item<span className="sl-price">$2.99</span></li>
              <li className="list-group-item border-0">Added Item<span className="sl-price">$2.99</span></li>
              <li className="list-group-item border-0">Added Item<span className="sl-price">$2.99</span></li>
              <li className="list-group-item border-0">Added Item<span className="sl-price">$2.99</span></li>
            </div>  
            <div className="removed list-group lst-grp-hover">
              <li className="list-group-item border-0">Removed Item</li>
              <li className="list-group-item border-0">Removed Item</li>
              <li className="list-group-item border-0">Removed Item</li>
              <li className="list-group-item border-0">Removed Item</li>
              <li className="list-group-item border-0">Removed Item</li>
              <li className="list-group-item border-0">Removed Item</li>
            </div>
          </div>
          <div className="col-md-3 order-md-1">
            <h5>My Staples</h5>
            <div className="list-group lst-grp-hover">
              <li className="list-group-item border-0">A staple</li>
              <li className="list-group-item border-0">A staple</li>
              <li className="list-group-item border-0">A staple</li>
              <li className="list-group-item border-0">A staple</li>
              <li className="list-group-item border-0">A staple</li>
              <li className="list-group-item border-0">A staple</li>
            </div>
            <h5 className="my-recipes-header">My Recipes</h5>
            <div className="list-group lst-grp-hover">
              <li className="list-group-item border-0">A recipe</li>
              <li className="list-group-item border-0">A recipe</li>
              <li className="list-group-item border-0">A recipe</li>
              <li className="list-group-item border-0">A recipe</li>
              <li className="list-group-item border-0">A recipe</li>
              <li className="list-group-item border-0">A recipe</li>
            </div>
          </div>
          <div className="col-md-4 order-md-12">
            <h5 className="totals">Totals</h5>
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
