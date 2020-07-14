import Autosuggest from "react-autosuggest";
import React, { Component } from "react";
import { getColor } from "../services/itemService";

// import { AutosuggestHighlightParse } from "autosuggest-highlight/parse";
// import { <AutosuggestHighlightMatch></AutosuggestHighlightMatch> } from "autosuggest-highlight/match";

var AutosuggestHighlightMatch = require("autosuggest-highlight/match");
var AutosuggestHighlightParse = require("autosuggest-highlight/parse");

const people = [
  {
    first: "Charlie",
    last: "Brown",
    twitter: "dancounsell",
  },
  {
    first: "Charlotte",
    last: "White",
    twitter: "mtnmissy",
  },
  {
    first: "Chloe",
    last: "Jones",
    twitter: "ladylexy",
  },
  {
    first: "Cooper",
    last: "King",
    twitter: "steveodom",
  },
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// function getSuggestions(value) {
function getSuggestions(value, data) {
  const escapedValue = escapeRegexCharacters(value.trim());
  console.log("in getSuggestions -  data:", data);
  console.log("people", people);
  if (escapedValue === "") {
    return [];
  }

  const regex = new RegExp("\\b" + escapedValue, "i");

  return data.filter((person) => regex.test(getSuggestionValue(person)));
  // return people.filter((person) => regex.test(getSuggestionValue(person)));
}

function getSuggestionValue(suggestion) {
  return `${suggestion.name}`;
}

function renderSuggestion(suggestion, { query }) {
  const suggestionText = `${suggestion.name}`;
  const matches = AutosuggestHighlightMatch(suggestionText, query);
  const parts = AutosuggestHighlightParse(suggestionText, matches);

  return (
    // <span className={"suggestion-content " + suggestion.twitter}>
    // <span className={"suggestion-content " + suggestion.category}>
    <span className={"suggestion-content " + getColor(suggestion.category)}>
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

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    const items = [...this.props.items];
    console.log("my items array:", items);
    this.setState({
      suggestions: getSuggestions(value, items),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type 'c'",
      value,
      onChange: this.onChange,
      //   onChange: this.onChange.bind(this),
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
export default ItemSearch;
