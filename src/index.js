// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';

import App from './init.jsx';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const runApp = async () => {
  const chatContainer = document.querySelector('#chat');
  const socket = io();
  const vdom = await App(socket);

  ReactDOM.render(vdom, chatContainer);
};

runApp();
