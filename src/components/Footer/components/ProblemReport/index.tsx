import React, { useRef } from 'react';
import { FormDropDown } from 'components/Form';
import { BiSend } from 'react-icons/bi';
import Button from 'components/Button';
import Problems from './Problems.json';
import './index.scss';

function ProblemReport() {
  const typeRef = useRef(Problems.problems[0].type);
  const contentRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  // eslint-disable-next-line
  const handleDropDownChange = (key: string, value: string) => {
    typeRef.current = value;
  };

  const handleSubmit
  :React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    console.log(typeRef.current, contentRef.current.value);
  };

  return (

    <form className="problem-report">
      <h2>請問您遇到了什麼問題?</h2>
      <div className="problem-report__type">
        <FormDropDown
          id="problem-report-dropdown"
          name="type"
          options={Problems.problems.map((problem: any) => problem.type)}
          descriptions={Problems.problems.map((problem: any) => problem.description)}
          onChange={handleDropDownChange}
        />
      </div>
      <textarea
        ref={contentRef}
        className="problem-report__content"
        name="content"
        rows={10}
        placeholder="請詳細描述您的問題"
      />
      <div className="problem-report__control">
        <Button
          type="submit"
          text="送出"
          color="primary"
          iconAfter={<BiSend />}
          onClick={handleSubmit}
        />
        <Button
          text="取消"
          color="primary"
          variant={{ outline: true }}
          onClick={(e) => {
            e.preventDefault();
          }}
        />
      </div>
    </form>

  );
}

export default ProblemReport;
