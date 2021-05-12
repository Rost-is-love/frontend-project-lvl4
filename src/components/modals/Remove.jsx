import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useSocket from '../../hooks/useSocket.jsx';
import { hideModal } from './modalsSlice.js';

const Remove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.modalsData.channelId);
  const socket = useSocket();

  const onHide = () => {
    dispatch(hideModal());
  };

  const removeChannel = (id) => () => {
    try {
      socket.emit('removeChannel', { id }, (response) => {
        console.log(response);
      });
      dispatch(hideModal());
    } catch (error) {
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
        <div className="d-flex justify-content-between">
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
