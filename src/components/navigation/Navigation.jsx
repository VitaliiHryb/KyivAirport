import React from 'react';
import { days } from '../../utils/dateUtils.js';
import PropTypes from 'prop-types';

const Navigation = ({ weekDates }) => {
  const now = new Date();
  const currentDay = now.getDate();

  return (
    <header className="calendar__header">
      {weekDates.map(dayDate => (
        <div key={Math.random()} className="calendar__day-label day-label">
          <span
            className={
              dayDate.getDate() === currentDay &&
              dayDate.getMonth() === now.getMonth()
                ? 'day-label__day-name day-label__day-name_today'
                : 'day-label__day-name'
            }
          >
            {days[dayDate.getDay()]}
          </span>
          <span
            className={
              dayDate.getDate() === currentDay &&
              dayDate.getMonth() === now.getMonth()
                ? 'day-label__day-number day-label__day-number_today'
                : 'day-label__day-number'
            }
          >
            {dayDate.getDate()}
          </span>
        </div>
      ))}
    </header>
  );
};

Navigation.propTypes = {
  weekDates: PropTypes.array,
};

export default Navigation;
