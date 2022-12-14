import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as flightsActions from '../../AirportStore/flights.actions';
import moment from 'moment';
import SearchField from '../search-field/SearchField';
import FlightsSchedule from '../flights-schedule/FlightsSchedule';
import PropTypes from 'prop-types';

function SearchFlightsPage({ fetchFlightsList, flightsList }) {
  useEffect(() => {
    const fakeCurrentDay = moment('2018-12-01');
    fetchFlightsList(moment(fakeCurrentDay));
  }, []);

  return (
    <React.StrictMode>
      <SearchField />
      <FlightsSchedule />
    </React.StrictMode>
  );
}

const mapDispatchToProps = {
  fetchFlightsList: flightsActions.fetchFlightsList,
};

export default connect(null, mapDispatchToProps)(SearchFlightsPage);

SearchFlightsPage.propTypes = {
  fetchFlightsList: PropTypes.func.isRequired,
};
