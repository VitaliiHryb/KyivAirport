import React, { useEffect, useState } from 'react';
import Hour from '../hour/Hour';
import PropTypes from 'prop-types';
import './day.scss';

const Day = ({ dataDay, dayEvents, renderNewData, isToday, Now }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  const [marginTop, setMarginTop] = useState(Now.getMinutes());
  useEffect(() => {
    setMarginTop(Now.getMinutes());
  }, [Now]);

  const redLineStyle = {
    borderTop: '2px solid red',
    marginTop,
    height: `${59 - marginTop}px`,
  };

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map(hour => {
        const hourEvents = dayEvents.filter(event => {
          return new Date(event.dateFrom).getHours() === hour;
        });

        return isToday === true && hour === Now.getHours() ? (
          <div
            className="redline"
            key={Math.random()}
            style={redLineStyle}
          ></div>
        ) : (
          <Hour
            key={Math.random()}
            dataHour={hour}
            hourEvents={hourEvents}
            renderNewData={renderNewData}
          />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  dataDay: PropTypes.number,
  dayEvents: PropTypes.array,
  renderNewData: PropTypes.func,
  isToday: PropTypes.bool,
  Now: PropTypes.object,
};

export default Day;
