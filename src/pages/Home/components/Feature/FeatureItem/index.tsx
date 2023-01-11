import React from 'react';
import './index.scss';
import { motion } from 'framer-motion';

interface FeatureItemType {
  title : string;
  titleIcon: React.ReactNode;
  detail: string;
}

const itemVariants = {
  offScreen: { opacity: 0, y: -100 },
  onScreen: {
    opacity: 1,
    y: 0,
  },
};

function FeatureItem({
  title, titleIcon, detail,
}: FeatureItemType) {
  return (
    <motion.div
      className="feature__item"
      variants={itemVariants}
    >
      <div className="feature__item__title">
        <span className="feature__item__icon">{titleIcon}</span>
        <h3>{title}</h3>
      </div>

      <p className="feature__detail">{detail}</p>
    </motion.div>
  );
}

export default FeatureItem;
