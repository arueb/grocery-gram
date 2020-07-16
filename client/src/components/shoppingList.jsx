import React, { Component } from "react";
import _ from "lodash"
import { getUserData, updateShoppingList } from "../services/shoppingListService";
import { getColor } from "../services/itemService";

class ShoppingList extends Component {
  state = {
    userData: null,
    addedItems: null,
    removedItems: null,
    addedCats: null,
    staples: [],
    recipes: [],
    errors: {},
  };

  async componentDidUpdate() {
    await this.expandShoppingLists();
  }

  async componentDidMount() {
    await this.expandShoppingLists();
  }

  async expandShoppingLists() {
    const { items, user } = this.props;

    if (!user) {
      console.log("User not logged in...");
      return;
    }

    if (items && !this.state.userData) {
      const { data: userData } = await getUserData(user._id);

      const addedItemIds = userData.addedItems;
      const addedItems = this.expandItems(addedItemIds, items);
      const removedItemIds = userData.removedItems;
      const removedItems = this.expandItems(removedItemIds, items);
      this.sortItems(addedItems);
      this.setState({ addedItems, removedItems, userData });
    }
  }

  expandItemById = (itemId, itemsArr) => {
    for (let i = 0; i < itemsArr.length; i++) {
      if (itemsArr[i]._id === itemId) return itemsArr[i];
    }
    return null;
  };

  expandItems = (itemIds, allItems) => {
    let expanded = [];
    for (const itemId of itemIds) {
      const item = this.expandItemById(itemId, allItems);
      expanded.push(item);
    }
    return expanded;
  };

  tallyCategories = () => {
    
  }

  sortItems = (items) => {
    return _.orderBy(items, ["category", "name"], ["asc", "asc"]);
  };

  handleAddItemFromSearchBox = (itemId) => {

  }

  handleAddBackItem = async (itemId) => {
    this.moveItemsInLists(itemId, "addBack");
  }

  handleRemoveItem = async (itemId) => {
    this.moveItemsInLists(itemId, "removeItem");
  };

  moveItemsInLists = async (itemId, action) => {
    // optimistic update
    // store current state in case we need to revert
    const prevAddedItems = this.state.addedItems;
    const prevRemovedItems = this.state.removedItems;

    let currExtractFromItems;
    let currAddToItems;
    // addBack: extract from removed, add into added
    if (action === "addBack") {
      currExtractFromItems = this.state.removedItems;
      currAddToItems = this.state.addedItems;
    } // remove: extract from added, add into removed
    else if (action === "removeItem") {
      currExtractFromItems = this.state.addedItems;
      currAddToItems = this.state.removedItems;
    }
    // extract item from currExtractFromItems 
    let newExtractFromItems = [];
    const newExtractFromItemIds = [];
    let itemToAdd;
    currExtractFromItems.forEach((item) => {
      if (item._id !== itemId) {
        newExtractFromItems.push(item);
        newExtractFromItemIds.push(item._id);
      } else itemToAdd = item;
    });

    // push item to currAddToItems
    let newAddToItems = [itemToAdd, ...currAddToItems];
    const newAddToItemIds = newAddToItems.map((item) => item._id);

    // sort and set state according to action, forces a re-render
    if (action === "addBack") {
      newAddToItems = this.sortItems(newAddToItems);
      this.setState({
        addedItems: newAddToItems, 
        removedItems: newExtractFromItems });
    }
    else { // removeItem
      newExtractFromItems = this.sortItems(newExtractFromItems);
      this.setState({
        addedItems: newExtractFromItems, 
        removedItems: newAddToItems });
    }
    // handle user shopping list in backend according to action
    // on failure revert state
    let newAddedItemIds;
    let newRemovedItemIds;
    if (action === "addBack") {
      newAddedItemIds = newAddToItemIds;
      newRemovedItemIds = newExtractFromItemIds;
    }
    else {
      newAddedItemIds = newExtractFromItemIds;
      newRemovedItemIds = newAddToItemIds;
    }

    try {
      await updateShoppingList(
        this.props.user._id,
        newAddedItemIds,
        newRemovedItemIds
      );
    } catch (err) {
      // revert state back to original
      this.setState({
        addedItems: prevAddedItems,
        removedItems: prevRemovedItems,
      });
      console.log("Something went wrong.", err);
    }
  };  

  // handleChooseStaple

  // handleChooseRecipe

  render() {
    const { addedItems, removedItems } = this.state;
    // console.log("props", this.props);
    // console.log("state", this.state);
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
              {!addedItems
                ? null
                : addedItems.map((item) => (
                    <li
                      key={item._id}
                      onClick={() => this.handleRemoveItem(item._id)}
                      style={{ borderTop: 0, borderBottom: 0,borderRight: 0,
                        borderLeft: `15px solid ${getColor(item.category)}`
                      }}
                      className="list-group-item"
                    >
                      {item.name}
                      <span className="sl-price">${item.price}</span>
                    </li>
                  ))}
            </div>
            <div className="removed list-group lst-grp-hover">
              {!removedItems
                ? null
                : removedItems.map((item) => (
                    <li
                      key={item._id}
                      onClick={() => this.handleAddBackItem(item._id)}
                      style={{ borderTop: 0, borderBottom: 0, borderRight: 0,
                        borderLeft: "15px solid #fff"
                      }}
                      className="list-group-item"
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
              src={window.location.origin + "/pie_explode.jpg"}
              alt="Girl in a jacket"
              width="300"
              height="300"
              className="pie"
            ></img>
            <ul style={{ fontSize: "20px", listStyleType: "none" }}>

              
              {!addedItems
                ? null
                : addedItems.map((item) => (
                  <li
                    key={item._id}
                    // onClick={() => this.handleRemoveItem(item._id)}
                    style={{
                      borderTop: 0, borderBottom: 0, borderRight: 0,
                      borderLeft: `15px solid ${getColor(item.category)}`
                    }}
                    className="list-group-item"
                  >
                    {item.name}
                  </li>
                ))}



              <li>
                <span style={{ color: getColor("Fruit") }}>&#9632;</span> Fruit
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
