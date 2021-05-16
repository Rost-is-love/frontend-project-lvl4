import * as yup from 'yup';
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const channels = useSelector((state) => state.channelsData.channels);
  const channelsNames = channels.map((channel) => channel.name);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object().shape({
      body: yup.string().notOneOf(channelsNames).min(3).max(20).required(),
    }),
    validateOnChange: false,
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
              data-testid="add-channel"
              name="body"
              isInvalid={!formik.isValid}
            />
            <Form.Control.Feedback type="invalid">{t(formik.errors.body)}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button type="button" variant="secondary" className="mr-2" onClick={onHide}>
                {t('cancel')}
              </Button>
              <Button type="submit" variant="primary">
                {t('send')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default Add;
