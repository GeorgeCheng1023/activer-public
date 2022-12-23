import React from 'react';
import { BsGem } from 'react-icons/bs';
import { BiRefresh } from 'react-icons/bi';
import { FaFlagCheckered } from 'react-icons/fa';
import FeatureItem from './FeatureItem';
import './index.scss';

function Feature() {
  return (
    <div className="feature">
      <FeatureItem
        title="多元活動探索無限可能"
        titleIcon={<BsGem />}
        img="https://images.unsplash.com/photo-1494059980473-813e73ee784b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
        detail="標籤式清楚分類，從社會科學到語言學習，十大領域找尋你的興趣!"
      />
      <FeatureItem
        title="資料即時更新追蹤不怕麻煩"
        titleIcon={<BiRefresh />}
        img="https://images.unsplash.com/photo-1494059980473-813e73ee784b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
        detail="官方資料來源，即時更新，加入願望清單，儲存你最想參加的活動"
      />
      <FeatureItem
        title="活動歷程分析找尋自己的學習道路!"
        titleIcon={<FaFlagCheckered />}
        img="https://images.unsplash.com/photo-1494059980473-813e73ee784b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
        detail="隨時紀錄活動，圖像化分析，找尋自己喜歡的事物"
      />

    </div>
  );
}

export default Feature;
