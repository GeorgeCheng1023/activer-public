import React from 'react';
import './index.scss';
// import { FormTextArea } from '../../../components/Form/FormText';

/*eslint-disable*/
const handleChange = (event: any) => {
  console.log(event);
  /* eslint-enable */
};

function Basic() {
  return (
    <div className="user-basic user-basic__left">
      <div className="user-basic__img">
        <img
          src="https://images.unsplash.com/photo-1561495376-dc9c7c5b8726?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt="userHead"
        />
      </div>
      {/* <FormTextArea variant="default"
      labelText="暱稱" placeholder="狗勾" inputType="" value="" required onChange={handleChange} /> */}
    </div>
  );
}

export default Basic;
