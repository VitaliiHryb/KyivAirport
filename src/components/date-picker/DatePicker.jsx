import './DatePicker.scss';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as flightsActions from '../../AirportStore/flights.actions';
import { dateSelector } from '../../AirportStore/flights.selectors';
import moment from 'moment';
import { Calendar } from 'react-bootstrap-icons';
import DatePickerCalendar from './calendar/DatePickerCalendar';
import PropTypes from 'prop-types';

function DatePicker({ fetchFlightsList, date }) {
  const [activeBtn, setActiveBtn] = useState({
    yesterdayActive:
      'date-picker__days__handler calendar__days__handler_yesterday',
    todayActive: 'date-picker__days__handler calendar__days__handler_today',
    tomorrowActive:
      'date-picker__days__handler calendar__days__handler_tomorrow',
  });

  const fakeCurrentDay = moment('2018-12-01');
  const today = moment(fakeCurrentDay);
  const yesterday = moment(fakeCurrentDay).subtract(1, 'days');
  const tomorrow = moment(fakeCurrentDay).add(1, 'days');

  const onYesterday = () => {
    setActiveBtn({
      yesterdayActive:
        'date-picker__days__handler calendar__days__handler_yesterday btn-active',
      todayActive: 'date-picker__days__handler calendar__days__handler_today',
      tomorrowActive:
        'date-picker__days__handler calendar__days__handler_tomorrow',
    });

    fetchFlightsList(moment(yesterday));
  };

  const onToday = () => {
    setActiveBtn({
      todayActive:
        'date-picker__days__handler calendar__days__handler_today btn-active',
      yesterdayActive:
        'date-picker__days__handler calendar__days__handler_yesterday',
      tomorrowActive:
        'date-picker__days__handler calendar__days__handler_tomorrow',
    });

    fetchFlightsList(moment(today));
  };

  const onTomorrow = () => {
    setActiveBtn({
      tomorrowActive:
        'date-picker__days__handler calendar__days__handler_tomorrow btn-active',
      yesterdayActive:
        'date-picker__days__handler calendar__days__handler_yesterday',
      todayActive: 'date-picker__days__handler calendar__days__handler_today',
    });
    fetchFlightsList(moment(tomorrow));
  };

  const [calendarIsVisible, setCalendarIsVisible] = useState(false);

  const showCalendar = () => {
    calendarIsVisible === false
      ? setCalendarIsVisible(true)
      : setCalendarIsVisible(false);
  };

  return (
    <div className="date-picker">
      <div className="date-picker__days__current-day">
        <span>{moment(date).format('DD-MM')}</span>
        <Calendar className="date-picker__days__logo" onClick={showCalendar} />
        {calendarIsVisible === true ? (
          <DatePickerCalendar date={date} />
        ) : (
          <></>
        )}
      </div>
      <div className="date-picker__days">
        <div className={activeBtn.yesterdayActive} onClick={onYesterday}>
          <span>{moment(yesterday).format('DD-MM')}</span>
          <div className="date-picker__days__handler_weak">yesterday</div>
        </div>
        <div className={activeBtn.todayActive} onClick={onToday}>
          <span>{moment(today).format('DD-MM')}</span>
          <div className="date-picker__days__handler_weak">today</div>
        </div>
        <div className={activeBtn.tomorrowActive} onClick={onTomorrow}>
          <span>{moment(tomorrow).format('DD-MM')}</span>
          <div className="date-picker__days__handler_weak">tomorrow</div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    date: dateSelector(state),
  };
};

const mapDispatchToProps = {
  fetchFlightsList: flightsActions.fetchFlightsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);

DatePicker.propTypes = {
  fetchFlightsList: PropTypes.func.isRequired,
  date: PropTypes.object,
};
