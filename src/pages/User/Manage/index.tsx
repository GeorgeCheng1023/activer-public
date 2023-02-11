import React from 'react';
import ManageNav from 'components/ManageNav';
import { BiBorderAll, BiBookmarkHeart, BiEdit } from 'react-icons/bi';
import { BranchDataType, ManageResponseDataType, UserActivityDataType } from 'types/ActivityDataType';
import { getManageActivity } from 'api/activity';
import getCookie from 'utils/getCookies';
import {
  Outlet, redirect, useNavigate, useParams,
} from 'react-router-dom';
import './index.scss';

const filters = [
  {
    id: '全部',
    label: '全部',
    icon: <BiBorderAll />,
  },
  {
    id: '願望',
    label: '願望',
    icon: <BiBookmarkHeart />,
  },
  {
    id: '已報名',
    label: '已報名',
    icon: <BiEdit />,
  },
];

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
  const parseActivites = parseManageResponseToUserActivity(res.data);
  const returnData = {
    all: parseActivites,
    dream: parseActivites.filter((activity) => activity.branch.status === '願望'),
    enroll: parseActivites.filter((activity) => activity.branch.status === '已報名'),
  };
  redirect(encodeURI('/全部'));
  return returnData;
}

function Manage() {
  /** State init
   * @userActivities  User's activity
   * @currentFilterId ManageNav Curreent Filter is which, will based on upper filters.id
   * @currentActivities Filtering {userActivities} based on currentFilterId
   */
  const navigate = useNavigate();
  const { filterId } = useParams();

  const handleChangeFilter = (selectFilterId: string) => {
    navigate(
      `/user/manage/${selectFilterId}`,
      {
        replace: true,
      },
    );
  };

  return (
    <div className="manage">
      <h2>管理活動</h2>
      {/* filter navbar */}
      <ManageNav
        filters={filters}
        onChangeFilter={handleChangeFilter}
        currentFilterId={filterId || '全部'}
      />
      <Outlet />
    </div>
  );
}

export default Manage;
