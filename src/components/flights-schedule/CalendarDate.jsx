import './CalendarDate.scss';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as flightsActions from '../../AirportStore/flights.actions';
import { calendarDateSelector } from '../../AirportStore/flights.selectors';
import moment from 'moment';
import 'font-awesome/css/font-awesome.min.css';

function CalendarDate({ fetchFlightsList, date }) {
  const [activeBtn, setActiveBtn] = useState({
    yesterdayActive:
      'calendar__days__handler calendar__days__handler_yesterday',
    todayActive: 'calendar__days__handler calendar__days__handler_today',
    tomorrowActive: 'calendar__days__handler calendar__days__handler_tomorrow',
  });

  const onYesterday = () => {
    // today is not `2018-12-01`
    // fetchFlightsList(moment().subtract(1, 'days').format('DD-MM-YYYY'));
    fetchFlightsList(moment(`2018-11-30`).format('DD-MM-YYYY'));

    setActiveBtn({
      yesterdayActive:
        'calendar__days__handler calendar__days__handler_yesterday btn-active',
      todayActive: 'calendar__days__handler calendar__days__handler_today',
      tomorrowActive:
        'calendar__days__handler calendar__days__handler_tomorrow',
    });
  };

  const onToday = () => {
    // today is not `2018-12-01`
    fetchFlightsList(moment(`2018-12-01`).format('DD-MM-YYYY'));

    setActiveBtn({
      todayActive:
        'calendar__days__handler calendar__days__handler_today btn-active',
      yesterdayActive:
        'calendar__days__handler calendar__days__handler_yesterday',
      tomorrowActive:
        'calendar__days__handler calendar__days__handler_tomorrow',
    });
  };

  const onTomorrow = () => {
    // today is not `2018-12-01`
    fetchFlightsList(moment(`2018-12-01`).add(1, 'days').format('DD-MM-YYYY'));

    setActiveBtn({
      tomorrowActive:
        'calendar__days__handler calendar__days__handler_tomorrow btn-active',
      yesterdayActive:
        'calendar__days__handler calendar__days__handler_yesterday',
      todayActive: 'calendar__days__handler calendar__days__handler_today',
    });
  };

  // today is not `2018-12-01`
  const calendarDate = {
    calendarToday: moment('2018-12-01').format('DD-MM'),
    calendarYesterday: moment('2018-12-01').subtract(1, 'days').format('DD-MM'),
    calendarTomorrow: moment('2018-12-01').add(1, 'days').format('DD-MM'),
  };

  return (
    <div className="calendar">
      <div className="calendar__days calendar__current-day">
        <span>{date}</span>
        <div className="calendar__days__logo">
          <i className="fa-regular fa-calendar">Calendar Logo</i>
        </div>
      </div>
      <div className="calendar__days">
        <div className={activeBtn.yesterdayActive} onClick={onYesterday}>
          <span>{calendarDate.calendarYesterday}</span>
          <div className="calendar__days__handler_weak">yesterday</div>
        </div>
        <div className={activeBtn.todayActive} onClick={onToday}>
          <span>{calendarDate.calendarToday}</span>
          <div className="calendar__days__handler_weak">today</div>
        </div>
        <div className={activeBtn.tomorrowActive} onClick={onTomorrow}>
          <span>{calendarDate.calendarTomorrow}</span>
          <div className="calendar__days__handler_weak">tomorrow</div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    date: calendarDateSelector(state),
  };
};

const mapDispatchToProps = {
  fetchFlightsList: flightsActions.fetchFlightsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDate);
