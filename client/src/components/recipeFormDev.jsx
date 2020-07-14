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
    // ingredients: [{ qty: "", unit: "", item: "", notes: "" }],
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

  async populateRecipe() {
    try {
      const recipeId = this.props.match.params.id;
      console.log("recipeId", recipeId);
      if (recipeId === "test") return; /// CHANGE THIS TO "new"

      const { data: recipe } = await getRecipe(recipeId);
      console.log("recipe", recipe[0]);
      console.log("ingredients view:", this.mapToViewModel(recipe));
      this.setState({ ingredients: this.mapToViewModel(recipe) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  mapToViewModel(recipe) {
    return recipe[0].ingredients;
  }

  // recipe[0].ingredients.map((i) => {
  //   return {
  //     item: i.item,
  //     qty: i.qty,
  //     notes: i.notes,
  //     unt: i.unit,
  //   };
  // });

  //   ingredients: [
  //     ...recipe[0].ingredients.map((i) => {
  //       return {
  //         item: i.item,
  //         qty: i.qty,
  //         notes: i.notes,
  //         unt: i.unit,
  //       };
  //     }),
  //   ],
  // _id: movie._id,
  // title: movie.title,
  // genreId: movie.genre._id,
  // numberInStock: movie.numberInStock,
  // dailyRentalRate: movie.dailyRentalRate,
  //     };
  //   }

  async componentDidMount() {
    this.testHandler = this.testHandler.bind(this);
    await this.populateRecipe();
    this.setState({ units: getUnits(), quantities: getQuantities() });
  }

  //   handleChange = (idx) => (e) => {
  //     console.log("handling change");
  //     const { name, value } = e.target;
  //     const rows = [...this.state.rows];
  //     rows[idx] = {
  //       [name]: value,
  //     };
  //     this.setState({
  //       rows,
  //     });
  //   };

  handleAddRow = async () => {
    const ingredient = {
      qty: "",
      unit: "",
      item: "",
      notes: "",
    };
    const ingredients = [...this.state.ingredients, ingredient];
    this.setState({ ingredients });
  };

  //   handleRemoveRow = () => {
  //     this.setState({
  //       rows: this.state.rows.slice(0, -1),
  //     });
  //   };

  handleRemoveSpecificRow = (idx) => () => {
    const ingredients = [...this.state.ingredients];
    ingredients.splice(idx, 1);
    this.setState({ ingredients });
  };

  testHandler(value, row) {
    const ingredients = [...this.state.ingredients];
    ingredients[row].itemId = value;
    console.log("ingredients:", ingredients);
    this.setState({ ingredients });
    // this.setState({
    //   testProp: row + ": " + value,
    // });
  }

  render() {
    const { ingredients } = this.state;
    console.log("props", this.props);

    // console.log("ingredients in render", ingredients);
    // console.log("ingredients.length", ingredients.length);
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
                <tr key={i}>
                  {/* <td> {this.renderMultiRowInput("qty", null, i)} </td> */}
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
                  {/* <td> {this.renderMultiRowInput("item", null, i)} </td> */}
                  {/* <td> {this.renderMultiRowInput("notes", null, i)} </td> */}
                  <td>
                    <ItemSearch
                      //   ingredients={this.state.ingredients}
                      items={this.props.items}
                      action={this.testHandler}
                      row={i}
                      initialValue={ingredients[i].itemId}
                    />
                    {this.renderMultiRowInput("itemId", null, i, "ingredients")}{" "}
                  </td>
                  <td>
                    {this.renderMultiRowInput("notes", null, i, "ingredients")}
                  </td>
                  <td>
                    {/* <ItemSearch items={this.props.items} /> */}
                    <FaTrash
                      className="hover-icon"
                      onClick={this.handleRemoveSpecificRow(i)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={this.handleAddRow} className="btn btn-primary">
          Add Ingredient +
        </button>
        {/* <ItemSearch items={this.props.items} /> */}
      </React.Fragment>
    );
  }
}

export default RecipeForm;
