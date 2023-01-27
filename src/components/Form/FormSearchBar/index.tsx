import React, { useState, useCallback } from 'react';
import './index.scss';
import Button from 'components/Button';
import { FiSearch } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';

interface FormSearchBarType
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onSubmit'> {
  value: string;
  onSubmit: (value: string) => void;
}

function FormSearchBar({
  value, onSubmit, ...props
}: FormSearchBarType) {
  // inputValue is a string that text in a input
  const [inputValue, setInputValue] = useState(value);
  const [focused, setFocus] = useState(false);

  const handleSubmit = () => {
    onSubmit(inputValue);
  };

  // handle input type change event
  const handleChange:
  React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleKeyDown:
  React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

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
          variant={{ round: true }}
          iconAfter={<FiSearch />}
          onClick={handleSubmit}
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
