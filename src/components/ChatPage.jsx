import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import routes from '../routes.js';
import { initChannels } from '../slices/channelsSlice.js';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return { Authorization: `Bearer ${token}` };
  }

  return {};
};

const ChatPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchContent = async () => {
      const response = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
      const { data } = response;

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
