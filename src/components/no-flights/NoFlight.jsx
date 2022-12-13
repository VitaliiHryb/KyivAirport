import './NoFlight.scss';
import React from 'react';

function NoFlight() {
  return (
    <tr>
      <td className="no-flights"></td>
      <td className="no-flights"></td>
      <td className="no-flights">
        <span>There are no flights</span>
      </td>
      <td className="no-flights"></td>
      <td className="no-flights"></td>
    </tr>
  );
}

export default NoFlight;
