import React, { useCallback, useRef } from 'react';
import {
  BsFillShieldLockFill, BsGearFill, BsFillHeartFill,
} from 'react-icons/bs';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { BiUser, BiHistory, BiLogOut } from 'react-icons/bi';
import { IconLogo } from 'components/Icons';
import { Link } from 'react-router-dom';

import './index.scss';
import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { signOut } from 'store/auth';
import { getUserData } from 'store/user';
import SideBarLink from './components/SidebarLink';

function SideBar() {
  const sideBarRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);
  const [, , removeCookie] = useCookies<string>(['user']);

  const sidebarClasses = classNames({
    sidebar: true,
    'sidebar--scrollable':
      sideBarRef.current
        ? sideBarRef.current.offsetWidth > window.innerWidth
        : false,
  });

  const handleLogout = useCallback(() => {
    dispatch(signOut());
    removeCookie('sessionToken', { path: '/' });
  }, []);

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
      <SideBarLink text="基本資料" url={`/user/basic/${userData.id}`} icon={<BiUser />} />
      <SideBarLink text="帳號安全" url="/user/account" icon={<BsFillShieldLockFill />} />
      <SideBarLink text="管理活動" url="/user/manage/全部" icon={<BsGearFill />} />
      <SideBarLink text="偏好設定" url="/user/preferences" icon={<BsFillHeartFill />} />
      <SideBarLink text="活動歷程" url="/user/history" icon={<BiHistory />} />

      {/* TODO: Logout */}
      <button type="button" onClick={handleLogout}>
        <SideBarLink text="登出" url="/" icon={<BiLogOut />} />
      </button>
    </motion.div>

  );
}

export default SideBar;
