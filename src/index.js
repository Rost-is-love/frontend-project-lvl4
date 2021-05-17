// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import ReactDOM from 'react-dom';
import Rollbar from 'rollbar';
import { io } from 'socket.io-client';

import init from './init.jsx';

import '../assets/application.scss';

const runApp = async () => {
  // eslint-disable-next-line
  new Rollbar({
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    enabled: process.env.NODE_ENV === 'production',
  });

  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const chatContainer = document.querySelector('#chat');
  const socket = io();
  const vdom = await init(socket);

  ReactDOM.render(vdom, chatContainer);
};

runApp();
