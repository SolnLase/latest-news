import React from "react";
import Autosuggest from "react-autosuggest";
import { connect } from "react-redux";
import { addSearchQuery } from "../actionCreators";

const getSuggestionValue = (suggestion) => suggestion;
const renderSuggestion = (suggestion) => (
  <div className="react-autosuggest__suggestion-container">{suggestion}</div>
);

class SearchQuery extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      qInTitle: false,
      suggestions: [],
    };
  }

  componentDidUpdate() {}

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  // onSuggestionsFetchRequested = ({ value }) => {
  //   this.setState({
  //     suggestions: getSuggestions(value),
  //   });
  // };

  onSuggestionsFetchRequested = async ({ value }) => {
    const inputValue = value.toLowerCase().trim();
    const options = {
      method: "GET",
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": "a94f51c1b4mshd60d88614931462p1d2e00jsn544377ac7a95",
        "X-RapidAPI-Host": "bing-autosuggest1.p.rapidapi.com",
      },
    };
    // const response = await fetch(`https://bing-autosuggest1.p.rapidapi.com/suggestions?q=${inputValue}`, options);
    // const data = await response.json();
    // console.log(data)
    // const suggestions = data.suggestionGroups[0].searchSuggestions.map(element => element.displayText);
    const suggestions = ["home", "cat", "pig", "flower", "nice"];
    this.setState({ suggestions });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatchSearchQuery(
      this.state.value,
      this.state.qInTitle
    );
    this.onSuggestionsClearRequested();
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      value,
      placeholder: "Search news",
      className: "react-autosuggest__search-bar form-control",
      onChange: this.onChange,
    };
    
    return (
      <form onSubmit={this.handleSubmit} className="search-form">
        <div
          className="form-check me-3"
          style={{ fontSize: "0.9rem", margin: "auto" }}
        >
          <input
            onClick={() =>
              this.setState({
                qInTitle: !this.state.qInTitle,
              })
            }
            id="flexCheckDefault8"
            type="checkbox"
            className="form-check-input"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault8">
            Search only in titles
          </label>
        </div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSearchQuery: (value, qInTitle) =>
    dispatch(addSearchQuery(value, qInTitle)),
});

const SearchQueryContainer = connect(null, mapDispatchToProps)(SearchQuery);

export default SearchQueryContainer;
