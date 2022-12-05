import React, { useState } from 'react';
import './index.scss';
import FAQTag from 'components/FAQ-Tag';
import Crop from 'components/Crop';
import { useAppDispatch } from 'hooks/redux';
import { userUpdate } from 'store/userAuth';
import FormInputFile from 'components/Form/FormInputFile';
import useNonInitialEffect from 'hooks/react/useNonInitialEffect';

import FormInput from '../../../components/Form/FormInput';
import Button from '../../../components/Button';
import dummyUserData from './dummyUserData.json';
import FormDropDown from '../../../components/Form/FormDropdown';
import CityCountyData from './CityCountyData.json';

function Basic() {
  const dispatch = useAppDispatch();

  const [values, setValues] = useState(dummyUserData);
  const [selectedCounty, setSelectCounty] = useState('');
  const [displayCropPanel, setDisplayCropPanel] = useState(false);

  const handleChange = (key: any, value: any) => {
    setValues({ ...values, [key]: value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(values);
    dispatch(userUpdate(values));
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
  const [imageSrc, setImageSrc] = useState<string>('');

  const handleCropPanelShow = () => {
    setDisplayCropPanel(true);
  };
  useNonInitialEffect(() => {
    handleCropPanelShow();
  }, [imageSrc]);

  return (
    <form onSubmit={handleSubmit} className="user-basic">
      <div className="user-basic__container">
        <div className="user-basic__container--column">
          <div className="user-basic__portrait">
            {displayCropPanel
            && (
              <Crop
                image={imageSrc}
                onCropped={handleCropped}
                setDisplayCropPanel={setDisplayCropPanel}
              />
            )}
            <img className="user-basic__portrait img" src={values.Portrait} alt="user-portrait" />
            <div className="user-basic__portrait upload-button">
              <FormInputFile setImageSrc={setImageSrc} accept="image" />
            </div>
          </div>
          <div className="user-basic__input user-basic__input__nick-name">
            <FormInput
              inputProps={{
                id: 'nick_name',
                name: 'NickName',
                label: '暱稱',
                inputType: 'text',
                placeholder: '輸入暱稱姓名',
                errorMessage: '暱稱不可超過15字',
                pattern: '[\u4E00-\u9FFFA-Za-z]{1,15}',
              }}
              formValue={values}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="user-basic__container--column">
          <div className="user-basic__input user-basic__input__real-name">
            <FormInput
              inputProps={{
                id: 'real_name',
                name: 'RealName',
                label: '真實姓名',
                inputType: 'text',
                placeholder: '輸入真實姓名',
                errorMessage: '真實只能接受2-6字',
                pattern: '[\u4E00-\u9FFF]{2,6}',
              }}
              formValue={values}
              onChange={handleChange}
            />
          </div>
          <div className="user-basic__container">
            <div className="user-basic__input user-basic__input__gender">
              <FormDropDown
                dropdownProps={{
                  label: '性別',
                  name: 'Gender',
                  options: ['男性', '女性', '其他', '隱藏'],
                  defaultOption: values.Gender,
                }}
                onChange={handleChange}
              />
            </div>
            <div className="user-basic__input user-basic__input__birthday">
              <FormInput
                inputProps={{
                  id: 'Birthday',
                  name: 'Birthday',
                  label: '生日',
                  inputType: 'date',
                  placeholder: '請選擇出生年月日',
                }}
                formValue={values}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="user-basic__input user-basic__input__profession">
            <FormInput
              inputProps={{
                id: 'Profession',
                name: 'Profession',
                label: '職業',
                inputType: 'text',
                placeholder: '請選擇輸入您的職業',
              }}
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
                  dropdownProps={{
                    label: '縣市',
                    name: 'Country',
                    options: CityCountyData.map((c) => c.CityName),
                    defaultOption: dummyUserData.Country,
                  }}
                  onChange={handleCountyChange}
                />
              </div>
              <div className="user-basic__input__location__area">
                <FormDropDown
                  dropdownProps={{
                    label: '區鄉鎮',
                    name: 'Area',
                    options: CityCountyData.find(
                      (c) => c.CityName === selectedCounty,
                    )?.AreaList.map((a) => a.AreaName) || [],
                  }}
                  onChange={handleChange}
                />
              </div>
            </div>
            <FAQTag title="為什麼需要提供居住地?" dataMsg="提供居住地可以讓我們協助搜索鄰近您居住地的活動!" />
          </div>

          <div className="user-basic__input user-basic__input__phone">
            <FormInput
              inputProps={{
                id: 'phone',
                name: 'Phone',
                label: '電話',
                inputType: 'text',
                placeholder: '請選擇輸入您的職業',
                pattern: '[0-9]{10}',
                errorMessage: '電話必須是10位數字',
              }}
              formValue={values}
              onChange={handleChange}
            />
          </div>
          <Button buttonType="submit" text="確認修改" />
        </div>
      </div>
    </form>
  );
}

export default Basic;
