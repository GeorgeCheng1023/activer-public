import React from 'react';
import ReactDom from 'react-dom';
import './modal.scss';

interface ModelType {
  open: boolean,
  children: any,
  onClose: any,
}

function Model({ open, children, onClose }: ModelType) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="verify-email-modal__backdrop" />
      <div className="verify-email-modal">
        <button className="verify-email-modal__close-btn" onClick={onClose} type="button">X</button>
        {children}
      </div>
    </>,
    document.getElementById('root')!,
  );
}

export default Model;
