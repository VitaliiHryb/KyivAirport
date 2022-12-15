import React from 'react';
import { connect } from 'react-redux';
import * as flightsActions from '../../../../AirportStore/flights.actions';
import moment from 'moment';

const Day = props => {
  const {
    fetchFlightsList,
    day,
    day: { date, isCurrentMonth, isToday, number },
    select,
    selected,
  } = props;

  const onHandleDate = () => {
    select(day);
    fetchFlightsList(moment(day.date));
  };

  return (
    <span
      key={Math.random()}
      className={
        'day' +
        (isToday ? ' today' : '') +
        (isCurrentMonth ? '' : ' different-month') +
        (date.isSame(selected) ? ' selected' : '')
      }
      onClick={() => onHandleDate()}
    >
      {number}
    </span>
  );
};

const mapDispatchToProps = {
  fetchFlightsList: flightsActions.fetchFlightsList,
};

export default connect(null, mapDispatchToProps)(Day);
