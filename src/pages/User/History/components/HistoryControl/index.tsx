import React from 'react';
// import { Link } from 'react-router-dom';

// components
import Button from 'components/Button';
import { FaComments } from 'react-icons/fa';
import './index.scss';

function HistoryControl() {
  return (
    <div className="history-control">
      <Button
        color="white"
        iconBefore={<FaComments />}
        text="評論"
      />
      {/* <Link to="/user/record">
        <Button
          color="white"
          iconBefore={<FaEdit />}
          text="心得記錄"
        />
      </Link> */}
    </div>
  );
}

export default HistoryControl;
