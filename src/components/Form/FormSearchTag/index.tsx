import React, { useState } from 'react';
import './index.scss';
import { FiSearch } from 'react-icons/fi';
// hooks
import { useParseTagDataArray } from 'hooks/tag';

// data
import { TagType } from 'components/Tag';
import dummyAllTags from './dummyAllTag.json';

type Props = {

  placeHolder: string,
  disabled?: boolean,
  onSuggestionClick: (clickedSuggestion: TagType) => void
};

function FormSearchBar({
  placeHolder, disabled, onSuggestionClick,
}: Props) {
  // parse all tags for suggestion
  const allTags = useParseTagDataArray(dummyAllTags);
  // inputValue is a string that text in a input
  const [inputValue, setInputValue] = useState('');
  // suggstionDisplay is a boolean that show or hide the suggestion
  const [suggestionDisplay, setSuggestionDisplay] = useState(false);

  // handle input type change event
  const handleChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSuggestionDisplay(true);
    setInputValue(e.target.value);
  };

  // handle blur event when click outside of suggestion
  const handleBlur:React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (!e.relatedTarget) {
      setSuggestionDisplay(false);
    }
  };

  const handleSuggestionClick = (clickedTag: TagType) => {
    onSuggestionClick(clickedTag);
    setSuggestionDisplay(false);
  };

  return (
    <div
      className="search-tag"
    >
      <input
        className="search-tag__input"
        type="text"
        placeholder={placeHolder}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
      />
      <button
        className="search-tag__button"
        type="submit"
        disabled={disabled}
      >
        <FiSearch className="search-tag__icon" />
      </button>

      <div className="search-tag__suggestion">
        {suggestionDisplay && inputValue
          && allTags.filter((tag) => (
            tag.text.includes(inputValue)
          ))
            .slice(0, 5)
            .map((tag, index: number) => (
              <button
                tabIndex={-1}
                type="button"
                className="search-tag__suggestion__choice"
                onClick={() => handleSuggestionClick(tag)}
                key={`suggestion-${index}`}
              >
                {tag.text}
              </button>
            ))}
      </div>
    </div>
  );
}

FormSearchBar.defaultProps = {
  disabled: false,
};

export default FormSearchBar;
