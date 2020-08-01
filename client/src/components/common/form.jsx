import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import TextArea from "./textArea";
import Select from "./select";
import Slider from "./slider";

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
    // console.log("validating property...");
    const obj = { [name]: value };
    // console.log("obj:", obj);
    const schema = { [name]: this.schema[name] };
    // console.log("schema", schema);
    const { error } = Joi.validate(obj, schema);
    // console.log("error:", error);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault(); //prevent roundtrip http request to server
    console.log("handling submit");
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleSliderChange = ({ currentTarget: input }) => {
    // console.log("handle slider change called");
    // console.log(input.checked);
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (!errorMessage) delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.checked;
    this.setState({ data, errors });
  };

  handleChange = ({ currentTarget: input }) => {
    // console.log("handle change called");
    // console.log(input.value);
    // console.log(e.target.value);
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

  renderButton(label, style = "btn btn-dark mt-4 mr-2") {
    // console.log(this.validate());
    return <button className={style}>{label}</button>;
  }

  renderButtonCustomHandler(
    label,
    handleClick,
    style = "btn btn-dark mt-4 mr-2"
  ) {
    // console.log(this.validate());
    return (
      <button className={style} onClick={(e) => handleClick(e)}>
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text", placeholder = "") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        placeholder={placeholder}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSlider(name, label, checked = false) {
    const { errors } = this.state;

    return (
      <Slider
        name={name}
        label={label}
        checked={checked}
        // checked={data["isPublished"]}
        // value={data[name]}
        // onClick={this.handleChange}
        onChange={this.handleSliderChange}
        // onClick={(e) => this.handleSliderChange(e)}
        // handleChange={this.handleChange.bind(this)}
        error={errors[name]}
      />
    );
  }

  renderTextArea(name, label, rows, placeholder = "") {
    const { data, errors } = this.state;
    return (
      <TextArea
        name={name}
        label={label}
        placeholder={placeholder}
        rows={rows}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderMultiRowInput(
    name,
    label,
    row,
    valueField,
    type = "text",
    placeholder = ""
  ) {
    const { errors } = this.state;
    const stateField = this.state[valueField];

    return (
      <Input
        type={type}
        name={name}
        label={label}
        placeholder={placeholder}
        value={stateField[row][name]}
        onChange={(e) => this.handleChangeMultiRow(e, row, valueField)}
        error={row === this.state.validateIngredientsRow && errors[name]}
        // error={errors[name]}
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

  renderMultiRowSelect(name, label, row, valueField, options, placeholder) {
    const { errors } = this.state;
    const stateField = this.state[valueField];

    return (
      <Select
        name={name}
        label={label}
        // placeholder={placeholder}
        value={stateField[row][name]}
        options={options}
        onChange={(e) => this.handleChangeMultiRow(e, row, valueField)}
        // error={errors[name]}
        error={row === this.state.validateIngredientsRow && errors[name]}
      />
    );
  }
}

export default Form;
