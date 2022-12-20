import React, { useState } from 'react';
import Popup, { PopupDisplayType } from 'components/Popup';
import { FormDropDown } from 'components/Form';
import Problems from './Problems.json';

interface ProblemDataType {
  content: string;
  type: string | undefined;
}

interface ProblemReportType extends PopupDisplayType {}

function ProblemReport({ display, onClose } :ProblemReportType) {
  const [formValue,
    setFormValue] = useState<ProblemDataType>({ content: '', type: undefined });

  const handleChange = (key: any, value: any) => {
    setFormValue({
      ...formValue,
      [key]: value,
    });
  };

  return (
    <Popup
      display={display}
      onClose={onClose}
    >
      <form className="problem-report">
        <h2>請提供你遇到了什麼問題</h2>
        <FormDropDown
          id="problem-report-inpt"
          name="type"
          options={Problems.problems.map((problem: any) => problem.type)}
          value={formValue.type}
          onChange={handleChange}
        />
        <textarea
          className="problem-report__content"
          name="content"
          rows={4}
          placeholder="請問您遇到了什麼問題?"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </form>
    </Popup>
  );
}

export default ProblemReport;
