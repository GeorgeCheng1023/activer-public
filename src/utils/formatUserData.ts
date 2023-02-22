import { UserDataType } from 'types/UserType';

export default function formatUserData(userData: UserDataType) {
  const newUserData = {
    ...userData,
    avatar: process.env.REACT_APP_SERVER_URL?.concat(userData.avatar) || userData.avatar,
    birthday: userData.birthday.split('T')[0],
  };
  return newUserData;
}
