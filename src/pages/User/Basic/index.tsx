import React, { useState } from 'react';
import './index.scss';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { Tooltip } from 'react-tooltip';
import { useCookies } from 'react-cookie';
import { unstable_usePrompt } from 'react-router-dom';

// components
import Crop from 'components/Crop';
import { FormInputFile, FormInput, FormDropDown } from 'components/Form';
import Button from 'components/Button';

// api
import { apiUserUpdate } from 'api/user';

// hook
import useNonInitialEffect from 'hooks/react/useNonInitialEffect';

// redux
import {
  getUserData, userUpdate,
} from 'store/userAuth';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { Alert, Fade } from '@mui/material';
import scrollToTop from 'utils/scrollToTop';
import CityCountyData from './CityCountyData.json';

function Basic() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);
  const [cookies] = useCookies<string>(['user']);

  // init state
  const [isBlocking, setIsBlocking] = useState(false);
  const [values, setValues] = useState(userData);
  const [selectedCounty, setSelectCounty] = useState(userData.county || '臺北市');
  const [displayCropPanel, setDisplayCropPanel] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>(userData.avatar);

  const handleChange = (key: any, value: any) => {
    // setValues({ ...values, [key]: value });
    setValues((prevData: any) => ({ ...prevData, [key]: value }));
    setDisplaySuccess(false);
    setIsBlocking(true);
  };

  // submit userData
  const updateUserDatabase = async (userFormData: FormData) => {
    const userDataEntries = Object.entries(userData);
    userDataEntries.forEach((entry: any) => {
      if (entry[0] !== 'IsLoggedIn' && entry[0] !== 'Loading' && !userFormData.has(`${entry[0]}`)) {
        userFormData.append(`${entry[0]}`, entry[1]);
      }
    });

    await apiUserUpdate(userFormData, cookies.sessionToken);
    dispatch(userUpdate(values));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const userFormData = new FormData(event.target as HTMLFormElement);

    updateUserDatabase(userFormData);
    setDisplaySuccess(true);
    scrollToTop();
    setIsBlocking(false);
  };

  const handleCountyChange = (key: any, value: any) => {
    setSelectCounty(value);
    handleChange(key, value);
    setDisplaySuccess(false);
    setIsBlocking(true);
  };

  // handle the portrait crop
  const handleCropped = (croppedImage: string) => {
    handleChange('avatar', croppedImage);
    setDisplaySuccess(false);
    setIsBlocking(true);
  };

  // crop
  const handleCropPanelShow = () => {
    setDisplayCropPanel(true);
  };
  useNonInitialEffect(() => {
    handleCropPanelShow();
  }, [imageSrc]);

  // navigate other pages
  unstable_usePrompt({
    when: isBlocking,
    message: '你確定要離開此頁面嗎?',
  });

  const alertUser = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  // reload or navigate other website
  React.useEffect(() => {
    window.addEventListener('beforeunload', alertUser);
    return () => window.removeEventListener('beforeunload', alertUser);
  }, [values]);

  // save it off before users navigate away
  // useBeforeUnload(
  //   React.useCallback(() => {
  //     localStorage.setItem('userData', JSON.stringify(values));
  //   }, [values]),
  // );

  // read it in when they return
  // React.useEffect(() => {
  //   if (values === userData && localStorage.getItem('userData') != null) {
  //     setValues(JSON.parse(localStorage.getItem('userData') ?? ''));
  //   }
  //   console.log(JSON.parse(localStorage.getItem('userData') ?? ''));
  // }, [values]);

  return (
    <form onSubmit={handleSubmit} name="userFormData" className="user-basic">
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
          <img className="user-basic__portrait img" src={values?.avatar || '/user.png'} alt="user-portrait" />
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
            formValue={values}
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
            formValue={values}
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
            value={values.gender}
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
            formValue={values}
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
            formValue={values}
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
            value={values.county}
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
            value={values.area}
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
            formValue={values}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="user-basic__submit">
        <Button type="submit" text="確認修改" />
      </div>
    </form>
  );
}

export default Basic;
