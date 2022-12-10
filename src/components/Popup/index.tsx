import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './index.scss';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export interface PopupDisplayProps {
  display: boolean,
  onClose: () => void,
}

interface Props extends PopupDisplayProps {
  children: React.ReactNode,
  effectCallback?: React.EffectCallback
}

function Popup({
  children,
  onClose,
  display,
  effectCallback,
}: Props) {
  const handleClickBackdrop:
  React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    onClose();
    // for display change
  };

  useEffect(() => {
    if (display) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [display]);

  if (effectCallback) {
    useEffect(effectCallback, [display]);
  }

  if (display) {
    return createPortal(
      <>
        <div
          className="popup__backdrop"
          aria-hidden="true"
          onClick={handleClickBackdrop}
        />
        <div
          className="popup__close-button"
          onClick={() => onClose()}
          aria-hidden
        >
          <AiOutlineCloseCircle />
        </div>
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
