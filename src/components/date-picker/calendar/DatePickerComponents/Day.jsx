import React, { useState } from 'react';
// import moment from 'moment';

const Day = props => {
  const {
    day,
    day: { date, isCurrentMonth, isToday, number },
    select,
    selected,
  } = props;

  return (
    <span
      key={Math.random()}
      className={
        'day' +
        (isToday ? ' today' : '') +
        (isCurrentMonth ? '' : ' different-month') +
        (date.isSame(selected) ? ' selected' : '')
      }
      onClick={() => select(day)}
    >
      {number}
    </span>
  );
};

export default Day;
