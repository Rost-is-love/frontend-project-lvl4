import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useSocket from '../hooks/useSocket.jsx';
import { selectChannelId, actions } from '../slices';

const Remove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [removingError, setRemovingError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(null);
  const channelId = useSelector(selectChannelId);
  const socket = useSocket();

  const onHide = () => {
    dispatch(actions.hideModal());
  };

  const removeChannel = (id) => async () => {
    setRemovingError(null);
    try {
      setIsSubmitting(true);
      await socket.removeChan({ id });
      setIsSubmitting(false);
      onHide();
    } catch (error) {
      setRemovingError(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {t('sure')}
        <div className="invalid-feedback d-block">{t(removingError)}</div>
        <div className="d-flex justify-content-between mt-2">
          <Button
            type="button"
            variant="secondary"
            className="mr-2"
            onClick={onHide}
            disabled={isSubmitting}
          >
            {t('cancel')}
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={removeChannel(channelId)}
            disabled={isSubmitting}
          >
            {t('remove')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default Remove;
