import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useSocket from '../../hooks/useSocket.jsx';
import { hideModal } from './modalsSlice.js';

const Add = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const socket = useSocket();

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }, { setSubmitting, resetForm }) => {
      setSubmitting(false);
      const channel = {
        name: body,
      };

      try {
        socket.emit('newChannel', channel, (response) => {
          console.log(response);
        });
        resetForm();
        dispatch(hideModal());
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onHide = () => {
    dispatch(hideModal());
  };

  return (
    <>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
              data-testid="input-body"
              name="body"
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button type="button" variant="secondary" className="mr-2" onClick={onHide}>
              {t('cancel')}
            </Button>
            <Button type="submit" variant="primary">
              {t('send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default Add;
