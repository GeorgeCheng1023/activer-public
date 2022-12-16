import React, { useState } from 'react';
import FormInput from 'components/Form/FormInput';
import Button from 'components/Button';
import './index.scss';
import { useAppSelector } from 'hooks/redux';
import { getUserData } from 'store/userAuth';
// import dummyAccountData from './dummyAccountData.json';
import { useNavigate } from 'react-router-dom';

function Account() {
  const nevigate = useNavigate();
  const userData = useAppSelector(getUserData);
  const [accountValue, setAccountValue] = useState(userData);

  const handleChange = (key: any, value: any) => {
    setAccountValue({ ...accountValue, [key]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (userData.Password === accountValue.password) {
      nevigate('/ResetPwd');
    }
  };

  return (

    <form onSubmit={handleSubmit} className="user-account">
      <div className="user-account__input user-account__input__account">
        <FormInput
          inputProps={{
            id: 'account',
            name: 'account',
            label: '帳號',
            placeholder: userData.Email,
          }}
          onChange={handleChange}
          disabled
          formValue={accountValue}
        />
      </div>
      <div className="user-account__input user-account__input__password">
        <FormInput
          inputProps={{
            id: 'password',
            name: 'password',
            label: '密碼',
            inputType: 'password',
            placeholder: 'Enter your password',
            pattern: userData.Password,
            errorMessage: '密碼錯誤',
          }}
          onChange={handleChange}
          formValue={accountValue}
        />
      </div>
      <Button
        disabled={!(accountValue.password === userData.Password)}
        type="submit"
        text="修改密碼"
      />
    </form>

  );
}

export default Account;
