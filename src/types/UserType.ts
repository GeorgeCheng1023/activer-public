export interface UserDataType {
  id: number,
  email: string,
  verify: boolean,
  realName: string,
  nickName: string,
  avatar: string,
  gender: string,
  birthday: string,
  profession: string,
  phone: string,
  county: string,
  area: string,
  activityHistory: Array<string>,
  tagHistory: Array<string>
}

export interface UserTokenType {
  accessToken: string,
  expireIn: number,
}

export interface UserAPIType {
  user: UserDataType,
  token: UserTokenType,
}

export interface UserRecord {
  id: number,
  content: string,
}
