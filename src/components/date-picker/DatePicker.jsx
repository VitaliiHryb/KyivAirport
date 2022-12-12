import './DatePicker.scss';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as flightsActions from '../../AirportStore/flights.actions';
import { dateSelector } from '../../AirportStore/flights.selectors';
import moment from 'moment';
import { Calendar } from 'react-bootstrap-icons';

function DatePicker({ fetchFlightsList, date }) {
  const [activeBtn, setActiveBtn] = useState({
    yesterdayActive:
      'calendar__days__handler calendar__days__handler_yesterday',
    todayActive: 'calendar__days__handler calendar__days__handler_today',
    tomorrowActive: 'calendar__days__handler calendar__days__handler_tomorrow',
  });

  const fakeCurrentDay = moment('2018-12-01');
  const today = moment(fakeCurrentDay);
  const yesterday = moment(fakeCurrentDay).subtract(1, 'days');
  const tomorrow = moment(fakeCurrentDay).add(1, 'days');

  const onYesterday = () => {
    setActiveBtn({
      yesterdayActive:
        'calendar__days__handler calendar__days__handler_yesterday btn-active',
      todayActive: 'calendar__days__handler calendar__days__handler_today',
      tomorrowActive:
        'calendar__days__handler calendar__days__handler_tomorrow',
    });

    fetchFlightsList(moment(yesterday).format('DD-MM-YYYY'));
  };

  const onToday = () => {
    setActiveBtn({
      todayActive:
        'calendar__days__handler calendar__days__handler_today btn-active',
      yesterdayActive:
        'calendar__days__handler calendar__days__handler_yesterday',
      tomorrowActive:
        'calendar__days__handler calendar__days__handler_tomorrow',
    });

    fetchFlightsList(moment(today).format('DD-MM-YYYY'));
  };

  const onTomorrow = () => {
    setActiveBtn({
      tomorrowActive:
        'calendar__days__handler calendar__days__handler_tomorrow btn-active',
      yesterdayActive:
        'calendar__days__handler calendar__days__handler_yesterday',
      todayActive: 'calendar__days__handler calendar__days__handler_today',
    });
    fetchFlightsList(moment(tomorrow).format('DD-MM-YYYY'));
  };

  return (
    <div className="calendar">
      <div className="calendar__days calendar__current-day">
        {/* костыль */}
        <span>{moment(date).format('DD-MM')}</span>
        <div className="calendar__days__logo">
          <Calendar />
        </div>
      </div>
      <div className="calendar__days">
        <div className={activeBtn.yesterdayActive} onClick={onYesterday}>
          <span>{moment(yesterday).format('DD-MM')}</span>
          <div className="calendar__days__handler_weak">yesterday</div>
        </div>
        <div className={activeBtn.todayActive} onClick={onToday}>
          <span>{moment(today).format('DD-MM')}</span>
          <div className="calendar__days__handler_weak">today</div>
        </div>
        <div className={activeBtn.tomorrowActive} onClick={onTomorrow}>
          <span>{moment(tomorrow).format('DD-MM')}</span>
          <div className="calendar__days__handler_weak">tomorrow</div>
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
