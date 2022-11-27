import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import { fetchEvents } from '../../gateway/events';
import { getWeekStartDate, generateWeekRange } from '../../utils/dateUtils';

import './calendar.scss';

const Calendar = ({ weekStartDate, reRender, renderNewData, isToday, Now }) => {
  const [weekDates, setWeekDates] = useState(
    generateWeekRange(getWeekStartDate(weekStartDate)),
  );

  useEffect(() => {
    setWeekDates(() => generateWeekRange(getWeekStartDate(weekStartDate)));
  }, [weekStartDate]);

  const [state, setState] = useState([]);

  useEffect(() => {
    fetchEvents().then(result => {
      setState(result);
    });
  }, [weekStartDate, reRender]);

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={state}
            renderNewData={renderNewData}
            isToday={isToday}
            Now={Now}
          />
        </div>
      </div>
    </section>
  );
};

Calendar.propTypes = {
  weekStartDate: PropTypes.object,
  reRender: PropTypes.bool,
  renderNewData: PropTypes.func,
  isToday: PropTypes.bool,
  Now: PropTypes.object,
};

export default Calendar;
