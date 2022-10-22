import React, { useEffect, useState } from 'react';
import {
  BsPeopleFill, BsFillShieldLockFill, BsGearFill, BsFillHeartFill,
} from 'react-icons/bs';
import { BiHistory } from 'react-icons/bi';
import SideBarLink from '../../../../components/SidebarLink';
import './index.scss';

type Props = {
  onChangeText: (text: string) => void;
};

function SideBar({ onChangeText }: Props) {
  const [currentText, setCurrentText] = useState('基本資料');

  const clickLinkHandler = (text: string) => {
    setCurrentText(text);
  };

  useEffect(() => {
    onChangeText(currentText);
  }, [currentText]);

  return (
    <div className="sidebar">
      <SideBarLink text="基本資料" url="/user/basic" icon={<BsPeopleFill />} onClickLink={clickLinkHandler} />
      <SideBarLink text="帳號安全" url="/user/account" icon={<BsFillShieldLockFill />} onClickLink={clickLinkHandler} />
      <SideBarLink text="管理活動" url="/user/manage" icon={<BsGearFill />} onClickLink={clickLinkHandler} />
      <SideBarLink text="偏好設定" url="/user/preferences" icon={<BsFillHeartFill />} onClickLink={clickLinkHandler} />
      <SideBarLink text="活動歷程" url="/user/history" icon={<BiHistory />} onClickLink={clickLinkHandler} />
    </div>
  );
}

export default SideBar;
