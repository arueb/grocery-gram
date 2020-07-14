import React, { Component } from "react";
import { getAllItems } from "../services/itemsService";
import { getUserData } from "../services/shoppingListService";

class ShoppingList extends Component {
  state = {
    allItems: [],
    addedItems: [],
    removedItems: [],
    staples: [],
    recipes: [],
    errors: {},
  };

  async componentDidMount() {
    console.log("user", this.props.user);
    const userId = "5f0b991975496e0bc3b4c526";

    const { data: allItems } = await getAllItems();
    const { data: user } = await getUserData(userId);
    console.log("user: ", user);
    const addedItemIds = user.addedItems;
    const addedItems = this.getItemsById(addedItemIds, allItems);
    const removedItemIds = user.removedItems;
    const removedItems = this.getItemsById(removedItemIds, allItems);
    this.setState({
      allItems: allItems,
      addedItems: addedItems,
      removedItems: removedItems,
    });
  }

  handleAddItem = () => {
    console.log("allItems", this.state.allItems);
    console.log("addedItems", this.state.addedItems);
    console.log("removedItems", this.state.removedItems);
    // console.log("state", this.state.user);
  };

  handleRemoveItem = (itemId) => {
    console.log("you removed itemId", itemId);
    const fullItem = this.getItemById(itemId);
    console.log("fullItem", fullItem);
    console.log("allItems", this.state.allItems);
    console.log("addedItems", this.state.addedItems);
    console.log("removedItems", this.state.removedItems);
    // console.log("state", this.state.user);
  };

  // handleRemoveItem

  // handleChooseStaple

  // handleChooseRecipe


  
  getItemById = (itemId, allItems) => {
    let i;
    for (i = 0; i < allItems.length; i++) {
      if (allItems[i]._id === itemId)
        return allItems[i];
    }
    return null;
  };

  getItemsById = (itemIds, allItems) => {
    let items = [];
    let i;
    for (i = 0; i < itemIds.length; i++) {
      const item = this.getItemById(itemIds[i], allItems)
      items.push(item);
    }
    return items;
  };

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
                {this.state.addedItems.map((item) => (
                  <li
                    key={item._id}
                    onClick={() => this.handleRemoveItem(item._id)}
                    className="list-group-item border-0"
                  >
                    {item.name}
                    <span className="sl-price">${item.price}</span>
                  </li>
                ))
              }
            </div>
            <div className="removed list-group lst-grp-hover">
              {this.state.removedItems.map((item) => (
                <li
                  key={item._id}
                  onClick={() => this.handleAddItem()}
                  className="list-group-item border-0"
                >
                  {item.name}
                </li>
              ))}
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
