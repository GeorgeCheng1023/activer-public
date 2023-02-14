import React, { useEffect, useState } from 'react';
import { BiBorderAll, BiBookmarkHeart, BiEdit } from 'react-icons/bi';
import {
  BranchDataType, ManageLoaderType, ManageResponseDataType, UserActivityDataType,
} from 'types/ActivityDataType';
import { getManageActivity, postActivityStatus } from 'api/activity';
import { MdDownloadDone } from 'react-icons/md';
import getCookie from 'utils/getCookies';
import {
  useLoaderData, useParams,
} from 'react-router-dom';
import ManageNavLink from './components/ManageNavLink';
import ManageActivity from './components/ManageActivity';
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
  const parseActivites = parseManageResponseToUserActivity(res.data);
  const returnData = {
    all: parseActivites,
    dream: parseActivites.filter((activity) => activity.branch.status === '願望'),
    enroll: parseActivites.filter((activity) => activity.branch.status === '已報名'),
    done: parseActivites.filter((activity) => activity.branch.status === '已完成'),
  };
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

// prevent reload in navigation
export function revalidate({ currentParams, nextParams }: any) {
  const shouldRevalidate = (currentParams.filter === nextParams.filter);
  return shouldRevalidate;
}

function Manage() {
  /** State init
   * @userActivities  User's activity
   * @currentFilterId ManageNav Curreent Filter is which, will based on upper filters.id
   * @currentActivities Filtering {userActivities} based on currentFilterId
   */
  const [currentActivities, setCurrentActivities] = useState<UserActivityDataType[]>([]);
  const loaderData = useLoaderData() as ManageLoaderType;
  const { filter } = useParams();

  // set activiy display base on filterId in params
  useEffect(() => {
    if (filter === '願望') {
      setCurrentActivities(loaderData.dream);
    } else if (filter === '已報名') {
      setCurrentActivities(loaderData.enroll);
    } else if (filter === '已完成') {
      setCurrentActivities(loaderData.done);
    } else {
      setCurrentActivities(loaderData.all);
    }
  }, [filter, loaderData]);

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
      <ManageActivity activities={currentActivities} />
    </div>
  );
}

export default Manage;
