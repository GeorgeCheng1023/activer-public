import React from 'react';
import { GrClose } from 'react-icons/gr';

import './index.scss';
import { useAppDispatch } from 'hooks/redux';
import { hide } from 'store/searchPanel';

type Props = {
  display: boolean,
  children: React.ReactNode,
};

function Popup({ display, children }: Props) {
  const dispatch = useAppDispatch();
  const handleClick:React.MouseEventHandler<HTMLButtonElement | HTMLDivElement> = (e) => {
    e.preventDefault();
    dispatch(hide());
  };

  if (display) {
    return (
      <div className="popup">
        <div className="popup__back" onClick={handleClick} aria-hidden="true" />
        <button
          type="button"
          className="popup__close-button"
          onClick={handleClick}
        >
          <GrClose />
        </button>
        <div className="popup__inner">
          {children}
        </div>
      </div>
    );
  }
  return (null);
}

export default Popup;
