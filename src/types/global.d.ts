export { };

declare global {

  type FormTextProp = {
    formStyle: 'default' | 'heroForm' | 'disabled' | 'withButton' | 'withoutLabel';
    labelText: string;
    placeholder: string;
    inputType: string;
    value: string;
    required: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    buttonText?: string;
  };

  interface userLogin {
    email: string,
    password: string,
  }

  interface User {
    id: number,
    realName?: string,
    nickName?: string,
    email?: string,
    avatar?: string,
    gender?: string,
    birthday?: string,
    profession?: string,
    phone?: string,
    country?: string,
    area?: string,
    activityHistory?: Array<number>,
    tagHistory?: Array<number>,
    status: number;
    sessionToken: string, // auth
  }

}
