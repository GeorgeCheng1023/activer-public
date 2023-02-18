import React, { useState } from 'react';
import FormInput from 'components/Form/FormInput';
import Button from 'components/Button';
import './index.scss';
import { useAppSelector } from 'hooks/redux';
import { getUserData } from 'store/userAuth';
// import dummyAccountData from './dummyAccountData.json';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { apiUserLogin, apiUserVerifyAndChangePwd } from 'api/user';
import { Alert, Fade } from '@mui/material';

const PWD_REGEX_STR = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$';

function Account() {
  const nevigate = useNavigate();
  const userData = useAppSelector(getUserData);

  const initAccountType = {
    account: userData.email,
    password: '',
  };

  const [accountValue, setAccountValue] = useState(initAccountType);
  const [cookies] = useCookies<string>(['user']);
  const [errMsg, setErrMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (key: any, value: any) => {
    setAccountValue({ ...accountValue, [key]: value });
    setErrMsg('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    try {
      await apiUserLogin(userData.email, accountValue.password);
      const response = await apiUserVerifyAndChangePwd(cookies.sessionToken);
      console.log(response);
      nevigate('/email/loading');
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg('伺服器無回應');
      } else if (err.response.status === 401) {
        setErrMsg('密碼錯誤');
      } else {
        setErrMsg('伺服器懶蛋');
      }
    }
    setLoading(false);
  };

  return (
    <div className="user-account">
      <div className="user-account__err-msg-section">
        <Fade in={errMsg !== ''}>
          <Alert severity="error">
            <div className="user-account__err-msg">{errMsg}</div>
          </Alert>
        </Fade>
      </div>

      <h2>帳號安全</h2>
      <form onSubmit={handleSubmit} className="user-account__form">
        <div className="user-account__input user-account__input__account">
          <FormInput
            id="account"
            name="account"
            label="帳號"
            placeholder={userData.email || 'errors'}
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
            placeholder="Enter your password"
            pattern={PWD_REGEX_STR}
            errorMessage="密碼錯誤"
          />
        </div>
        {loading
          ? <div className="user-account__button-load-animation" />
          : (
            <Button
              type="submit"
              text="驗證"
            />
          )}
      </form>
    </div>
  );
}

export default Account;
