import React, { useState } from 'react';
import FormInput from 'components/Form/FormInput';
import Button from 'components/Button';
import './index.scss';
import { useAppSelector } from 'hooks/redux';
import { getUserData } from 'store/userAuth';
// import dummyAccountData from './dummyAccountData.json';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { apiUserLogin, apiUserVerifyAndChangePwd } from 'api/axios';

function Account() {
  const nevigate = useNavigate();
  const userData = useAppSelector(getUserData);
  const [accountValue, setAccountValue] = useState(userData);
  const [cookies] = useCookies<string>(['user']);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (key: any, value: any) => {
    setAccountValue({ ...accountValue, [key]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    try {
      await apiUserLogin({ email: userData.email, password: accountValue.password });
      const response = await apiUserVerifyAndChangePwd(cookies.sessionToken);
      console.log(response);
      nevigate('/email/verify');
    } catch (err: any) {
      if (!err?.response) {
        console.log('伺服器無回應');
      } else if (err.response.status === 401) {
        console.log('帳號或密碼有誤');
      } else {
        console.log('伺服器懶蛋');
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="user-account">
      <h2>帳號安全</h2>
      <div className="user-account__input user-account__input__account">
        <FormInput
          id="account"
          name="account"
          label="帳號"
          placeholder={userData.email}
          onChange={handleChange}
          disabled
          formValue={accountValue}
        />
      </div>
      <div className="user-account__input user-account__input__password">
        <FormInput
          id="password"
          name="password"
          label="密碼"
          type="password"
          onChange={handleChange}
          formValue={accountValue}
          placeholder="輸入密碼"
          pattern={userData.password}
          errorMessage="密碼錯誤"
        />
      </div>
      {loading
        ? <div className="user-account__button-load-animation" />
        : (
          <Button
            type="submit"
            text="更改密碼"
          />
        )}
    </form>

  );
}

export default Account;
