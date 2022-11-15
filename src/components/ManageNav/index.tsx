import React, { useState, useEffect } from 'react';
import './index.scss';
import ManageNavButton from './ManageNavButton';

type Props = {
  buttons: {
    title: string,
    icon?: JSX.Element,
  }[],
  onChangeFilter: (id: number) => void;
};

function ManageNav({ buttons, onChangeFilter }: Props) {
  const [clickedId, setClickedId] = useState(0);

  useEffect(() => {
    // upload
    onChangeFilter(clickedId);
  }, [clickedId]);

  const handleClick = (id: number) => {
    setClickedId(id);
  };

  return (
    <div className="manage-nav__button-group">
      {buttons.map((button, id) => (
        <ManageNavButton
          // eslint-disable-next-line  react/no-array-index-key
          key={`manage-nav-${id}`}
          title={button.title}
          icon={button.icon}
          id={id}
          onClick={handleClick}
          active={clickedId === id}
        />
      ))}

    </div>
  );
}

export default ManageNav;
