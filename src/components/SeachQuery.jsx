import React from "react";
import { connect } from "react-redux";
import { addSearchQuery } from "../actionCreators";

class SearchQuery extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      qInTitle: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatchSearchQuery(this.state.value, this.state.qInTitle);
  };

  render() {
    return (
      <form className="header__q" onSubmit={this.handleSubmit}>
        <input className="header__text-field" type="text" />
        <label className="header__checkbox-label" htmlFor="onlyInTitles">
          Only in titles
          <input
            className="header__checkbox"
            id="onlyInTitles"
            type="checkbox"
            onClick={() =>
              this.setState({
                qInTitle: !this.state.qInTitle,
              })
            }
          />
        </label>
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
