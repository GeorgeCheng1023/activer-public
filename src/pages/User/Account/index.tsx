import React, { useState } from 'react';
import FormInput from 'components/Form/FormInput';
import Button from 'components/Button';
import './index.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getUserData, updateUserData, userUpdate } from 'store/userAuth';
import dummyAccountData from './dummyAccountData.json';

// regex
const PWD_REGEX = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/';

function Account() {
  const [accountValue, setAccountValue] = useState(dummyAccountData);
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);

  const handleChange = (key: any, value: any) => {
    setAccountValue({ ...accountValue, [key]: value });
  };

  const updateUserDatabase = (value: any) => {
    const storeData = value;
    storeData.Id = userData.Id;
    storeData.SessionToken = userData.SessionToken;
    console.log(storeData);
    dispatch(updateUserData(storeData));
  };

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    const storeData = { Password: accountValue.password };
    dispatch(userUpdate(storeData));
    updateUserDatabase(storeData);
  };

  return (

    <form onSubmit={handleSubmit} className="user-account">
      <div className="user-account__input user-account__input__account">
        <FormInput
          inputProps={{
            id: 'account',
            name: 'account',
            label: '帳號',
            placeholder: 'Enter your account',
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
            placeholder: 'Enter your account',
            pattern: PWD_REGEX,
            errorMessage: '密碼格式錯誤',
          }}
          onChange={handleChange}
          formValue={accountValue}
        />
      </div>
      <Button buttonType="submit" text="修改密碼" />
    </form>

  );
}

export default Account;
