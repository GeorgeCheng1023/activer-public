import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './index.scss';
import useWindowWidth from 'hooks/window/useWindowWidth';

interface PopupType {
  className?: string;
  backLink: string;
  children: React.ReactNode;
}

function Popup({ className, backLink, children } : PopupType) {
  const navigate = useNavigate();
  const classes = classNames('popup', className);
  const windowWidth = useWindowWidth();

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
      <motion.div
        className="popup__inner"
        initial={windowWidth > 768
          ? { scale: 0 }
          : { y: '100%' }}
        animate={windowWidth > 768
          ? { scale: 1 }
          : { y: 0 }}
        transition={{ type: 'linear', duration: 0.5 }}
        exit={{ scale: 0 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default Popup;
