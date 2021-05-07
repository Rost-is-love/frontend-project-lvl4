import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Channels from './channels/Channels.jsx';
import Messages from './messages/Messages.jsx';
import routes from '../routes.js';
import { initChannels } from './channels/channelsSlice.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const ChatPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
      dispatch(initChannels({ data }));
    };

    fetchContent();
  }, []);

  return (
    <div className="row flex-grow-1 h-75 pb-3">
      <Channels />
      <div className="col h-100">
        <Messages />
      </div>
    </div>
  );
};

export default ChatPage;
