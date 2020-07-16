import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getUnits } from "../services/unitService";
import { getQuantities } from "../services/qtyService";
import { getRecipe } from "../services/recipeService";
import { FaTrash } from "react-icons/fa";
import ItemSearch from "../components/itemSearch";

class RecipeFormDev extends Form {
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
    // Bind the this context to the handler function
    this.handleIngredientUpdate = this.handleIngredientUpdate.bind(this);
    // this.handleValidation = this.handleValidation.bind(this);

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

  render() {
    const { ingredients } = this.state;

    return (
      <React.Fragment>
        {this.renderInput("title", "Title")}
        <table className="table table-hover ingredients-form">
          <thead>
            <tr>
              <th className="pl-2"> Qty </th>
              <th className="pl-2"> Unit </th>
              <th className="pl-2"> Item </th>
              <th className="pl-2"> Notes </th>
              <th className=""> </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(ingredients.length)].map((row, i) => {
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
                        update={this.handleIngredientUpdate}
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
                    <td className="delete">
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

export default RecipeFormDev;
