import React from 'react';
import './index.scss';
// import FormText from '../../../components/Form/FormText';

function Basic() {
  return (
    <div className="user-basic user-basic__left">
      <div className="user-basic__img">
        <img
          src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="userHead"
        />
      </div>
      {/* <FormText formStyle='' labelText='暱稱' placeholder='狗勾' inputType=''/> */}
    </div>
  );
}

export default Basic;
