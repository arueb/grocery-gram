import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getUnits } from "../services/unitService";
import { getQuantities } from "../services/qtyService";
import { FaTrash } from "react-icons/fa";
class RecipeForm extends Form {
  state = {
    data: [{ qty: "", unit: "", item: "", notes: "" }],
    errors: {},
    units: [],
    quantities: [],
    rows: [{}],
  };

  schema = {
    qty: Joi.number().label("Qty"),
    unit: Joi.string().label("Unit"),
    item: Joi.string().label("Item"),
    notes: Joi.string().label("Notes"),
  };

  componentDidMount() {
    // const genres = await getUnits();
    this.setState({ units: getUnits(), quantities: getQuantities() });
  }

  handleChange = (idx) => (e) => {
    console.log("handling change");
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      [name]: value,
    };
    this.setState({
      rows,
    });
  };

  handleAddRow = async () => {
    console.log("state.data:", this.state.data);
    const ingredient = {
      qty: "",
      unit: "",
      item: "",
      notes: "",
    };
    const newData = [...this.state.data, ingredient];
    console.log(newData);

    await this.setState({
      data: newData,
    });
    console.log("state.data.length:", this.state.data.length);
  };

  handleRemoveRow = () => {
    this.setState({
      rows: this.state.rows.slice(0, -1),
    });
  };

  handleRemoveSpecificRow = (idx) => () => {
    console.log("removing row");
    const data = [...this.state.data];
    data.splice(idx, 1);
    this.setState({ data });
  };

  render() {
    return (
      //   <form onSubmit={this.handleSubmit}>
      <React.Fragment>
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
            {[...Array(this.state.data.length)].map((row, i) => {
              return (
                <tr key={i}>
                  {/* <td> {this.renderMultiRowInput("qty", null, i)} </td> */}
                  <td>
                    {this.renderMultiRowSelect(
                      "qty",
                      null,
                      i,
                      this.state.quantities
                    )}
                  </td>
                  <td>
                    {this.renderMultiRowSelect(
                      "unit",
                      null,
                      i,
                      this.state.units
                    )}
                  </td>
                  <td> {this.renderMultiRowInput("item", null, i)} </td>
                  <td> {this.renderMultiRowInput("notes", null, i)} </td>
                  <td>
                    <FaTrash
                      className="hover-icon"
                      onClick={this.handleRemoveSpecificRow(i)}
                    />
                    {/* <FaTrash onClick={(i) => this.handleRemoveSpecificRow(i)} /> */}
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
      //   </form>
    );
    //   <div>
    //     <div className="container">
    //       <div className="row clearfix">
    //         <div className="col-md-12 column">
    //           <table
    //             className="table table-bordered table-hover"
    //             id="tab_logic"
    //           >
    //             <thead>
    //               <tr>
    //                 <th className="text-center"> # </th>
    //                 <th className="text-center"> Qty </th>
    //                 <th className="text-center"> Item </th>
    //                 <th />
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {this.state.rows.map((item, idx) => (
    //                 <tr id="addr0" key={idx}>
    //                   <td>{idx}</td>
    //                   <td>
    //                     {/* <input
    //                       type="text"
    //                       name="name"
    //                       value={this.state.rows[idx].name}
    //                       onChange={this.handleChange(idx)}
    //                       className="form-control"
    //                     /> */}
    //                     {this.renderInput("qty", "Qty")}
    //                   </td>
    //                   <td>
    //                     <input
    //                       type="text"
    //                       name="mobile"
    //                       value={this.state.rows[idx].mobile}
    //                       onChange={this.handleChange(idx)}
    //                       className="form-control"
    //                     />
    //                   </td>
    //                   <td>
    //                     <button
    //                       className="btn btn-outline-danger btn-sm"
    //                       onClick={this.handleRemoveSpecificRow(idx)}
    //                     >
    //                       Remove
    //                     </button>
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //           <button onClick={this.handleAddRow} className="btn btn-primary">
    //             Add Row
    //           </button>
    //           <button
    //             onClick={this.handleRemoveRow}
    //             className="btn btn-danger float-right"
    //           >
    //             Delete Last Row
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
  }
}

export default RecipeForm;
