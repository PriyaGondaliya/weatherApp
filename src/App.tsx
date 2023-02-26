import React from 'react';
import { Provider } from 'react-redux';
import Weather from './components/Weather';
import { store } from './store';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Weather />
    </Provider>
  );
};

export default App;
