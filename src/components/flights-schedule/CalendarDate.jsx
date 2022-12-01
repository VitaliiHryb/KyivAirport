import './CalendarDate.scss';
import React, { useEffect } from 'react';

function CalendarDate() {
  return (
    <div className="calendar">
      <div className="calendar__days calendar__current-day">
        <span>01/12</span>
        <img
          class="calendar__days__logo"
          src="https://cdn.icon-icons.com/icons2/2724/PNG/512/calendar_day_month_date_year_schedule_icon_175594.png"
          alt="Calendar Logo Not Found"
        />
      </div>
      <div className="calendar__days">
        <div className="calendar__days__handler calendar__days__handler_yesterday">
          <span>30/11</span>
          <div className="calendar__days__handler_weak">yesterday</div>
        </div>
        <div className="calendar__days__handler calendar__days__handler_today">
          <span>01/12</span>
          <div className="calendar__days__handler_weak">today</div>
        </div>
        <div className="calendar__days__handler calendar__days__handler_tomorrow">
          <span>02/12</span>
          <div className="calendar__days__handler_weak">tomorrow</div>
        </div>
      </div>
    </div>
  );
}

export default CalendarDate;
