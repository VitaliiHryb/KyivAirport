import { createSelector } from 'reselect';
import moment from 'moment';

export const flightsListSelector = state => {
  return state.flights.flightsList;
};

export const dateSelector = state => {
  return state.flights.date;
};

const filterFlightsList = (flightsList, filterString) => {
  // today is not 2018, but for testing
  const today = moment(`2018-12-01`).format('YYYY-MM-DD');
  return flightsList.filter(flight => {
    const dateOfDeparture = moment(flight[filterString]).format('YYYY-MM-DD');
    return moment(today).isSame(dateOfDeparture);
  });
};

export const departureFlightsListSelector = createSelector(
  [flightsListSelector],
  flightsList => {
    if (flightsList.length === 0) return flightsList;
    return filterFlightsList(flightsList.body.departure, 'timeDepShedule');
  },
);

export const arrivalFlightsListSelector = createSelector(
  [flightsListSelector],
  flightsList => {
    if (flightsList.length === 0) return flightsList;
    return filterFlightsList(flightsList.body.arrival, 'timeArrShedule');
  },
);
