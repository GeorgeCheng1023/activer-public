import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './index.scss';

export interface PopupDisplayProps {
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>
  display: boolean
}

interface Props extends PopupDisplayProps {
  children: React.ReactNode,
  effectCallback?: React.EffectCallback
}

function Popup({
  children, setDisplay, display, effectCallback,
}: Props) {
  const handleClickBackdrop:
  React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDisplay(false);
  };
  if (effectCallback) {
    useEffect(effectCallback, [display]);
  }

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

Popup.defaultProps = {
  effectCallback: undefined,
};

export default Popup;
