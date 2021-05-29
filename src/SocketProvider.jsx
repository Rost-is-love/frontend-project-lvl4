import React from 'react';
import { noop } from 'lodash';

import SocketContext from './contexts/socketContext.jsx';

const SocketProvider = ({ children, socket }) => {
  console.log(children, socket, 'tut');
  const withTimeout = (onSuccess, onTimeout, timeout, onHide) => {
    // eslint-disable-next-line functional/no-let
    let called = false;

    const timer = setTimeout(() => {
      if (called) {
        return;
      }
      called = true;
      onTimeout();
    }, timeout);

    return (...args) => {
      if (called) {
        onHide();
        return;
      }
      called = true;
      onHide();
      clearTimeout(timer);
      onSuccess(args);
    };
  };

  const hadnleSocketEmit = (action, data, onHide) => {
    socket.emit(
      action,
      data,
      withTimeout(
        () => {
          console.log('success!');
        },
        () => {
          console.log('timeout!');
        },
        1000,
        onHide,
      ),
    );
  };

  const renameChan = (channel, onHide) => {
    hadnleSocketEmit('renameChannel', channel, onHide);
  };

  const addChan = (channel, onHide) => {
    hadnleSocketEmit('newChannel', channel, onHide);
  };

  const removeChan = (id, onHide) => {
    hadnleSocketEmit('removeChannel', id, onHide);
  };

  const sendMessage = (message) => {
    if (socket.disconnected) {
      const sendingMessage = setInterval(() => {
        socket.volatile.emit('newMessage', message, (response) => {
          if (response.status === 'ok') {
            clearInterval(sendingMessage);
          }
        });
      }, 1000);
    } else {
      socket.emit('newMessage', message, noop);
    }
  };

  return (
    <SocketContext.Provider
      value={{
        renameChan,
        removeChan,
        addChan,
        sendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
