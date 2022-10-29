import React, { useState } from 'react';
import './index.scss';
import FormInput from '../../../components/Form/FormInput';
import Button from '../../../components/Button';
import dummyUserData from './dummyUserData.json';

type inputType = {
  id: number,
  name: string,
  label: string,
  type: 'text' | 'password' | 'email',
  placeholder: string,
  errorMessage?: string,
  required?: boolean,
  pattern?: string,
};

const inputs: Array<inputType> = [{
  id: 0,
  name: 'nickname',
  label: '暱稱',
  type: 'text',
  placeholder: '暱稱',
  errorMessage: '暱稱只能接受2-16中,英文,數字',
  pattern: '[\u4E00-\u9FFFA-Za-z0-9]{2,16}',
  required: true,
}, {
  id: 1,
  name: 'location',
  label: '居住地',
  type: 'text',
  placeholder: '居住地',
},
];

function Basic() {
  const [values, setValues] = useState(dummyUserData);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    /*eslint-disable*/
    console.log(event)
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  /* eslint-enable */

  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          label={input.label}
          placeholder={input.placeholder}
          value={values[input.name as keyof typeof values]}
          pattern={input.pattern}
          errorMessage={input.errorMessage}
          name={input.name}
          onChange={handleChange}
          required={input.required}
        />
      ))}
      <Button buttonType="submit" text="確認修改" />
    </form>
  );
}

export default Basic;
