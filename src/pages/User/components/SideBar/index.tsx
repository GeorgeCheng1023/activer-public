import React, { useEffect, useState } from 'react';
import {
  BsPeopleFill, BsFillShieldLockFill, BsGearFill, BsFillHeartFill,
  BsLayoutSidebarInsetReverse,
} from 'react-icons/bs';
import { BiHistory } from 'react-icons/bi';
import SideBarLink from './components/SidebarLink';
import './index.scss';

type Props = {
  onChangeText: (text: string) => void;
};

function SideBar({ onChangeText }: Props) {
  const [currentText, setCurrentText] = useState('基本資料');
  const [displaySidebar, setDisplaySidebar] = useState(true);

  const handleClickLink = (text: string) => {
    setCurrentText(text);
  };
  const handleToggleClick = () => {
    setDisplaySidebar(!displaySidebar);
  };

  useEffect(() => {
    onChangeText(currentText);
  }, [currentText]);

  const handleBlur = () => {
    setDisplaySidebar(false);
  };

  return (
    <div
      className={`
        sidebar__container 
        ${displaySidebar ? 'sidebar__container--expended' : ''}
        `}
      onScroll={handleBlur}
      onBlur={handleBlur}
    >

      <div className="sidebar">
        <SideBarLink text="基本資料" url="/user/basic" icon={<BsPeopleFill />} onClickLink={handleClickLink} />
        <SideBarLink text="帳號安全" url="/user/account" icon={<BsFillShieldLockFill />} onClickLink={handleClickLink} />
        <SideBarLink text="管理活動" url="/user/manage" icon={<BsGearFill />} onClickLink={handleClickLink} />
        <SideBarLink text="偏好設定" url="/user/preferences" icon={<BsFillHeartFill />} onClickLink={handleClickLink} />
        <SideBarLink text="活動歷程" url="/user/history" icon={<BiHistory />} onClickLink={handleClickLink} />
      </div>

      <button type="button" className="sidebar__toggle-button" onClick={handleToggleClick}>
        <BsLayoutSidebarInsetReverse />
      </button>
    </div>
  );
}

export default SideBar;
