import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.jsx';
import { actions } from '../slices';

const ChatPage = () => {
  const auth = useAuth();

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchContent = async () => {
      const response = await axios.get(routes.usersPath(), { headers: auth.getAuthHeader() });
      const { data } = response;

      dispatch(actions.initChannels({ data }));
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
