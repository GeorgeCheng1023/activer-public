import React, { useState, useCallback } from 'react';
import './index.scss';
import Button from 'components/Button';
import { FiSearch } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';

interface FormSearchBarType
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSubmit'> {
  onSubmit: (inputValue: string) => void,
  defaultText?: string
}

function FormSearchBar({
  onSubmit, defaultText, ...props
}: FormSearchBarType) {
  // inputValue is a string that text in a input
  const [inputValue, setInputValue] = useState(defaultText || '');
  // eslint-disable-next-line
  const [focused, setFocus] = useState(false);

  // handle submit search
  const handleSubmit:
  React.MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    e.preventDefault();
    onSubmit(inputValue);
  }, []);

  // handle input type change event
  const handleChange:
  React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  // handle keyboard press enter and search
  const handleKeyPress:
  React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
    if (e.key === 'Enter') {
      onSubmit(inputValue);
    }
  }, []);

  return (
    <div
      className="search-bar"
      onFocus={() => setFocus(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocus(false);
        }
      }}
    >
      <div className="search-bar__button">
        <Button
          disabled={props.disabled}
          type="submit"
          color="white"
          onClick={handleSubmit}
          variant={{ round: true }}
          iconAfter={<FiSearch />}
        />
      </div>
      <input
        {...props}
        className="search-bar__input"
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />

      {focused
      && (
        <div className="search-bar__buton">
          <Button
            type="button"
            color="white"
            onClick={() => setInputValue('')}
            iconAfter={<GrClose />}
            variant={{ round: true }}
          />
        </div>
      )}

    </div>
  );
}

FormSearchBar.defaultProps = {
  defaultText: undefined,
};

export default FormSearchBar;
