import React from 'react';
import { deleteEvents } from '../../gateway/events';
import './event.scss';
import PropTypes from 'prop-types';

const Event = ({ height, marginTop, title, time, id, renderNewData }) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const deleteEvent = () => {
    deleteEvents(id).then(() => renderNewData());
  };

  return (
    <div style={eventStyle} className="event" onClick={deleteEvent}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
    </div>
  );
};

Event.propTypes = {
  height: PropTypes.number,
  marginTop: PropTypes.number,
  title: PropTypes.string,
  time: PropTypes.string,
  id: PropTypes.string,
  renderNewData: PropTypes.func,
};

export default Event;
