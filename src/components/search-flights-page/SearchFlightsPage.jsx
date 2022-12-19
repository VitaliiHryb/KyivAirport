import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as flightsActions from '../../AirportStore/flights.actions';
import moment from 'moment';
import SearchField from '../search-field/SearchField';
import FlightsSchedule from '../flights-schedule/FlightsSchedule';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';

function SearchFlightsPage({ fetchFlightsList }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fakeCurrentDay = moment('2018-12-01');
    fetchFlightsList(moment(fakeCurrentDay));

    // let promise = new Promise(resolve => {
    //   fetchFlightsList(moment(fakeCurrentDay));
    //   resolve(true);
    // });
    // promise.then(loaded => setLoading(loaded));
  }, []);

  // return (
  //   <React.StrictMode>
  //     {loading === false ? (
  //       <>
  //         <Spinner animation="border" role="status">
  //           <span className="visually-hidden">Loading...</span>
  //         </Spinner>
  //       </>
  //     ) : (
  //       <>
  //         <SearchField />
  //         <FlightsSchedule />
  //       </>
  //     )}
  //   </React.StrictMode>
  // );

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
