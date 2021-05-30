import * as yup from 'yup';
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useSocket from '../hooks/useSocket.jsx';
import { selectChannelsNames, actions } from '../slices';

const Add = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const socket = useSocket();
  const channelsNames = useSelector(selectChannelsNames);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  // prettier-ignore
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object().shape({
      body: yup.string().notOneOf(channelsNames).min(3).max(20)
        .required(),
    }),
    validateOnChange: false,
    onSubmit: async ({ body }, { setErrors }) => {
      const channel = {
        name: body,
      };

      try {
        await socket.addChan(channel);
        dispatch(actions.hideModal());
      } catch (error) {
        setErrors({ body: error.message });
      }
    },
  });

  const onHide = () => {
    dispatch(actions.hideModal());
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
              disabled={formik.isSubmitting}
            />
            <Form.Control.Feedback type="invalid">{t(formik.errors.body)}</Form.Control.Feedback>
            <div className="mt-2 d-flex justify-content-end">
              <Button
                type="button"
                variant="secondary"
                className="mr-2"
                onClick={onHide}
                disabled={formik.isSubmitting}
              >
                {t('cancel')}
              </Button>
              <Button type="submit" variant="primary" disabled={formik.isSubmitting}>
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
