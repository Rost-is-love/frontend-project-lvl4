import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Channels = () => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channelsData.channels);
  const currentChannelId = useSelector((state) => state.channelsData.currentChannelId);
  const dispatch = useDispatch();

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>{t('channels')}</span>
        <Button variant="link" className="ml-auto p-0">
          +
        </Button>
      </div>
      <Nav className="flex-column">
        {channels.map(({ id, name }) => {
          const btnVariant = id === currentChannelId ? 'primary' : 'light';

          return (
            <Nav.Item className="nav-item" key={id}>
              <Button variant={btnVariant} className="nav-link btn-block mb-2 text-left">
                {name}
              </Button>
            </Nav.Item>
          );
        })}
      </Nav>
    </div>
  );
};

export default Channels;
