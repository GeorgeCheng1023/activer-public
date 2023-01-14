import React, { useEffect, useRef } from 'react';
import {
  BsFillShieldLockFill, BsGearFill, BsFillHeartFill,
} from 'react-icons/bs';
import classNames from 'classnames';
import { BiUser, BiHistory } from 'react-icons/bi';
import { IconLogo } from 'components/Icons';

import SideBarLink from './components/SidebarLink';
import './index.scss';

function SideBar() {
  const sideBarRef = useRef<HTMLDivElement>(null);

  const sidebarClasses = classNames({
    sidebar: true,
    'sidebar--scrollable':
      sideBarRef.current
        ? sideBarRef.current.offsetWidth > window.innerWidth
        : false,
  });

  useEffect(() => {
    console.log(sideBarRef.current?.offsetWidth, window.innerWidth);
  }, []);

  return (

    <div className={sidebarClasses} ref={sideBarRef}>
      <div className="sidebar__header">
        <IconLogo />
        使用者專區
      </div>
      <SideBarLink text="基本資料" url="/user/basic" icon={<BiUser />} />
      <SideBarLink text="帳號安全" url="/user/account" icon={<BsFillShieldLockFill />} />
      <SideBarLink text="管理活動" url="/user/manage" icon={<BsGearFill />} />
      <SideBarLink text="偏好設定" url="/user/preferences" icon={<BsFillHeartFill />} />
      <SideBarLink text="活動歷程" url="/user/history" icon={<BiHistory />} />
    </div>

  );
}

export default SideBar;
