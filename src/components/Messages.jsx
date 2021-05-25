import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { animateScroll } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

// import getLogger from '../../lib/logger.js';
import useSocket from '../hooks/useSocket.jsx';
import useAuth from '../hooks/useAuth.jsx';

const Messages = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const messages = useSelector((state) => state.messagesData.messages);
  const currentChannelId = useSelector((state) => state.channelsData.currentChannelId);
  const currentChannelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  const nickname = auth.getUsername();
  const socket = useSocket();
  // const logSocket = getLogger('socket');
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: 'messages-box',
      duration: 0,
      delay: 0,
    });
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }, { setSubmitting, resetForm, setErrors }) => {
      const message = {
        username: nickname,
        body,
        channelId: currentChannelId,
      };

      try {
        socket.sendMessage(message);
        resetForm();
        inputRef.current.focus();
        /* if (socket.disconnected) {
          throw new Error('networkError');
        }
        socket.emit('newMessage', message, (response) => {
          logSocket(response);
          if (response.status === 'ok') {
            resetForm();
            inputRef.current.focus();
          }
        }); */
      } catch (error) {
        setErrors({ body: error.message });
        setSubmitting(false);
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
              disabled={formik.isSubmitting}
              isInvalid={!formik.isValid}
            />
            <InputGroup.Append>
              <Button
                type="submit"
                variant="primary"
                className="btn"
                disabled={formik.isSubmitting}
              >
                {t('send')}
              </Button>
            </InputGroup.Append>
            <Form.Control.Feedback type="invalid">{t(formik.errors.body)}</Form.Control.Feedback>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default Messages;
