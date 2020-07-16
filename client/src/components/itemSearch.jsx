import Autosuggest from "react-autosuggest";
import React, { Component } from "react";
import { getColor } from "../services/itemService";

// load autosuggest-highlight library functions
const AutosuggestHighlightMatch = require("autosuggest-highlight/match");
const AutosuggestHighlightParse = require("autosuggest-highlight/parse");

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// function getSuggestions(value) {
function getSuggestions(value, data) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === "") {
    return [];
  }

  const regex = new RegExp("\\b" + escapedValue, "i");
  return data.filter((item) => regex.test(getSuggestionValue(item)));
}

function getSuggestionValue(suggestion) {
  return `${suggestion.name}`;
}

function renderSuggestion(suggestion, { query }) {
  const suggestionText = `${suggestion.name}`;
  const matches = AutosuggestHighlightMatch(suggestionText, query);
  const parts = AutosuggestHighlightParse(suggestionText, matches);

  return (
    <span
      style={{ backgroundColor: getColor(suggestion.category) }}
      className={"suggestion-content "}
    >
      <span className="name">
        {parts.map((part, index) => {
          const className = part.highlight ? "highlight" : null;

          return (
            <span className={className} key={index}>
              {part.text}
            </span>
          );
        })}
      </span>
    </span>
  );
}

class ItemSearch extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: [],
    };
  }

  async componentDidMount() {
    const { initialValue, row } = this.props;
    this.setState({ value: initialValue });
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue,
    });
  };

  // performs validation when itemSearch field loses focus
  onBlur = (event, { highlightedSuggestion }) => {
    // TODO: test to make sure this is tab key event
    if (this.state.suggestions.length && highlightedSuggestion) {
      const suggestionId = highlightedSuggestion._id;
      // there is a suggestion to use

      // set the value (ingredient name) in local state
      //   this.setState({ value: this.state.suggestions[0].name });
      this.setState({ value: highlightedSuggestion.name });

      // update the ingredient id
      //   this.props.update(this.state.suggestions[0]._id, this.props.row);
      this.props.update(this.state.suggestionId, this.props.row);
    } else {
      // there is no suggestion to use

      // check if an item matching this name exists in master item list
      const match = this.props.items.filter(
        (item) => item.name === this.state.value
      );

      const isValidName = match.length;
      if (isValidName) {
        this.props.update(match[0]._id, this.props.row);
      } else {
        this.props.update("", this.props.row);
        this.setState({ value: "" });
      }
    }
  };

  onSuggestionsFetchRequested = ({ value }) => {
    const items = [...this.props.items];
    // console.log("my items array:", items);
    this.setState({
      suggestions: getSuggestions(value, items),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  // update the ingredient in parent state
  onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    this.props.update(suggestion._id, this.props.row);
    console.log("set focus to notes field");
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search ingredients...",
      value,
      onChange: this.onChange,
      onBlur: this.onBlur,
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionSelected}
      />
    );
  }
}
export default ItemSearch;
