import React from 'react';
import { Link } from 'react-router-dom';

// components
import Button from 'components/Button';
import { FaComments, FaEdit } from 'react-icons/fa';

function HistoryControl() {
  return (
    <>
      <Button
        color="white"
        iconBefore={<FaComments />}
        text="評論"
        size="lg"
      />
      <Link to="/user/record">
        <Button
          color="white"
          iconBefore={<FaEdit />}
          text="心得記錄"
          size="lg"
        />
      </Link>
    </>
  );
}

export default HistoryControl;
