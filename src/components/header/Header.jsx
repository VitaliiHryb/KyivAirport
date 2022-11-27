import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getWeekStartDate,
  getNextMonday,
  months,
} from '../../utils/dateUtils.js';
import './header.scss';

const Header = ({
  nextWeek,
  prevWeek,
  addCurrentDay,
  weekStartDate,
  openFormHandler,
}) => {
  const monday = getWeekStartDate(weekStartDate);

  const [IsCurrentMonth, setIsCurrentMonth] = useState(
    months[monday.getMonth()],
  );
  const [IsNextMonth, setIsNextMonth] = useState(
    months[getNextMonday(monday).getMonth()],
  );

  useEffect(() => {
    setIsCurrentMonth(() => months[monday.getMonth()]);
  }, [weekStartDate]);

  useEffect(() => {
    setIsNextMonth(() => months[getNextMonday(monday).getMonth()]);
  }, [weekStartDate]);

  return (
    <header className="header">
      <button onClick={openFormHandler} className="button create-event-btn">
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button
          onClick={addCurrentDay}
          className="navigation__today-btn button"
        >
          Today
        </button>
        <button onClick={prevWeek} className="icon-button navigation__nav-icon">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button onClick={nextWeek} className="icon-button navigation__nav-icon">
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">{`${IsCurrentMonth.substring(
          0,
          3,
        )} ${
          IsCurrentMonth === IsNextMonth
            ? ''
            : `- ${IsNextMonth.substring(0, 3)}`
        }`}</span>
      </div>
    </header>
  );
};

Header.propTypes = {
  nextWeek: PropTypes.func,
  prevWeek: PropTypes.func,
  addCurrentDay: PropTypes.func,
  weekStartDate: PropTypes.object,
  openFormHandler: PropTypes.func,
};

export default Header;
