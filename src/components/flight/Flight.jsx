import './Flight.scss';
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

function Flight(props) {
  const localTime = moment(props.localTime).format('HH:mm');
  const timeStatus = moment(props.timeStatus).format('HH:mm');
  const { term, fltNo, status, name, logoUrl, airportName } = props;
  return (
    <tr>
      <td className="terminal-field">
        <span className={term === 'D' ? 'terminal blue' : 'terminal'}>
          {term}
        </span>
      </td>
      <td className="time-field">{localTime}</td>
      <td className="way-field">
        <span>{airportName}</span>
      </td>
      <td className="status-field">
        <span>{`${status} at ${timeStatus}`}</span>
      </td>
      <td className="company-name">
        <span className="logo">
          <img src={logoUrl} alt={name} />
          <span>{name}</span>
        </span>
      </td>
      <td className="flight-field">
        <span>{`${fltNo}`}</span>
      </td>
      <td className="details-field">
        <span>
          <a href="#" className="">
            Flight details
          </a>
        </span>
      </td>
    </tr>
  );
}

export default Flight;

Flight.propTypes = {
  props: PropTypes.shape({
    airportName: PropTypes.string,
    fltNo: PropTypes.string,
    localTime: PropTypes.string,
    logoUrl: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    term: PropTypes.string,
    timeStatus: PropTypes.string,
  }),
};
