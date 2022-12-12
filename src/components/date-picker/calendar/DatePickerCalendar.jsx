import './DatePickerCalendar.scss';
import React, { useState } from 'react';
import moment from 'moment';
import Week from './DatePickerComponents/Week';
import DayNames from './DatePickerComponents/DayNames';
// import { connect } from 'react-redux';
// import * as flightsActions from '../../AirportStore/flights.actions';
// import { dateSelector } from '../../AirportStore/flights.selectors';

const DatePickerCalendar = () => {
  const [state, setState] = useState({
    month: moment(),
    selected: moment().startOf('day'),
  });
  // this.previous = this.previous.bind(this);
  // this.next = this.next.bind(this);

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

// class DayNames extends React.Component {
//   render() {
//     return (
//       <div className="row day-names">
//         <span className="day">Sun</span>
//         <span className="day">Mon</span>
//         <span className="day">Tue</span>
//         <span className="day">Wed</span>
//         <span className="day">Thu</span>
//         <span className="day">Fri</span>
//         <span className="day">Sat</span>
//       </div>
//     );
//   }
// }

// class Week extends React.Component {
//   render() {
//     let days = [];
//     let { date } = this.props;

//     const { month, selected, select } = this.props;

//     for (var i = 0; i < 7; i++) {
//       let day = {
//         name: date.format('dd').substring(0, 1),
//         number: date.date(),
//         isCurrentMonth: date.month() === month.month(),
//         isToday: date.isSame(new Date(), 'day'),
//         date: date,
//       };
//       days.push(<Day day={day} selected={selected} select={select} />);

//       date = date.clone();
//       date.add(1, 'day');
//     }

//     return (
//       <div className="row week" key={days[0]}>
//         {days}
//       </div>
//     );
//   }
// }

// class Day extends React.Component {
//   render() {
//     const {
//       day,
//       day: { date, isCurrentMonth, isToday, number },
//       select,
//       selected,
//     } = this.props;

//     return (
//       <span
//         key={date.toString()}
//         className={
//           'day' +
//           (isToday ? ' today' : '') +
//           (isCurrentMonth ? '' : ' different-month') +
//           (date.isSame(selected) ? ' selected' : '')
//         }
//         onClick={() => select(day)}
//       >
//         {number}
//       </span>
//     );
//   }
// }
