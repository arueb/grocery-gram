import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import _ from "lodash";
import { getUnits } from "../services/unitService";
import { getQuantities } from "../services/qtyService";
import { getRecipe } from "../services/recipeService";
import { FaTrash, FaRegHandScissors } from "react-icons/fa";
import ItemSearch from "../components/itemSearch";

class RecipeForm extends Form {
  state = {
    errors: {},
    units: [],
    quantities: [],
    rows: [{}],
    data: {
      title: "",
    },
    ingredients: [{ qty: "", unit: "", itemId: "", notes: "" }],
  };

  schema = {
    qty: Joi.string().label("Qty"),
    unit: Joi.string().label("Unit"),
    itemId: Joi.string().label("Item"),
    notes: Joi.string().label("Notes"),
    title: Joi.string().label("Title"),
  };

  // populates recipe in state if valid recipe id
  async populateRecipe() {
    try {
      const recipeId = this.props.match.params.id;
      //   console.log("recipeId", recipeId);
      if (recipeId === "test") return; /// TODO:  Change this "new" instead of test

      const { data: recipe } = await getRecipe(recipeId);
      this.setState({
        recipeId: recipe[0]._id,
        ingredients: recipe[0].ingredients,
        // ingredients: this.mapToViewModel(recipe),
      });

      const data = { ...this.state.data };
      data.title = recipe[0].title;
      this.setState({ data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    // Bind the this context to the handler functions
    this.handleIngredientUpdate = this.handleIngredientUpdate.bind(this);
    this.handleValidation = this.handleValidation.bind(this);

    // load the recipe (unless new)
    await this.populateRecipe();

    // load the units and quantitiy options for select boxes into local state
    this.setState({ units: getUnits(), quantities: getQuantities() });
  }

  // handle adding a new row to the ingredients table
  handleAddRow = () => {
    const ingredient = {
      qty: "",
      unit: "",
      item: "",
      notes: "",
    };
    const ingredients = [...this.state.ingredients, ingredient];
    this.setState({ ingredients });
  };

  // handle deleting a row from the ingredients table
  handleRemoveSpecificRow = (idx) => () => {
    const ingredients = [...this.state.ingredients];
    ingredients.splice(idx, 1);
    this.setState({ ingredients });
  };

  // handle updating ingredients from child itemSearch component
  // updates itemId
  handleIngredientUpdate(value, row) {
    const ingredients = [...this.state.ingredients];
    ingredients[row].itemId = value;
    this.setState({ ingredients });
  }

  // updates the id property of ingredients in state
  // either updates the id from the itemSearch component or clears it out if item is invalid
  // updates itemId
  handleValidation(isValidName, row, id) {
    const ingredients = [...this.state.ingredients]; // clone ingredients from state

    if (!isValidName) {
      ingredients[row].itemId = "";
    } else {
      ingredients[row].itemId = id;
    }

    this.setState({ ingredients });
  }

  render() {
    const { ingredients } = this.state;

    return (
      <React.Fragment>
        {this.renderInput("title", "Title")}
        <table className="table table-bordered table-hover ingredients-form">
          <thead>
            <tr>
              <th className="text-center"> Qty </th>
              <th className="text-center"> Unit </th>
              <th className="text-center"> Item </th>
              <th className="text-center"> Notes </th>
              <th className="text-center"> </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(ingredients.length)].map((row, i) => {
              console.log("RecipeForm rendering row: ", i);
              console.log("itemid for row" + i + ":", ingredients[i].itemId);
              return (
                (this.state.recipeId ||
                  this.props.match.params.id === "test") && (
                  <tr key={i}>
                    <td>
                      {this.renderMultiRowSelect(
                        "qty",
                        null,
                        i,
                        "ingredients",
                        this.state.quantities
                      )}
                    </td>
                    <td>
                      {this.renderMultiRowSelect(
                        "unit",
                        null,
                        i,
                        "ingredients",
                        this.state.units
                      )}
                    </td>
                    <td>
                      <ItemSearch
                        items={this.props.items}
                        updateIngredient={this.handleIngredientUpdate}
                        validateItem={this.handleValidation}
                        row={i}
                        initialValue={
                          ingredients[i].item ? ingredients[i].item.name : ""
                        }
                      />
                    </td>
                    <td>
                      {this.renderMultiRowInput(
                        "notes",
                        null,
                        i,
                        "ingredients"
                      )}
                    </td>
                    <td>
                      <FaTrash
                        className="hover-icon"
                        onClick={this.handleRemoveSpecificRow(i)}
                      />
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
        <button onClick={this.handleAddRow} className="btn btn-primary">
          Add Ingredient +
        </button>
      </React.Fragment>
    );
  }
}

export default RecipeForm;
