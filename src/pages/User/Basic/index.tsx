import React, { useState } from 'react';
import './index.scss';
import FormInput from '../../../components/Form/FormInput';
import Button from '../../../components/Button';
import dummyUserData from './dummyUserData.json';
import FormDropDown from '../../../components/Form/FormDropdown';

function Basic() {
  const [values, setValues] = useState(dummyUserData);

  /*eslint-disable*/
  const handleChange = (key: any, value: any) => {
    setValues({ ...values, [key]: value });
    console.log(values)
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log(values)
  };
  /* eslint-enable */

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        inputProps={{
          id: 'realName',
          name: 'realName',
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
          options: [{ value: 'male', name: '男性' }, { value: 'female', name: '女性' }, { value: 'hide', name: '隱藏' }],
          defaultValue: 'hide',
        }}
        onChange={handleChange}
      />
      {/* <FormInput
        inputProps={{
          id: 'occupation',
          name: 'occupation',
          label: '職業',
          inputType: 'text',
          placeholder: '輸入職業',
        }}
        value={values['occupation' as keyof typeof values]}
      /> */}

      <Button buttonType="submit" text="確認修改" />
    </form>
  );
}

export default Basic;
