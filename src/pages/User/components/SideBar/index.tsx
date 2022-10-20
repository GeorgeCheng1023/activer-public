import React from 'react';
import { BsPeopleFill } from 'react-icons/bs';
import SideBarLink from '../../../../components/SidebarLink';
import './index.scss';

type Props = {
  children: React.ReactNode;
};

function SideBar({ children }: Props) {
  return (
    <>
      <div className="sidebar">
        <SideBarLink text="基本資料" url="/user/basic" icon={<BsPeopleFill />} />
        <SideBarLink text="帳號安全" url="/user/account" icon={<BsPeopleFill />} />
        <SideBarLink text="管理活動" url="/user/manage" icon={<BsPeopleFill />} />
        <SideBarLink text="偏好設定" url="/user/preferences" icon={<BsPeopleFill />} />
        <SideBarLink text="活動歷程" url="/user/history" icon={<BsPeopleFill />} />
      </div>
      <div className="main-content">
        {children}
      </div>
    </>
  );
}

export default SideBar;
