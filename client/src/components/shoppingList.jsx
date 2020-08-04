import React, { Component } from "react";
import _ from "lodash";
import {
  getUserData,
  getUserRecipes,
  updateShoppingList,
  deleteItemFromShoppingList,
  clearAllFromShoppingList,
  updateItemCounts,
} from "../services/userService";
import { getColor } from "../services/itemService";
import ItemSearch from "../components/itemSearch";
import PieChart from "./pieChart";
import { FaTrash } from "react-icons/fa";

class ShoppingList extends Component {
  state = {
    userData: null,
    addedItems: null,
    removedItems: null,
    catPercents: null,
    totalNumItems: 0,
    totalPriceItems: 0,
    activeId: null,
    staples: [],
    recipes: [],
    itemCounts: [],
    isLoading: true,
    errors: {},
  };

  constructor(props) {
    super(props);
    this.pageHeadingRef = React.createRef();
  }

  async componentDidMount() {
    document.title = this.props.pageTitle;

    // Bind the this context to the handler function
    this.handleUpdate = this.handleUpdate.bind(this);

    // populate the users lists and recipes
    await this.expandShoppingLists();

    // update the pie chart
    this.handleUpdatePieChart();
  }

  async expandShoppingLists() {
    const { items, user } = this.props;

    if (!user) {
      console.log("User not logged in...", user);
      return;
    }

    if (items && !this.state.userData) {
      const { data: userData } = await getUserData(user._id);
      const { data: userRecipes } = await getUserRecipes(user._id);
      const itemCounts = userData.itemCounts;
      const addedItemIds = userData.addedItems;
      let addedItems = this.expandItems(addedItemIds, items);
      const removedItemIds = userData.removedItems;
      const removedItems = this.expandItems(removedItemIds, items);
      addedItems = this.sortItems(addedItems);
      this.setState({
        addedItems,
        removedItems,
        userData,
        userRecipes,
        itemCounts,
      });
      this.updateMyStaples(itemCounts);

      this.setState({ isLoading: false });
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

  sortItems = (items) => {
    return _.orderBy(items, ["category", "name"], ["asc", "asc"]);
  };

  handleAddItemFromSearchBox = async (item) => {
    // optimistic update, so save original state
    const prevAddedItems = [...this.state.addedItems];
    let newAddedItems = [...this.state.addedItems, item];
    newAddedItems = this.sortItems(newAddedItems);
    const newAddedItemIds = newAddedItems.map((item) => item._id);
    const removedItemIds = this.state.removedItems.map((item) => item._id);
    this.setState({ addedItems: newAddedItems });
    const itemCounts = [...this.state.itemCounts];
    setTimeout(() => {
      this.updateMyStaples(itemCounts);
    }, 300);

    try {
      await updateShoppingList(
        this.props.user._id,
        newAddedItemIds,
        removedItemIds
      );
      this.handleUpdatePieChart();
    } catch (err) {
      // revert state back to original
      this.setState({ addedItems: prevAddedItems });
      this.handleUpdatePieChart();
      console.log("Something went wrong.", err);
    }
  };

  handleAddBackItem = async (itemId) => {
    console.log("handling add back");
    await this.moveItemsInLists(itemId, "addBack");
    this.handleUpdatePieChart();
    // const itemCounts = [...this.state.itemCounts];
    // this.updateMyStaples(itemCounts);
    this.updateMyStaples(this.state.itemCounts);
  };

  handleRemoveItem = async (itemId) => {
    this.updateItemCount(itemId);
    // console.log("clicked an item");
    this.setState({ activeId: itemId });

    setTimeout(() => {
      this.moveItemsInLists(itemId, "removeItem");
      this.handleUpdatePieChart();
      this.setState({ activeId: null });
    }, 300);
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
    } // removeItem: extract from added, add into removed
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
        removedItems: newExtractFromItems,
      });
    } else {
      // removeItem
      newExtractFromItems = this.sortItems(newExtractFromItems);
      this.setState({
        addedItems: newExtractFromItems,
        removedItems: newAddToItems,
      });
    }
    // handle user shopping list in backend according to action
    // on failure revert state
    let newAddedItemIds;
    let newRemovedItemIds;
    if (action === "addBack") {
      newAddedItemIds = newAddToItemIds;
      newRemovedItemIds = newExtractFromItemIds;
    } else {
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

  // handle update from itemSearch
  handleUpdate(value, row = null) {
    console.log("handling update");
    console.log(value);
    const items = [...this.props.items];
    // console.log(items);
    if (value) {
      const item = this.expandItemById(value, items);
      this.handleAddItemFromSearchBox(item);
    }
  }

  handleUpdatePieChart = () => {
    // create array of category objects for use in pie chart
    const { addedItems } = this.state;
    if (addedItems === null) return;
    let catStats = [];
    let cats = [];
    for (let i = 0; i < addedItems.length; i++) {
      const catName = addedItems[i].category;
      if (!cats.includes(catName)) {
        cats.push(catName);
        let catObj = {
          name: catName,
          count: 1,
          cost: addedItems[i].price,
        };
        catStats.push(catObj);
      } else {
        const catArr = catStats.filter((cat) => {
          return cat.name === catName;
        });
        let catObj = catArr[0];
        catObj.count++;
        catObj.cost += addedItems[i].price;
      }
    }
    // calculate item totals
    let totalNumItems = addedItems.length;
    let totalPriceItems = 0;
    for (let i = 0; i < addedItems.length; i++) {
      totalPriceItems += addedItems[i].price;
    }
    totalPriceItems = totalPriceItems.toFixed(2); // set to 2 dec places
    // calculate percentage and add pie chart colors
    const catPercents = [];
    catStats.forEach((cat) =>
      catPercents.push({
        name: cat.name,
        y: (cat.count / totalNumItems) * 100, // calc percent of total
        color: getColor(cat.name),
      })
    );
    this.setState({ catPercents, totalNumItems, totalPriceItems });
  };

  // updateMyStaples

  updateItemCount = async (itemId) => {
    const itemCounts = [...this.state.itemCounts];
    const idx = itemCounts.findIndex((i) => i._id === itemId);

    if (idx === -1) {
      const result = { _id: itemId, count: 1 };
      itemCounts.push(result);
    } else {
      itemCounts[idx].count++;
    }

    this.setState({ itemCounts });
    this.updateMyStaples(itemCounts);
    try {
      await updateItemCounts(this.props.user._id, itemCounts);
    } catch (err) {}
  };

  updateMyStaples = (itemCounts) => {
    const addedItems = [...this.state.addedItems].map((i) => i._id);
    const allItems = [...this.props.items];

    // only include items not already present in addedItems
    const filtered = itemCounts.filter((item) => {
      return !addedItems.includes(item._id);
    });
    // console.log("filtered", filtered);
    const staples = filtered
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)
      .map((i) => {
        return allItems.find((item) => item._id === i._id);
      });
    // return results;
    this.setState({ staples });
  };

  handleAddRecipeIngredients = async (recipe) => {
    // console.log(recipe);
    let itemsToAdd = recipe.ingredients.map((ingredient) => {
      return ingredient.item;
    });

    const prevAddedItems = [...this.state.addedItems];
    const prevAddedItemIds = prevAddedItems.map((item) => item._id);
    itemsToAdd = itemsToAdd.filter((item) => {
      return !prevAddedItemIds.includes(item._id);
    });

    let newAddedItems = [...this.state.addedItems, ...itemsToAdd];

    newAddedItems = this.sortItems(newAddedItems);
    const newAddedItemIds = newAddedItems.map((item) => item._id);

    this.setState({ addedItems: newAddedItems });
    const itemCounts = [...this.state.itemCounts];
    setTimeout(() => {
      this.updateMyStaples(itemCounts);
    }, 300);

    try {
      await updateShoppingList(this.props.user._id, newAddedItemIds);
      this.handleUpdatePieChart();
    } catch (err) {
      // revert state back to original
      this.setState({ addedItems: prevAddedItems });
      this.handleUpdatePieChart();
      console.log("Something went wrong.", err);
    }
  };

  handlePermDelete = async (idx) => {
    const prevRemovedItems = [...this.state.removedItems];
    const newRemovedItems = [...this.state.removedItems];
    newRemovedItems.splice(idx, 1);
    const newRemovedItemsIds = newRemovedItems.map((item) => item._id);
    this.setState({ removedItems: newRemovedItems });
    const pageHeadingNode = this.pageHeadingRef.current;
    pageHeadingNode.focus();
    try {
      await deleteItemFromShoppingList(this.props.user._id, newRemovedItemsIds);
    } catch (err) {
      // revert state back to original
      this.setState({ removedItems: prevRemovedItems });
      console.log("Something went wrong.", err);
    }
  };

  handleClearAll = async () => {
    // console.log("clearing all!");
    const prevAddedItems = [...this.state.addedItems];
    const prevRemovedItems = [...this.state.removedItems];
    this.setState({ addedItems: [], removedItems: [] });
    setTimeout(() => {
      this.handleUpdatePieChart();
    }, 10);

    try {
      await clearAllFromShoppingList(this.props.user._id, [], []);
    } catch (err) {
      // revert state back to original
      this.setState({
        addedItems: prevAddedItems,
        removedItems: prevRemovedItems,
      });
      console.log("Something went wrong.", err);
    }
  };

  render() {
    const {
      addedItems,
      removedItems,
      totalNumItems,
      totalPriceItems,
      catPercents,
      staples,
      userRecipes,
      isLoading,
    } = this.state;

    let numAllItems = 0;
    if (addedItems) numAllItems += addedItems.length;
    if (removedItems) numAllItems += removedItems.length;
    // console.log('numAllItems', numAllItems);

    return (
      <React.Fragment>
        {isLoading && <p>page loading...</p>}
        <div className="row sl-page-heading">
          <div className="col-md-3"></div>
          <div className="col-md">
            <h2 ref={this.pageHeadingRef}>Shopping List</h2>
          </div>
          <div className="col-md"></div>
        </div>
        <hr className="divider" />
        <div className="row">
          <div className="col-md-5 order-md-4 shop-list">
            <div className="itemSearch pb-3">
              <ItemSearch
                items={this.props.items}
                update={this.handleUpdate}
                clearOnBlur={true}
                initialValue={""}
              />
            </div>
            <div className="list-group lst-grp-hover lst-grp-striped">
              {!addedItems
                ? null
                : addedItems.map((item, i) => (
                    <li
                      key={i}
                      onClick={this.handleRemoveItem.bind(this, item._id)}
                      style={{
                        borderTop: 0,
                        borderBottom: 0,
                        borderRight: 0,
                        borderLeft: `15px solid ${getColor(item.category)}`,
                      }}
                      className="list-group-item"
                    >
                      <span
                        className={
                          this.state.activeId === item._id ? "strike" : ""
                        }
                      >
                        {item.name}
                      </span>
                      <span className="sl-price">${item.price.toFixed(2)}</span>
                    </li>
                  ))}
            </div>
            <div className="list-group lst-grp-hover lst-grp-removed">
              {!removedItems
                ? null
                : removedItems.map((item, i) => (
                    <li
                      //   onClick=""
                      key={i}
                      className="list-group-item"
                      style={{
                        borderTop: 0,
                        borderBottom: 0,
                        borderRight: 0,
                        borderLeft: "15px solid #fff",
                      }}
                    >
                      <span
                        className="removed"
                        onClick={() => this.handleAddBackItem(item._id)}
                      >
                        {item.name}
                      </span>
                      <span className="perm-delete">
                        <FaTrash
                          className="hover-icon"
                          onClick={() => this.handlePermDelete(i)}
                        />
                      </span>
                    </li>
                  ))}
              {numAllItems > 0 && (
                <React.Fragment>
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#warnClearAll"
                    className="btn btn-secondary clear-all"
                  >
                    Clear All
                  </button>
                  <div
                    className="modal fade"
                    id="warnClearAll"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="warnClearAll"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Are you sure?
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          This will delete all items in your Shopping List
                          including your lined-through items. This cannot be
                          undone.
                        </div>
                        <div className="modal-footer d-flex justify-content-start">
                          <button
                            onClick={() => this.handleClearAll()}
                            type="button"
                            data-dismiss="modal"
                            className="btn btn-danger"
                          >
                            Clear All
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
          <div className="col-md-4 order-md-12 pie">
            {totalNumItems > 0 && (
              <React.Fragment>
                <h5>List Summary</h5>
                <div className="totals">
                  ${totalPriceItems}
                  <span className="num-items">
                    {totalNumItems} Item{totalNumItems > 1 ? "s" : ""}
                  </span>
                </div>
                <PieChart
                  totalNumItems={totalNumItems}
                  totalPriceItems={totalPriceItems}
                  catPercents={catPercents}
                />
              </React.Fragment>
            )}
            {/* <div className="trial-cover"></div> */}
            <ul className="category-legend">
              {totalNumItems > 0 &&
                catPercents.map((cat, i) => {
                  return (
                    <li key={i}>
                      <span
                        style={{
                          display: "inline-block",
                          backgroundColor: cat.color,
                          width: "12px",
                          height: "12px",
                          marginRight: ".5em",
                        }}
                      ></span>
                      {cat.name}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="col-md-3 order-md-1">
            {!isLoading && <h5>My Staples</h5>}
            <div className="list-group lst-grp-hover myStaples">
              {!isLoading &&
                staples &&
                staples.map(
                  (item, i) =>
                    item && (
                      <li
                        key={i}
                        className="list-group-item border-0"
                        onClick={() => this.handleAddItemFromSearchBox(item)}
                      >
                        {item.name}
                      </li>
                    )
                )}
            </div>
            {!isLoading && <h5 className="my-recipes-header">My Recipes</h5>}
            <div className="list-group lst-grp-hover myRecipes">
              {!isLoading &&
                userRecipes &&
                userRecipes.map(
                  (recipe, i) =>
                    recipe && (
                      <li
                        key={i}
                        className="list-group-item border-0"
                        // onClick={() => this.handleAddItemFromSearchBox(recipe)}
                        onClick={() => this.handleAddRecipeIngredients(recipe)}
                      >
                        {recipe.title}
                      </li>
                    )
                )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ShoppingList;
