import React, { useState } from 'react';
import './index.scss';
import FAQTag from 'components/FAQ-Tag';
import Crop from 'components/Crop';
import { FormInputFile, FormInput, FormDropDown } from 'components/Form';
import useNonInitialEffect from 'hooks/react/useNonInitialEffect';
import Button from 'components/Button';
import { getUserData, userUpdate } from 'store/userAuth';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { apiUserUpdate } from 'api/axios';
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

  const updateUserDatabase = async (userFormData: FormData) => {
    userFormData.append('id', userData.Id);
    userFormData.append('sessionToken', userData.SessionToken);
    userFormData.append('email', userData.Email);
    userFormData.append('password', userData.Password);
    userFormData.append('verify', userData.verify);

    try {
      const response = await apiUserUpdate(userFormData);
      dispatch(userUpdate(values));
      console.log(response);
    } catch (err: any) {
      if (err.status === 401) {
        console.log('token error');
      } else {
        console.log('伺服器懶蛋');
      }
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const userFormData = new FormData(event.target as HTMLFormElement);

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
      <div className="user-basic__container">
        <div className="user-basic__container--column">
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
        </div>
        <div className="user-basic__container--column">
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
          <div className="user-basic__container">
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
          </div>
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
          <div className="user-basic__input user-basic__input__location">
            <h3 className="user-basic__input__location__label">
              居住地
            </h3>
            <div className="user-basic__container">
              <div className="user-basic__input__location__county">
                <FormDropDown
                  id="country"
                  label="縣市"
                  name="County"
                  options={CityCountyData.map((c) => c.CityName)}
                  value={values.County}
                  onChange={handleCountyChange}
                />
              </div>
              <div className="user-basic__input__location__area">
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
            </div>
            <FAQTag title="為什麼需要提供居住地?" dataMsg="提供居住地可以讓我們協助搜索鄰近您居住地的活動!" />
          </div>

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
          <Button type="submit" text="確認修改" />
        </div>
      </div>
    </form>
  );
}

export default Basic;
