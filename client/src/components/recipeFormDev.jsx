import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import _ from "lodash";
import { getUnits } from "../services/unitService";
import { getQuantities } from "../services/qtyService";
import { FaTrash } from "react-icons/fa";
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
    ingredients: [{ qty: "", unit: "", item: "", notes: "" }],
  };

  schema = {
    qty: Joi.string().label("Qty"),
    unit: Joi.string().label("Unit"),
    item: Joi.string().label("Item"),
    notes: Joi.string().label("Notes"),
    title: Joi.string().label("Title"),
  };

  componentDidMount() {
    // const genres = await getUnits();
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

  render() {
    const { ingredients } = this.state;
    console.log("ingredients in render", ingredients);
    console.log("ingredients.length", ingredients.length);
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
                    {" "}
                    {this.renderMultiRowInput(
                      "item",
                      null,
                      i,
                      "ingredients"
                    )}{" "}
                  </td>
                  <td>
                    {" "}
                    {this.renderMultiRowInput(
                      "notes",
                      null,
                      i,
                      "ingredients"
                    )}{" "}
                  </td>
                  <td>
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
      </React.Fragment>
    );
  }
}

export default RecipeForm;
