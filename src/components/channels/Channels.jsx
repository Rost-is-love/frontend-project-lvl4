import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, Button } from 'react-bootstrap';

const Channels = () => {
  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Каналы</span>
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
