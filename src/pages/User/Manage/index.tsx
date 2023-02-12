import React from 'react';
import { BiBorderAll, BiBookmarkHeart, BiEdit } from 'react-icons/bi';
import { BranchDataType, ManageResponseDataType, UserActivityDataType } from 'types/ActivityDataType';
import { getManageActivity, postActivityStatus } from 'api/activity';
import { MdDownloadDone } from 'react-icons/md';
import getCookie from 'utils/getCookies';
import {
  Outlet, redirect,
} from 'react-router-dom';
import ManageNavLink from './components/ManageNavLink';
import './index.scss';

function parseManageResponseToUserActivity(data: ManageResponseDataType[])
  : UserActivityDataType[] {
  const parseUserActivities:UserActivityDataType[] = [];
  data.forEach((activity) => {
    activity.branches.forEach((branch: BranchDataType) => {
      if (!branch.status) { return; }
      parseUserActivities.push({
        id: activity.id,
        title: activity.title,
        images: activity.images,
        tags: activity.tags,
        branch,
      });
    });
  });
  return parseUserActivities;
}

export async function loader() {
  const res = await getManageActivity(getCookie('sessionToken'));
  console.log('load');
  const parseActivites = parseManageResponseToUserActivity(res.data);
  const returnData = {
    all: parseActivites,
    dream: parseActivites.filter((activity) => activity.branch.status === '願望'),
    enroll: parseActivites.filter((activity) => activity.branch.status === '已報名'),
    done: parseActivites.filter((activity) => activity.branch.status === '已完成'),
  };
  redirect(encodeURI('/全部'));
  return returnData;
}

// manage update status
export async function action({ request }: any) {
  const formData = await request.formData();
  const res = await postActivityStatus(
    formData.get('activityId'),
    formData.get('branchId'),
    formData.get('status'),
    formData.get('sessionToken'),
  );
  return res.data;
}

function Manage() {
  /** State init
   * @userActivities  User's activity
   * @currentFilterId ManageNav Curreent Filter is which, will based on upper filters.id
   * @currentActivities Filtering {userActivities} based on currentFilterId
   */

  return (
    <div className="manage">
      <h2>管理活動</h2>
      {/* filter navbar */}
      <div className="manage__navbar">
        <ManageNavLink name="全部" icon={<BiBorderAll />} />
        <ManageNavLink name="願望" icon={<BiBookmarkHeart />} />
        <ManageNavLink name="已報名" icon={<BiEdit />} />
        <ManageNavLink name="已完成" icon={<MdDownloadDone />} />
      </div>
      <Outlet />
    </div>
  );
}

export default Manage;
