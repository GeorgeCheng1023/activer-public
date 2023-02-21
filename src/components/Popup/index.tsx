import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default Popup;
