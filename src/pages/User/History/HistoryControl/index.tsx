import React from 'react';

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
      <Button
        color="white"
        iconBefore={<FaEdit />}
        text="心得記錄"
        size="lg"
      />
    </>
  );
}

export default HistoryControl;
