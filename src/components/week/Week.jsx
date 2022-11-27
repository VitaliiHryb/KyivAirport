import React from 'react';
import Day from '../day/Day';
import PropTypes from 'prop-types';
import './week.scss';

const Week = ({ weekDates, events, renderNewData, isToday, Now }) => {
  return (
    <div className="calendar__week">
      {weekDates.map(dayStart => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24,
        );

        const dayEvents = events.filter(event => {
          return (
            new Date(event.dateFrom) > dayStart &&
            new Date(event.dateTo) < dayEnd
          );
        });

        return (
          <Day
            key={Math.random()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            renderNewData={renderNewData}
            dayId={dayStart.getDate()}
            isToday={isToday === true && Now.getDay() === dayStart.getDay()}
            Now={Now}
          />
        );
      })}
    </div>
  );
};

Week.propTypes = {
  weekDates: PropTypes.array,
  events: PropTypes.array,
  renderNewData: PropTypes.func,
  isToday: PropTypes.bool,
  Now: PropTypes.object,
};

export default Week;
