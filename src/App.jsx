import React, { useEffect, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal';

import './common.scss';
const App = () => {
  const [Now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  });
  const [weekStartDate, setWeekStartDate] = useState(new Date());

  const handlePrevWeek = () => {
    setWeekStartDate(prevValue => {
      prevValue.setDate(prevValue.getDate() - 7);
      return new Date(prevValue.getTime());
    });
  };

  const handleNextWeek = () => {
    setWeekStartDate(prevValue => {
      prevValue.setDate(prevValue.getDate() + 7);
      return new Date(prevValue.getTime());
    });
  };

  const handleCurrentWeek = () => {
    setWeekStartDate(() => new Date());
  };

  const [isForm, setIsForm] = useState(false);

  const openFormHandler = () => {
    setIsForm(() => true);
  };

  const closeFormHandler = () => {
    setIsForm(() => false);
  };

  const [reRender, setReRender] = useState(false);

  const renderNewData = function () {
    setReRender(data => {
      return data === false ? true : false;
    });
  };

  return (
    <>
      <Header
        nextWeek={handleNextWeek}
        prevWeek={handlePrevWeek}
        addCurrentDay={handleCurrentWeek}
        weekStartDate={weekStartDate}
        openFormHandler={openFormHandler}
      />
      <Calendar
        weekStartDate={weekStartDate}
        renderNewData={renderNewData}
        reRender={reRender}
        isToday={
          Now.getFullYear() === weekStartDate.getFullYear() &&
          Now.getDate() === weekStartDate.getDate() &&
          Now.getMonth() === weekStartDate.getMonth()
        }
        Now={Now}
      />
      {isForm ? (
        <Modal
          closeFormHandler={closeFormHandler}
          renderNewData={renderNewData}
        />
      ) : null}
    </>
  );
};

export default App;
