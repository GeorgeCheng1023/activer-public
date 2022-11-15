import React from 'react';
import './index.scss';

type Props = {
  id: number,
  onClick: (clickedId: number) => void,
  icon?: JSX.Element,
  title: string,
  active: boolean
};

function ManageNavButton({
  id, onClick, icon, title, active,
}: Props) {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onClick(id);
  };

  return (
    <button
      key={id}
      type="button"
      className={`manage-nav__button ${active ? 'active focus' : ''}`}
      onClick={handleClick}
    >
      {icon
      && (
        <span className="manage-nav__button__icon">
          {icon}
        </span>
      )}
      <h3 className="manage-nav__button__title">
        {title}
      </h3>
    </button>
  );
}

ManageNavButton.defaultProps = {
  icon: null,
};

export default ManageNavButton;
