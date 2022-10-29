import React from 'react';
import './index.scss';

type Props = {
  id: number,
  clickHandler: React.MouseEventHandler<HTMLButtonElement>,
  icon: JSX.Element,
  title: string,
  active: boolean
};

function ManageNavButton({
  id, clickHandler, icon, title, active,
}: Props) {
  return (
    <button
      key={id}
      type="button"
      className={`manage-nav__button ${active ? 'active focus' : ''}`}
      onClick={(event) => clickHandler(event)}
    >
      <span className="manage-nav__button__icon">
        {icon}
      </span>
      <h3 className="manage-nav__button__title">
        {title}
      </h3>
    </button>
  );
}

export default ManageNavButton;
