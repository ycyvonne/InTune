import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// Our own components
import { App } from './components/index';

// Register service worker
import registerServiceWorker from './registerServiceWorker';
import './index.css'; // Our own main stylesheet

import store from './store';

const router = (
   <Provider store={store}>
      <BrowserRouter>
         <App/>
      </BrowserRouter>
   </Provider>
)

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
