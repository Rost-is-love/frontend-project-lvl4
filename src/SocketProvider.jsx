import React from 'react';

import SocketContext from './contexts/socketContext.jsx';

const SocketProvider = ({ children, socket }) => {
  // prettier-ignore
  const wrapSocket = (socketFunc) => (...args) => new Promise((resolve, reject) => {
    // eslint-disable-next-line functional/no-let
    let called = false;
    const timer = setTimeout(() => {
      if (called) {
        return;
      }
      called = true;
      reject(new Error('networkError'));
    }, 1000);

    socketFunc(...args, (response) => {
      if (called) {
        return;
      }
      called = true;
      clearTimeout(timer);
      if (response.status === 'ok') {
        resolve();
      }
      reject();
    });
  });

  return (
    <SocketContext.Provider
      value={{
        renameChan: wrapSocket((...args) => socket.volatile.emit('renameChannel', ...args)),
        removeChan: wrapSocket((...args) => socket.volatile.emit('removeChannel', ...args)),
        addChan: wrapSocket((...args) => socket.volatile.emit('newChannel', ...args)),
        sendMessage: wrapSocket((...args) => socket.volatile.emit('newMessage', ...args)),
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
