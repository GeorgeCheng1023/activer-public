import React from 'react';
import { GrClose } from 'react-icons/gr';
import './index.scss';

type Props = {
  trigger?: boolean,
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode,
};

function Popup({ trigger, children, setTrigger }: Props) {
  const handleClick:React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setTrigger(false);
  };

  if (trigger) {
    return (
      <div className="popup">
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

Popup.defaultProps = {
  trigger: false,
};

export default Popup;
