import React from 'react';
import Autosuggest from 'react-autosuggest';

const getSuggestions = value => {
    const fetchSuggestions = async () => {
        const inputValue = value.trim();
        const options = {
            method: 'GET',
            headers: {
                'X-BingApis-SDK': 'true',
                'X-RapidAPI-Key': 'a94f51c1b4mshd60d88614931462p1d2e00jsn544377ac7a95',
                'X-RapidAPI-Host': 'bing-autosuggest1.p.rapidapi.com',
            }
        };
        // const response = await fetch(`https://bing-autosuggest1.p.rapidapi.com/suggestions?q=${this.state.value}`, options);
        // const data = await response.json();
        // const suggestions = data.suggestionGroups[0].searchSuggestions.map(element => element.displayText);
    };
    return ['home', 'cat', 'pig', 'flower', 'nice'];
};

const getSuggestionValue = suggestion => suggestion;
const renderSuggestion = suggestion => (
    <div className='react-autosuggest__suggestion-container'>
        {suggestion}
    </div>
);

class SearchInput extends React.Component {
    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: [],
        };

    };

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        })
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    }

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            value,
            placeholder: 'Search news',
            className: 'react-autosuggest__search-bar form-control',
            onChange: this.onChange,
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
        )
    }
}

export default SearchInput;