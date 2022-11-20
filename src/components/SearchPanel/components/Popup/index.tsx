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
  const handleClick:React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch(hide());
  };

  if (display) {
    return (
      <div className="popup">
        <div className="popup__back" />
        <div className="popup__inner">
          <button
            type="button"
            className="popup__close-button"
            onClick={handleClick}
          >
            <GrClose />
          </button>
          {children}

        </div>
      </div>
    );
  }
  return (null);
}

export default Popup;
