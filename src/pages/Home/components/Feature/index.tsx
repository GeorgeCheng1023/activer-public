import React from 'react';
import { FcCandleSticks, FcProcess, FcDataRecovery } from 'react-icons/fc';
import { motion } from 'framer-motion';
import FeatureItem from './FeatureItem';
import Jupiter from './Jupiter.png';
import './index.scss';

const mainVariant = {
  offScreen: {},
  onScreen: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
};

const jupiterVariant = {
  offScreen: {
    rotate: 0,
    scale: 0,
    opacity: 0,
  },
  onScreen: {
    rotate: 360,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1,
    },

  },
};

function Feature() {
  return (
    <motion.div
      className="feature"
      initial="offScreen"
      whileInView="onScreen"
      variants={mainVariant}
      viewport={{ once: false, amount: 0.5 }}
    >
      <div
        className="feature__left"
      >
        <motion.img
          variants={jupiterVariant}
          src={Jupiter}
          alt="jupiter"

          // transition={{ duration: 0.8 }}
        />
      </div>
      <div
        className="feature__right"
      >
        <FeatureItem
          title="多元活動探索無限可能"
          titleIcon={<FcCandleSticks />}
          detail="標籤式清楚分類，從社會科學到語言學習，十大領域找尋你的興趣!"
        />
        <FeatureItem
          title="資料即時更新活動追蹤不怕麻煩"
          titleIcon={<FcProcess />}
          detail="官方資料來源，即時更新，加入願望清單，儲存你最想參加的活動"
        />
        <FeatureItem
          title="活動歷程分析找尋興趣"
          titleIcon={<FcDataRecovery />}
          detail="隨時紀錄活動，圖像化分析，找尋自己喜歡的事物"
        />
      </div>

    </motion.div>
  );
}

export default Feature;
