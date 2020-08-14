import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

export default class Root extends React.Component {
  render() {
    return (
      <BrowserRouter basename="/react">
        <App />
      </BrowserRouter>
    );
  }
}
