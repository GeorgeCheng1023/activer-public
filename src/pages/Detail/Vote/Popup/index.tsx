import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';

interface PopupType {
  className?: string;
  backLink: string;
  children: React.ReactNode;
}

function Popup({ className, backLink, children } : PopupType) {
  const navigate = useNavigate();
  const classes = classNames('popup', className);

  return (
    <div
      className={classes}
      aria-hidden
      data-type="backdrop"
      onClick={(event) => {
        if ((event.target as HTMLElement).getAttribute('data-type') === 'backdrop') {
          navigate(backLink, {
            replace: true,
          });
        }
      }}
    >
      {children}
    </div>
  );
}

export default Popup;
