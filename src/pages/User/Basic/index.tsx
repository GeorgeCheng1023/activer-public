import React, { useState } from 'react';
import './index.scss';
import Crop from 'components/Crop';
import { FormInputFile, FormInput, FormDropDown } from 'components/Form';
import useNonInitialEffect from 'hooks/react/useNonInitialEffect';
import Button from 'components/Button';
import { getUserData, userUpdate } from 'store/userAuth';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { apiUserUpdate } from 'api/axios';
import { Tooltip } from 'react-tooltip';
import CityCountyData from './CityCountyData.json';

function Basic() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);

  // init state
  const [values, setValues] = useState(userData);
  const [selectedCounty, setSelectCounty] = useState(userData.County || '臺北市');
  const [displayCropPanel, setDisplayCropPanel] = useState(false);

  const handleChange = (key: any, value: any) => {
    setValues({ ...values, [key]: value });
  };

  const updateUserDatabase = (userFormData: FormData) => {
    userFormData.append('Id', userData.Id);
    userFormData.append('SessionToken', userData.SessionToken);
    userFormData.append('Email', userData.Email);
    userFormData.append('Password', userData.Password);
    apiUserUpdate(userFormData);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const userFormData = new FormData(event.target as HTMLFormElement);

    dispatch(userUpdate(values));
    updateUserDatabase(userFormData);
  };

  const handleCountyChange = (key: any, value: any) => {
    setSelectCounty(value);
    handleChange(key, value);
  };

  // handle the portrait crop
  const handleCropped = (croppedImage: string) => {
    handleChange('Portrait', croppedImage);
  };

  // crop
  const [imageSrc, setImageSrc] = useState<string>(userData.Portrait);

  const handleCropPanelShow = () => {
    setDisplayCropPanel(true);
  };
  useNonInitialEffect(() => {
    handleCropPanelShow();
  }, [imageSrc]);

  return (
    <form onSubmit={handleSubmit} name="userFormData" className="user-basic">

      <div className="user-basic__container user-basic__basic">
        <h2>基本資訊</h2>
        {/* Portrait */}
        <div className="user-basic__portrait">
          <Crop
            image={imageSrc}
            onCropped={handleCropped}
            onClose={() => setDisplayCropPanel(false)}
            display={displayCropPanel}
          />
          <img className="user-basic__portrait img" src={values.Portrait || '/user.png'} alt="user-portrait" />
          <div className="user-basic__portrait upload-button">
            <FormInputFile
              name="Portrait"
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
            name="NickName"
            label="暱稱"
            type="text"
            placeholder="輸入暱稱姓名"
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
            name="RealName"
            label="真實姓名"
            type="text"
            placeholder="輸入真實姓名"
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
            name="Gender"
            options={['男性', '女性', '其他', '隱藏']}
            value={values.Gender}
            onChange={handleChange}
          />
        </div>
        {/* Birthday */}
        <div className="user-basic__input user-basic__input__birthday">
          <FormInput
            id="Birthday"
            name="Birthday"
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
            id="Profession"
            name="Profession"
            label="職業"
            type="text"
            placeholder="請選擇輸入您的職業"
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
            id="country"
            label="縣市"
            name="County"
            options={CityCountyData.map((c) => c.CityName)}
            value={values.County}
            onChange={handleCountyChange}
          />
        </div>
        {/* Location: Area */}
        <div className="user-basic__input user-basic__input__location__area">
          <FormDropDown
            id="area"
            label="區鄉鎮"
            name="Area"
            options={CityCountyData.find(
              (c) => c.CityName === selectedCounty,
            )?.AreaList.map((a) => a.AreaName) || []}
            value={values.Area}
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
            name="Phone"
            label="電話"
            type="text"
            placeholder="請選擇輸入您的職業"
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
