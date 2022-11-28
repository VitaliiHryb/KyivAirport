import './SearchFlightsPage.scss';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as flightsActions from '../../flights.actions';
import moment from 'moment';
import SearchField from '../search-field';
import FlightsSchedule from '../flights-schedule';

function SearchFlightsPage({ fetchFlightsList }) {
  useEffect(() => {
    fetchFlightsList(moment().format('DD-MM-YYYY'));
  }, []);

  return (
    <>
      <SearchField />
      <FlightsSchedule />
    </>
  );
}

const mapDispatchToProps = {
  fetchFlightsList: flightsActions.fetchFlightsList,
};

export default connect(null, mapDispatchToProps)(SearchFlightsPage);
