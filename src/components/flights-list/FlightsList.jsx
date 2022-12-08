import './FlightsList.scss';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import {
  departureFlightsListSelector,
  arrivalFlightsListSelector,
} from '../../AirportStore/flights.selectors';
import * as flightsActions from '../../AirportStore/flights.actions';
import qs from 'qs';
import Flight from '../flight/Flight';

const filterFlightsList = (flightsList, queryString) => {
  if (!queryString) return flightsList;
  // console.log(`flightsList is ${JSON.stringify(queryString)}`); // ==> flightsList is "PQ7103"
  return flightsList.filter(flight => {
    // console.log(`flight.fltNo is ${flight.fltNo}`); // ==> flight.fltNo is 1723 ... flight.fltNo is 6259 ... flight.fltNo is 1692
    const fltNo = `${flight['carrierID.IATA']}${flight.fltNo}`;
    return fltNo.toLowerCase().includes(queryString.toLowerCase());
  });
};

const createFlightsList = (flightsList, flightDirection) => {
  return flightsList.map(flight => {
    // console.log(`flight is ${JSON.stringify(flight)}`);
    // ==> very long object ==> {"ID":2000026422470, ... "timeDepShedule":"2018-12-01T02:05:00Z", ...
    // "term":"A", "fltNo":"7103"б, "airportToID.name_en":"Sharm el-Sheikh", "timeTakeofFact":"2018-12-01T03:02:18Z", "status":"DP",
    // "airline":{"en":{"id":23,"name":"SkyUP", ... "logoSmallName":"https://api.iev.aero/media/airline/files/5b556ba4e2250445105051.png", ... }
    let data = {
      term: flight.term,
      fltNo: `${flight['carrierID.IATA']}${flight.fltNo}`,
      airportName:
        flight['airportToID.name_en'] || flight['airportFromID.name_en'],
      localTime: flight.timeDepShedule,
      timeStatus: flight.timeTakeofFact,
      status: flight.status,
      name: flight.airline.en.name,
      logoUrl: flight.airline.en.logoSmallName,
    };
    if (flightDirection === 'arrivals') {
      data = {
        ...data,
        localTime: flight.timeToStand,
        timeStatus: flight.timeLandFact,
      };
    }
    return <Flight key={flight.ID} {...data} />;
  });
};

const FlightsList = ({ departureFlightsList, arrivalFlightsList }) => {
  const [flightsList, setFlightsList] = useState([]);
  const [status, setStatus] = useState('');
  const { direction } = useParams();
  const location = useLocation();

  useEffect(() => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    // console.log(`query is ${JSON.stringify(query)}`); // ==> {"search":"PQ7103","date":"01-12-2018"}
    if (direction && direction.includes('arrivals')) {
      // console.log(
      //   `arrivalFlightsList is ${JSON.stringify(arrivalFlightsList)}`,
      // ); // very long object
      setFlightsList(filterFlightsList(arrivalFlightsList, query.search));
      setStatus('arrivals');
    } else {
      // console.log(
      //   `departureFlightsList is ${JSON.stringify(departureFlightsList)}`,
      // ); // very long object
      setFlightsList(filterFlightsList(departureFlightsList, query.search));
      setStatus('departures');
    }
  }, [location, departureFlightsList, arrivalFlightsList]);

  return <>{createFlightsList(flightsList, status)}</>;
};

const mapStateToProps = state => {
  return {
    departureFlightsList: departureFlightsListSelector(state),
    arrivalFlightsList: arrivalFlightsListSelector(state),
  };
};

const mapDispatchToProps = {
  getFlightsList: flightsActions.fetchFlightsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightsList);
