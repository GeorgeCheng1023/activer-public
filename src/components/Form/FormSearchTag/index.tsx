import React, { useState, useCallback } from 'react';
// component
import { TagType } from 'components/Tag';
import { FiSearch } from 'react-icons/fi';
import Button from 'components/Button';
// hooks
import { useParseTagDataArray } from 'hooks/tag';

// style
import './index.scss';
import dummyAllTags from './dummyAllTag.json';

interface FormSearchTagType extends React.InputHTMLAttributes<HTMLInputElement> {
  onSuggestionClick: (clickedSuggestion: TagType) => void
}

function FormSearchBar({
  onSuggestionClick, ...props
}: FormSearchTagType) {
  // parse all tags for suggestion
  // TODO: fetch all tags
  const allTags = useParseTagDataArray(dummyAllTags);
  // inputValue is a string that text in a input
  const [inputValue, setInputValue] = useState('');
  // suggstionDisplay is a boolean that show or hide the suggestion
  const [suggestionDisplay, setSuggestionDisplay] = useState(false);

  // handle input type change event
  const handleChange:
  React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setSuggestionDisplay(true);
    setInputValue(e.target.value);
  }, []);

  // handle blur event when click outside of suggestion
  const handleBlur:
  React.FocusEventHandler<HTMLInputElement> = useCallback((e) => {
    if (!e.relatedTarget) {
      setSuggestionDisplay(false);
    }
  }, []);

  // submit clicked Tag
  const handleSuggestionClick = useCallback((clickedTag: TagType) => {
    onSuggestionClick(clickedTag);
    setSuggestionDisplay(false);
  }, []);

  return (
    <div
      className="search-tag"
    >
      <input
        {...props}
        className="search-tag__input"
        type="text"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div className="search-tag__button">
        <Button
          iconAfter={<FiSearch />}
          variant={{ round: true }}
        />
      </div>
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
export default FormSearchBar;
