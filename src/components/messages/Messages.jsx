import React from 'react';
// import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import useSocket from '../../hooks/useSocket.jsx';

const Messages = () => {
  const { t } = useTranslation();
  const messages = useSelector((state) => state.messagesData.messages);
  const currentChannelId = useSelector((state) => state.channelsData.currentChannelId);
  const currentChannelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  const nickname = localStorage.getItem('username');
  const socket = useSocket();

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }, { setSubmitting, resetForm }) => {
      setSubmitting(false);
      const message = {
        username: nickname,
        body,
        channelId: currentChannelId,
      };

      try {
        socket.emit('newMessage', message, (response) => {
          console.log(response);
        });
        resetForm();
      } catch (error) {
        console.log(error);
      }
      console.log(body);
    },
  });

  const renderMessages = () => (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {currentChannelMessages.map(({ body, username, id }) => (
        <div className="text-break" key={id}>
          <b>{username}</b>
          {`: ${body}`}
        </div>
      ))}
    </div>
  );

  return (
    <div className="d-flex flex-column h-100">
      {currentChannelMessages && renderMessages()}
      <div className="mt-auto">
        <Form noValidate onSubmit={formik.handleSubmit}>
          <InputGroup>
            <Form.Control
              name="body"
              aria-label="body"
              onChange={formik.handleChange}
              value={formik.values.body}
            />
            <InputGroup.Append>
              <Button type="submit" variant="primary" className="btn">
                {t('send')}
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default Messages;
