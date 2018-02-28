// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

// ---

import 'babel-polyfill'
 
import React from 'react'
import { render } from 'react-dom'
import Root from './App'
 
render(
  <Root />,
  document.getElementById('root')
)
