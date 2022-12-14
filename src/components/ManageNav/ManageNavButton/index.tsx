import React from 'react';
import './index.scss';

export interface ManageNavFilterProps {
  id: string,
  name: string,
  icon?: JSX.Element,
}

interface Props extends ManageNavFilterProps {
  active: boolean,
  onClickFilter: (clickedFilterName: string) => void
}

function ManageNavButton({
  id, onClickFilter, icon, name, active,
}: Props) {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onClickFilter(id);
  };

  return (
    <button
      key={id}
      id={id}
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
      <span className="manage-nav__button__title">
        {name}
      </span>
    </button>
  );
}

ManageNavButton.defaultProps = {
  icon: null,
};

export default ManageNavButton;
