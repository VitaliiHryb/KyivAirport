import React, { useState, useEffect } from 'react';
import { createEvent } from '../../gateway/events';
import moment from 'moment';
import './modal.scss';
import PropTypes from 'prop-types';

const Modal = ({ closeFormHandler, renderNewData }) => {
  const [newEvent, setNewEvent] = useState({
    id: '',
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    date: `${moment().format('yyyy-MM-DD')}`,
  });

  const handleChange = e => {
    const { name, value } = e.target;

    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { id, title, description, startTime, endTime, date } = newEvent;
    let dateFrom = new Date(`${date} ${startTime}`);
    let dateTo = new Date(`${date} ${endTime}`);
    const newEventData = { id, title, description, dateFrom, dateTo };
    createEvent(newEventData).then(() => renderNewData());
    closeFormHandler();
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button
            onClick={closeFormHandler}
            className="create-event__close-btn"
          >
            +
          </button>
          <form className="event-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={newEvent.title}
              onChange={handleChange}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={newEvent.date}
                onChange={handleChange}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                onChange={handleChange}
                value={newEvent.startTime}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={newEvent.endTime}
                onChange={handleChange}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              onChange={handleChange}
              value={newEvent.description}
            ></textarea>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeFormHandler: PropTypes.func,
  renderNewData: PropTypes.func,
};

export default Modal;
