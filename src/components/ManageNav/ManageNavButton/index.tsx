import React from 'react';
import './index.scss';

export interface ManageNavFilterType {
  id: string,
  label: string,
  icon?: JSX.Element,
}

interface ManageNavButtonType extends ManageNavFilterType {
  active: boolean,
  onClickFilter: (clickedFilterName: string) => void
}

function ManageNavButton({
  id, onClickFilter, icon, label, active,
}: ManageNavButtonType) {
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
      <span className="manage-nav__button__label">
        {label}
      </span>
    </button>
  );
}

ManageNavButton.defaultProps = {
  icon: null,
};

export default ManageNavButton;
