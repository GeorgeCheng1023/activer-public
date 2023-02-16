import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './index.scss';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export interface PopupDisplayType {
  display: boolean,
  onClose: () => void,
}

interface PopupType extends PopupDisplayType {
  children: React.ReactNode,
  effectCallback?: React.EffectCallback
  portalId?: string
}
/**
 * @effectCallback {React.EffectCallback} execute when popup show or close
 */
function Popup({
  children,
  onClose,
  display,
  effectCallback,
  portalId,
}: PopupType) {
  const handleClickBackdrop:
  React.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    e.preventDefault();
    onClose();
  }, []);

  // hidden window scroll to avoid scrolling backdrop page
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
      document.getElementById(portalId || 'root')!,
    );
  }
  return null;
}

Popup.defaultProps = {
  effectCallback: undefined,
};

export default Popup;
