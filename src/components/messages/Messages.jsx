import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

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
        inputRef.current.focus();
      } catch (error) {
        console.log(error);
      }
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
              required
              ref={inputRef}
              name="body"
              aria-label="body"
              onChange={formik.handleChange}
              value={formik.values.body}
              data-testid="new-message"
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
