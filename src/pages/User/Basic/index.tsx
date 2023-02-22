import React, { useState } from 'react';
import './index.scss';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { Tooltip } from 'react-tooltip';
import {
  LoaderFunctionArgs, useLoaderData, Form, ActionFunctionArgs, useParams,
} from 'react-router-dom';

// components
import Crop from 'components/Crop';
import { FormInputFile, FormInput, FormDropDown } from 'components/Form';
import Button from 'components/Button';

// api
import { apiGetUser, apiUserUpdate } from 'api/user';

// hook
import useNonInitialEffect from 'hooks/react/useNonInitialEffect';

// redux
import { updateUser, getUserData } from 'store/user';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

import scrollToTop from 'utils/scrollToTop';
import { throwError } from 'pages/Error';
import { Alert, Fade } from '@mui/material';
import { UserDataType } from 'types/UserType';

// utils
import formatUserData from 'utils/formatUserData';
import getCookie from 'utils/getCookies';

// data
import CityCountyData from './CityCountyData.json';

export async function loader({ params }: LoaderFunctionArgs): Promise<UserDataType> {
  if (!params.userId) throwError('page not found', 404);
  const userId = parseInt(params.userId || '1', 10);
  const res = await apiGetUser(userId);
  const formatRes = formatUserData(res.data);
  return formatRes;
}

export async function action({ params, request }: ActionFunctionArgs) {
  if (!params.userId) throwError('page not found', 404);
  const userId = parseInt(params.userId || '1', 10);

  const prevData = await apiGetUser(userId);

  if (!prevData.statusText) return throwError('user not found', 404);

  const userFormData = await request.formData();
  const userData = Object.fromEntries(userFormData);

  const postUserData = { ...prevData.data, ...userData };

  // send your post request
  await apiUserUpdate(postUserData, getCookie('sessionToken'));

  scrollToTop();
  return null;
}

function Basic() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);
  const params = useParams();

  const [displayCropPanel, setDisplayCropPanel] = useState(false);
  const [selectedCounty, setSelectCounty] = useState(userData.county || '臺北市');

  const imageUrl = `http://220.132.244.41:5044/api/user/avatar/${params.userId}`;
  const [imageSrc, setImageSrc] = useState<string>(imageUrl);

  // ui
  // const [isBlocking, setIsBlocking] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState<boolean>(false);

  // init state
  const userLoaderData = useLoaderData() as UserDataType;
  React.useEffect(() => {
    dispatch(updateUser({ ...userLoaderData }));
  }, []);

  const handleChange = async (key: any, value: any) => {
    setDisplaySuccess(false);
    dispatch(updateUser({ ...userData, [key]: value }));
  };

  const handleCountyChange = (key: any, value: any) => {
    // county
    setSelectCounty(value);
    handleChange(key, value);

    setDisplaySuccess(false);
  };

  // handle the portrait crop
  const handleCropped = (croppedImage: string) => {
    handleChange('avatar', croppedImage);
    setImageSrc(croppedImage);
    setDisplaySuccess(false);
  };

  // crop
  const handleCropPanelShow = () => {
    setDisplayCropPanel(true);
  };
  useNonInitialEffect(() => {
    handleCropPanelShow();
  }, [imageSrc]);

  // navigate other pages
  // unstable_usePrompt({
  //   when: isBlocking,
  //   message: '你確定要離開此頁面嗎?',
  // });

  // const alertUser = (e: BeforeUnloadEvent) => {
  //   e.preventDefault();
  //   e.returnValue = '';
  // };

  // reload or navigate other website
  // useNonInitialEffect(() => {
  //   window.addEventListener('beforeunload', alertUser);
  //   return () => window.removeEventListener('beforeunload', alertUser);
  // }, [isBlocking]);

  return (
    <Form method="post" action={`/user/basic/${userData.id}`} name="userFormData" className="user-basic">
      <h2>基本資料</h2>
      <div className="user-basic__container user-basic__basic">

        {/* update user data successfully */}
        <div className="user-basic__success-msg-section">
          <Fade in={displaySuccess}>
            <Alert severity="success">資料更改成功</Alert>
          </Fade>
        </div>

        <h2>基本資訊</h2>
        {/* Portrait */}
        <div className="user-basic__portrait">
          <Crop
            image={imageSrc}
            onCropped={handleCropped}
            onClose={() => setDisplayCropPanel(false)}
            display={displayCropPanel}
          />
          <img className="user-basic__portrait img" src={imageSrc || '/user.png'} alt="user-portrait" />
          <div className="user-basic__portrait upload-button">
            <FormInputFile
              name="avatar"
              setImageSrc={setImageSrc}
              accept="image/*"
              id="user-basic__portrait__upload"
              label="上傳頭像"
            />
          </div>
        </div>
        {/* Nickname */}
        <div className="user-basic__input user-basic__input__nick-name">
          <FormInput
            id="nick_name"
            name="nickName"
            label="暱稱"
            type="text"
            // placeholder="輸入暱稱姓名"
            errorMessage="暱稱不可超過15字"
            pattern="[\u4E00-\u9FFFA-Za-z]{1,15}"
            formValue={userData}
            onChange={handleChange}
          />
        </div>
        {/* Realname */}
        <div className="user-basic__input user-basic__input__real-name">
          <FormInput
            id="real_name"
            name="realName"
            label="真實姓名"
            type="text"
            // placeholder="輸入真實姓名"
            errorMessage="真實只能接受2-6字"
            pattern="[\u4E00-\u9FFF]{2,6}"
            formValue={userData}
            onChange={handleChange}
          />
        </div>
        {/* Gender */}
        <div className="user-basic__input user-basic__input__gender">
          <FormDropDown
            id="gender"
            label="性別"
            name="gender"
            options={['男性', '女性', '其他', '隱藏']}
            value={userData.gender}
            onChange={handleChange}
          />
        </div>
        {/* Birthday */}
        <div className="user-basic__input user-basic__input__birthday">
          <FormInput
            id="birthday"
            name="birthday"
            label="生日"
            type="date"
            placeholder="請選擇出生年月日"
            formValue={userData}
            onChange={handleChange}
          />
        </div>
        {/* Profession */}
        <div className="user-basic__input user-basic__input__profession">
          <FormInput
            id="profession"
            name="profession"
            label="職業"
            type="text"
            // placeholder="請選擇輸入您的職業"
            formValue={userData}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="user-basic__container">
        <h2>地址</h2>
        {/* Location: County */}
        <div className="user-basic__input user-basic__input__location__county">
          <FormDropDown
            id="county"
            label="縣市"
            name="county"
            options={CityCountyData.map((c) => c.CityName)}
            value={userData.county}
            onChange={handleCountyChange}
          />
        </div>
        {/* Location: Area */}
        <div className="user-basic__input user-basic__input__location__area">
          <FormDropDown
            id="area"
            label="區鄉鎮"
            name="area"
            options={CityCountyData.find(
              (c) => c.CityName === selectedCounty,
            )?.AreaList.map((a) => a.AreaName) || []}
            value={userData.area}
            onChange={handleChange}
          />
        </div>
        <Button text="為什麼需要提供居住地?" color="white" iconBefore={<AiOutlineQuestionCircle />} id="user-basic__location-faq" />
        <Tooltip
          anchorId="user-basic__location-faq"
          content="提供居住地可以讓我們協助搜索鄰近您居住地的活動!"
        />
      </div>

      <div className="user-basic__container">
        <h2>聯絡資訊</h2>

        {/* Phone */}
        <div className="user-basic__input user-basic__input__phone">
          <FormInput
            id="phone"
            name="phone"
            label="電話"
            type="text"
            // placeholder="請選擇輸入您的電話"
            pattern="[0-9]{10}"
            errorMessage="電話必須是10位數字"
            formValue={userData}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="user-basic__submit">
        <Button type="submit" text="確認修改" />
      </div>
    </Form>
  );
}

export default Basic;
