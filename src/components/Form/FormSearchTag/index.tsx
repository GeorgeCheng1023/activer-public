import React, { useState } from 'react';
import './index.scss';
import { FiSearch } from 'react-icons/fi';
// hooks
import { useParseTag } from 'hooks/tag';
import { useAppDispatch } from 'hooks/redux';
// store
import { addStorage } from 'store/searchPanel';

// data
import { TagType } from 'components/Tag';
import dummyAllTags from './dummyAllTag.json';

type Props = {

  placeHolder: string,
  disabled?: boolean
};

function FormSearchBar({
  placeHolder, disabled,
}: Props) {
  // setting redux hooks
  const dispatch = useAppDispatch();

  // parse all tags for suggestion
  const allTags = useParseTag(dummyAllTags);

  // inputValue is a string that text in a input
  const [inputValue, setInputValue] = useState('');
  // suggstionDisplay is a boolean that show or hide the suggestion
  const [suggestionDisplay, setSuggestionDisplay] = useState(false);

  // handle input type change event
  const handleChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSuggestionDisplay(true);
    setInputValue(e.target.value);
  };

  // handle search suggestion click
  const handleSuggestionClick = (clickSuggestion: TagType) => {
    dispatch(addStorage(clickSuggestion));
    setSuggestionDisplay(false);
  };

  // handle blur event when click outside of suggestion
  const handleBlur:React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (!e.relatedTarget) {
      setSuggestionDisplay(false);
    }
  };

  return (
    <div
      className="searchBar__container"
    >
      <div className="searchBar">
        <input
          className="searchBar__main"
          type="text"
          placeholder={placeHolder}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
        />
        <button className="button-nostyle searchButton" type="submit">
          <div className={`searchBar__section ${disabled || ''}`}>
            <FiSearch className="searchBar__icon" />
          </div>
        </button>
      </div>
      <div className="suggestion">
        {suggestionDisplay && inputValue
          && allTags.filter((tag) => (
            tag.text.includes(inputValue)
          ))
            .slice(0, 5)
            .map((tag, index: number) => (
              <button
                tabIndex={-1}
                type="button"
                className="suggestion__choice"
                onClick={(e) => { e.preventDefault(); handleSuggestionClick(tag); }}
                // eslint-disable-next-line react/no-array-index-key
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
