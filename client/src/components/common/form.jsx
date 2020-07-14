import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    error: {},
  };

  validate = () => {
    const options = { abortEarly: true };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    console.log("validating property...");
    const obj = { [name]: value };
    console.log("obj:", obj);
    const schema = { [name]: this.schema[name] };
    console.log("schema", schema);
    const { error } = Joi.validate(obj, schema);
    console.log("error:", error);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault(); //prevent roundtrip http request to server
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (!errorMessage) delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleChangeMultiRow = async ({ currentTarget: input }, row, valueField) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (!errorMessage) delete errors[input.name];
    const data = [...this.state[valueField]];
    data[row][input.name] = input.value;
    this.setState({ valueField: data, errors });
  };

  renderButton(label) {
    console.log(this.validate());
    return <button className="btn btn-primary">{label}</button>;
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderMultiRowInput(name, label, row, valueField, type = "text") {
    const { errors } = this.state;
    const stateField = this.state[valueField];

    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={stateField[row][name]}
        onChange={(e) => this.handleChangeMultiRow(e, row, valueField)}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderMultiRowSelect(name, label, row, valueField, options) {
    const { errors } = this.state;
    const stateField = this.state[valueField];
    // console.log("value of multirow select", data.ingredients[row][name]);
    return (
      <Select
        name={name}
        label={label}
        value={stateField[row][name]}
        options={options}
        onChange={(e) => this.handleChangeMultiRow(e, row, valueField)}
        error={errors[name]}
      />
    );
  }
}

export default Form;
