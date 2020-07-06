import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

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
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault(); //prevent roundtrip http request to server

    const errors = this.validate();
    // console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    // if (errorMessage) errors[input.name] = errorMessage;
    // else delete errors[input.name];
    if (!errorMessage) errors[input.name] = errorMessage;
    delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
    // this.setState({ data });
  };

  renderButton(label) {
    console.log(this.validate());
    return (
      <button
        className="btn btn-primary"

        // disabled={this.state.errors.length === 0} // returns truthy if errors exist or falsy if null
      >
        {label}
      </button>
    );
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
}

export default Form;
