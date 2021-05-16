import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { changeCurrentChannel } from './channelsSlice.js';
import { showModal } from '../modals/modalsSlice.js';

const UnremovableChannel = ({ name, btnVariant, switchChannel }) => (
  <li className="nav-item">
    <Button
      variant={btnVariant}
      className="nav-link btn-block mb-2 text-left"
      onClick={switchChannel}
    >
      {name}
    </Button>
  </li>
);

const RemovableChannel = ({ name, btnVariant, switchChannel, removeChannel, renameChannel }) => {
  const { t } = useTranslation();
  return (
    <li className="nav-item">
      <Dropdown as={ButtonGroup} className="d-flex mb-2">
        <Button
          variant={btnVariant}
          className="nav-link flex-grow-1 text-left"
          onClick={switchChannel}
        >
          {name}
        </Button>
        <Dropdown.Toggle split variant={btnVariant} className="flex-grow-0" />
        <Dropdown.Menu>
          <Dropdown.Item onClick={removeChannel}>{t('remove')}</Dropdown.Item>
          <Dropdown.Item onClick={renameChannel}>{t('rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

const Channels = () => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channelsData.channels);
  const currentChannelId = useSelector((state) => state.channelsData.currentChannelId);
  const dispatch = useDispatch();

  const openModal =
    (type, channelId = null) =>
    () => {
      dispatch(showModal({ type, channelId }));
    };

  const switchChannel = (id) => () => {
    dispatch(changeCurrentChannel({ id }));
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>{t('channels')}</span>
        <Button variant="link" className="ml-auto p-0" onClick={openModal('adding')}>
          +
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name, removable }) => {
          const btnVariant = id === currentChannelId ? 'primary' : 'light';

          return removable ? (
            <RemovableChannel
              key={id}
              name={name}
              btnVariant={btnVariant}
              switchChannel={switchChannel(id)}
              removeChannel={openModal('removing', id)}
              renameChannel={openModal('renaming', id)}
            />
          ) : (
            <UnremovableChannel
              key={id}
              name={name}
              btnVariant={btnVariant}
              switchChannel={switchChannel(id)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Channels;
