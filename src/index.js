// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import ReactDOM from 'react-dom';

import App from './init.jsx';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const chatContainer = document.querySelector('#chat');
const vdom = App();

ReactDOM.render(vdom, chatContainer);
