import React, { useState } from 'react';
import FormInput from 'components/Form/FormInput';
import Button from 'components/Button';
import './index.scss';
import { useAppDispatch } from 'hooks/redux';
import { userUpdate } from 'store/userAuth';
import dummyAccountData from './dummyAccountData.json';

function Account() {
  const [accountValue, setAccountValue] = useState(dummyAccountData);
  const dispatch = useAppDispatch();

  const handleChange = (key: any, value: any) => {
    setAccountValue({ ...accountValue, [key]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(userUpdate({ Password: accountValue.password }));
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
