import React from 'react';
import './index.scss';
import { motion } from 'framer-motion';

interface FeatureItemType {
  title : string;
  titleIcon: React.ReactNode;
  detail: string;
}

const itemVariants = {
  hidden: {
    scale: 1,
    opacity: 0,
    x: 100,
  },
  show: {
    opacity: 1,
    x: 0,
  },
};

function FeatureItem({
  title, titleIcon, detail,
}: FeatureItemType) {
  return (
    <motion.div
      className="feature__item"
      whileHover={{ scale: 1.05 }}
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
