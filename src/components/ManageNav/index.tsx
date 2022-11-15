import React, { useState } from 'react';
import './index.scss';
import ManageNavButton from './ManageNavButton';

type Props = {
  buttons: {
    title: string,
    icon: JSX.Element,
  }[],
  onChangeFilter: (id: number) => void;
};

function ManageNav({ buttons, onChangeFilter }: Props) {
  const [clickedId, setClickedId] = useState(0);

  const handleClick = (id: number) => {
    console.log(id);
    setClickedId(id);
    // upload
    onChangeFilter(clickedId);
  };

  return (
    <div className="manage-nav__button-group">
      {buttons.map((button, id) => (
        <ManageNavButton
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
