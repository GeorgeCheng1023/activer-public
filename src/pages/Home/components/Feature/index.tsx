import React from 'react';
import { FcCandleSticks, FcProcess, FcDataRecovery } from 'react-icons/fc';
import FeatureItem from './FeatureItem';
import Jupiter from './Jupiter.png';
import './index.scss';

function Feature() {
  return (
    <div className="feature">
      <div className="feature__left">
        <img src={Jupiter} alt="jupiter" />
      </div>
      <div className="feature__right">
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

    </div>
  );
}

export default Feature;
