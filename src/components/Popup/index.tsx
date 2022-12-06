import React from 'react';
import { createPortal } from 'react-dom';
import './index.scss';

export interface PopupDisplayProps {
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>
  display: boolean
}

interface Props extends PopupDisplayProps {
  children: React.ReactNode,
}

function Popup({ children, setDisplay, display }: Props) {
  const handleClickBackdrop:
  React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDisplay(false);
  };

  // eslint-disable-next-line
  if (display) {
    return createPortal(
      <>
        <div
          className="popup__backdrop"
          aria-hidden="true"
          onClick={handleClickBackdrop}
        />
        <div className="popup__panel">
          {children}
        </div>
      </>,
      document.getElementById('root')!,
    );
  }
  return null;
}

export default Popup;
