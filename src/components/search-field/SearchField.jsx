import './SearchField.scss';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { dateSelector } from '../../AirportStore/flights.selectors';
import { useLocation, useHistory } from 'react-router-dom';
// import qs from 'qs';
import * as qs from 'qs';
// import moment from 'moment';

function SearchField({ date }) {
  // console.log(state); //==> flights: {flightsList: {…}, date: '01-12-2018'}
  // console.log(state.flightsList); //==> body: {departure: Array(88), arrival: Array(86)}, error: {code: 200}
  // console.log(date); // null ==> some time ==> 01-12-2018
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();
  const history = useHistory();

  const handleSearch = event => {
    event.preventDefault();
    let dataQuery = {
      search: inputValue,
      date,
    };
    let pathname = '';
    if (location.pathname === '/') {
      pathname = '/departures?';
    } else {
      dataQuery = {
        ...dataQuery,
        ...qs.parse(location.search, { ignoreQueryPrefix: true }),
        search: inputValue,
      };
      pathname = location.pathname + '?';
    }
    const queryString = qs.stringify(dataQuery);
    // console.log(queryString);
    history.push(`${pathname}${queryString}`);
    // console.log(history);
  };

  return (
    <div className="search-field">
      <h2 className="search-field__title">Search flight</h2>
      <form className="search-field__form" onSubmit={handleSearch}>
        <i className="material-icons search-field__icon">search</i>
        <input
          className="search-field__input"
          type="text"
          placeholder="Airline, destination or flight #"
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
        />
        <button className="search-field__btn" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    date: dateSelector(state),
  };
};

export default connect(mapStateToProps)(SearchField);
