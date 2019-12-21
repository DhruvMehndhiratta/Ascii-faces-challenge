import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/custom.scss';
import AppRoutes from './Routes';
import { Provider } from 'react-redux';
import ExecutableStore  from './store';

const { store } = ExecutableStore();

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  document.getElementById('root')
);
