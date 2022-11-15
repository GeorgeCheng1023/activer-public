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

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
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
          clickHandler={(event) => clickHandler(event, id)}
          active={clickedId === id}
        />
      ))}

    </div>
  );
}

export default ManageNav;
