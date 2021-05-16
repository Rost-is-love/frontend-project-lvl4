// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import ReactDOM from 'react-dom';
import Rollbar from 'rollbar';
import { io } from 'socket.io-client';

import App from './init.jsx';

import '../assets/application.scss';

const runApp = async () => {
  console.log('here');
  // eslint-disable-next-line
  new Rollbar({
    accessToken: 'c16a953d79474fec9f3b5f6943378688',
    captureUncaught: true,
    captureUnhandledRejections: true,
  });
  setTimeout(() => {
    foo();
  }, 1000);

  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const chatContainer = document.querySelector('#chat');
  const socket = io();
  const vdom = await App(socket);

  ReactDOM.render(vdom, chatContainer);
};

runApp();
