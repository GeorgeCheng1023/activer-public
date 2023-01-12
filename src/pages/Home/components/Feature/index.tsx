import React from 'react';
import { FcCandleSticks, FcProcess, FcDataRecovery } from 'react-icons/fc';
import { motion } from 'framer-motion';
import FeatureItem from './FeatureItem';
import Jupiter from './Jupiter.png';
import './index.scss';

function Feature() {
  return (
    <div
      className="feature"
    >
      <div
        className="feature__left"
      >
        <motion.img
          src={Jupiter}
          alt="jupiter"
          initial={{ scale: 0, rotate: 0, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 360, opacity: 1 }}
          whileHover={{ rotate: 330 }}
          viewport={{ amount: 1, once: true }}
          transition={{ duration: 0.8 }}
        />
      </div>
      <motion.div
        className="feature__right"
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 1, once: true }}
        variants={{
          hidden: {
            opacity: 0,
          },
          show: {
            opacity: 1,
            transition: {
              duration: 1,
              staggerChildren: 0.3,
            },
          },
        }}
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
      </motion.div>

    </div>
  );
}

export default Feature;
