import './DatePickerCalendar.scss';
import React, { useState } from 'react';
import moment from 'moment';
import Week from './DatePickerComponents/Week';
import DayNames from './DatePickerComponents/DayNames';
import PropTypes from 'prop-types';

const DatePickerCalendar = ({ date }) => {
  const [state, setState] = useState({
    month: moment(date),
    selected: moment(date).startOf('day'),
  });

  function previous() {
    const { month } = state;

    setState({
      month: month.subtract(1, 'month'),
    });
  }

  function next() {
    const { month } = state;

    setState({
      month: month.add(1, 'month'),
    });
  }

  function select(day) {
    setState({
      selected: day.date,
      month: day.date.clone(),
    });
  }

  function renderWeeks() {
    let weeks = [];
    let done = false;
    let date = state.month
      .clone()
      .startOf('month')
      .add('w' - 1)
      .day('Sunday');
    let count = 0;
    let monthIndex = date.month();

    const { selected, month } = state;

    while (!done) {
      weeks.push(
        <Week
          key={Math.random()}
          date={date.clone()}
          month={month}
          select={day => select(day)}
          selected={selected}
        />,
      );

      date.add(1, 'w');

      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  }

  function renderMonthLabel() {
    const { month } = state;

    return <span className="month-label">{month.format('MMMM YYYY')}</span>;
  }

  return (
    <section className="calendar">
      <header className="header">
        <div className="month-display row">
          <i className="arrow fa fa-angle-left" onClick={previous} />
          {renderMonthLabel()}
          <i className="arrow fa fa-angle-right" onClick={next} />
        </div>
        <DayNames />
      </header>
      {renderWeeks()}
    </section>
  );
};

export default DatePickerCalendar;

DatePickerCalendar.propTypes = {
  date: PropTypes.object.isRequired,
};
