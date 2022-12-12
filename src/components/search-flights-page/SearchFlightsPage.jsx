import './SearchFlightsPage.scss';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as flightsActions from '../../AirportStore/flights.actions';
import moment from 'moment';
import SearchField from '../search-field/SearchField';
import FlightsSchedule from '../flights-schedule/FlightsSchedule';

function SearchFlightsPage({ fetchFlightsList }) {
  useEffect(() => {
    // today is not `2018-12-01`
    fetchFlightsList(moment(`2018-12-01`).format('DD-MM-YYYY'));
    // console.log(fetchFlightsList);
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
