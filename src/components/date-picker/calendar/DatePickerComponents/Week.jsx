import React from 'react';
import Day from './Day';
import PropTypes from 'prop-types';

const Week = props => {
  let { date } = props;
  let days = [];

  const { month, selected, select } = props;

  for (let i = 0; i < 7; i++) {
    let day = {
      name: date.format('dd').substring(0, 1),
      number: date.date(),
      isCurrentMonth: date.month() === month.month(),
      isToday: date.isSame(new Date(), 'day'),
      date: date,
    };
    days.push(
      <Day day={day} selected={selected} select={select} key={Math.random()} />,
    );

    date = date.clone();
    date.add(1, 'day');
  }

  return (
    <div className="row week" key={Math.random()}>
      {days}
    </div>
  );
};

export default Week;

Day.propTypes = {
  props: PropTypes.shape({
    date: PropTypes.object,
    month: PropTypes.object,
    select: PropTypes.func,
    selected: PropTypes.object,
  }),
};
