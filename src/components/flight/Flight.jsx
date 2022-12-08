import './Flight.scss';
import React from 'react';
import moment from 'moment';

function Flight(props) {
  // console.log(JSON.stringify(props)); // ==> {"term":"A","fltNo":"PQ7103","airportName":"Sharm el-Sheikh","localTime":"2018-12-01T02:05:00Z",
  // "timeStatus":"2018-12-01T03:02:18Z","status":"DP","name":"SkyUP","logoUrl":"https://api.iev.aero/media/airline/files/5b556ba4e2250445105051.png"}
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
