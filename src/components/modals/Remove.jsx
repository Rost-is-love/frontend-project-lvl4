import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useSocket from '../../hooks/useSocket.jsx';
import { hideModal } from './modalsSlice.js';

const Remove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [removingError, setRemovingError] = useState(null);
  const channelId = useSelector((state) => state.modalsData.channelId);
  const socket = useSocket();

  const onHide = () => {
    dispatch(hideModal());
  };

  const removeChannel = (id) => () => {
    setRemovingError(null);
    try {
      if (socket.disconnected) {
        throw new Error('networkError');
      }
      socket.emit('removeChannel', { id }, (response) => {
        if (response.status === 'ok') {
          dispatch(hideModal());
        }
      });
    } catch (error) {
      setRemovingError(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {t('sure')}
        <Form.Control.Feedback type="invalid">{t(removingError)}</Form.Control.Feedback>
        <div className="d-flex justify-content-between mt-2">
          <Button type="button" variant="secondary" className="mr-2" onClick={onHide}>
            {t('cancel')}
          </Button>
          <Button type="button" variant="danger" onClick={removeChannel(channelId)}>
            {t('remove')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default Remove;
