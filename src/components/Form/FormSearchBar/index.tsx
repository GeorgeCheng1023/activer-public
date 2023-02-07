import React, { useState, useEffect } from 'react';
import './index.scss';
import Button from 'components/Button';
import { FiSearch } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';

interface FormSearchBarType
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onSubmit'> {
  defaultValue: string;
  onSubmit: (inputValue: string) => void;
}

function FormSearchBar({
  defaultValue, onSubmit, ...props
}: FormSearchBarType) {
  // inputValue is a string that text in a input
  const [inputValue, setInputValue] = useState('');
  const [focused, setFocus] = useState(false);
  // handle input type change event
  const handleChange:
  React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown:
  React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSubmit(inputValue);
    }
  };
  useEffect(() => {
    setInputValue(defaultValue);
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
          type="button"
          color="white"
          variant={{ round: true }}
          iconAfter={<FiSearch />}
          onClick={() => onSubmit(inputValue)}
        />
      </div>
      <input
        {...props}
        className="search-bar__input"
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
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

export default FormSearchBar;
