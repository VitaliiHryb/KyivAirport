import './App.scss';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import SearchFlightsPage from './search-flight/components/search-flights-page';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SearchFlightsPage />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
