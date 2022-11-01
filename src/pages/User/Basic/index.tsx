import React, { useEffect, useState } from 'react';
import './index.scss';
import FormInput from '../../../components/Form/FormInput';
import Button from '../../../components/Button';
import dummyUserData from './dummyUserData.json';
import FormDropDown from '../../../components/Form/FormDropdown';
import CityCountyData from './CityCountyData.json';

function Basic() {
  const [values, setValues] = useState(dummyUserData);
  const [selectedCounty, setSelectCounty] = useState('');

  useEffect(() => {

  }, [values]);

  const handleChange = (key: any, value: any) => {
    setValues({ ...values, [key]: value });
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(values);
  };
  const handleCountyChange = (key: any, value: any) => {
    setSelectCounty(value);
    handleChange(key, value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        inputProps={{
          id: 'real_name',
          name: 'real_name',
          label: '真實姓名',
          inputType: 'text',
          placeholder: '輸入真實姓名',
          errorMessage: '真實只能接受2-6中文字',
          pattern: '[\u4E00-\u9FFF]{2,6}',
        }}
        formValue={values}
        onChange={handleChange}
      />
      <FormDropDown
        dropdownProps={{
          label: '性別',
          name: 'gender',
          options: [
            { key: 'male', value: '男性' },
            { key: 'female', value: '女性' },
            { key: 'hide', value: '隱藏' }],
          defaultOptionKey: values.gender,
        }}
        onChange={handleChange}
      />
      <FormInput
        inputProps={{
          id: 'birthday',
          name: 'birthday',
          label: '生日',
          inputType: 'date',
          placeholder: '請選擇出生年月日',
        }}
        formValue={values}
        onChange={handleChange}
      />
      <FormInput
        inputProps={{
          id: 'profession',
          name: 'profession',
          label: '職業',
          inputType: 'text',
          placeholder: '請選擇輸入您的職業',
        }}
        formValue={values}
        onChange={handleChange}
      />
      <FormDropDown
        dropdownProps={{
          label: '縣市',
          name: 'county',
          options: CityCountyData.map((c, id) => ({ key: id.toString(), value: c.CityName })),
        }}
        onChange={handleCountyChange}
      />
      <FormDropDown
        dropdownProps={{
          label: '區鄉鎮',
          name: 'area',
          options: CityCountyData.find((c) => c.CityName === selectedCounty)?.AreaList.map((a) => ({
            key: a.ZipCode,
            value: a.AreaName,
          })),
        }}
        onChange={handleChange}
      />

      <FormInput
        inputProps={{
          id: 'phone',
          name: 'phone',
          label: '電話',
          inputType: 'text',
          placeholder: '請選擇輸入您的職業',
          pattern: '[0-9]{10}',
          errorMessage: '電話必須是10位數字',
        }}
        formValue={values}
        onChange={handleChange}
      />
      <Button buttonType="submit" text="確認修改" />
    </form>
  );
}

export default Basic;
