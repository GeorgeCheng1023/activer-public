import React, { useRef } from 'react';
import {
  BsFillShieldLockFill, BsGearFill, BsFillHeartFill,
} from 'react-icons/bs';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { BiUser, BiHistory, BiLogOut } from 'react-icons/bi';
import { IconLogo } from 'components/Icons';
import { Link } from 'react-router-dom';

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

  return (

    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'tween' }}
      className={sidebarClasses}
      ref={sideBarRef}
    >
      <Link to="/user" className="sidebar__header">
        <IconLogo />
        使用者專區
      </Link>
      <SideBarLink text="基本資料" url="/user/basic" icon={<BiUser />} />
      <SideBarLink text="帳號安全" url="/user/account" icon={<BsFillShieldLockFill />} />
      <SideBarLink text="管理活動" url="/user/manage" icon={<BsGearFill />} />
      <SideBarLink text="偏好設定" url="/user/preferences" icon={<BsFillHeartFill />} />
      <SideBarLink text="活動歷程" url="/user/history" icon={<BiHistory />} />

      {/* TODO: Logout */}
      <SideBarLink text="登出" url="/" icon={<BiLogOut />} />
    </motion.div>

  );
}

export default SideBar;
