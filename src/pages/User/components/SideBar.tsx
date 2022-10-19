import React from 'react';
import SideBarLink from '../../../components/SidebarLink';

type Props = {
  children: React.ReactNode;
};

function SideBar({ children }: Props) {
  return (
    <>
      <div className="sidebar">
        <SideBarLink labelText="基本資料" />
        <SideBarLink labelText="帳號安全" />
        <SideBarLink labelText="管理活動" />
        <SideBarLink labelText="偏好設定" />
        <SideBarLink labelText="活動歷程" />
      </div>
      <div className="user">
        {children}
      </div>
    </>
  );
}

export default SideBar;
