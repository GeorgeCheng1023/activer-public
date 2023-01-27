import React, {
  useState, useCallback, useRef, useEffect,
} from 'react';
import classNames from 'classnames';
// component
import { TagType } from 'components/Tag';
import { FiSearch } from 'react-icons/fi';
import Button from 'components/Button';
// style
import './index.scss';
import { TagDataType } from 'types/ActivityDataType';
import { useParseTagDataToTag } from 'hooks/tag';
import { getAllTags } from 'api/tag';

interface FormSearchTagType extends React.InputHTMLAttributes<HTMLInputElement> {
  onSuggestionClick: (clickedSuggestion: TagType) => void
}

function FormSearchTag({
  onSuggestionClick, ...props
}: FormSearchTagType) {
  // INIT: state
  const [allTags, setAllTags] = useState<TagDataType[]>([]);
  const [suggestionDisplay, setSuggestionDisplay] = useState(false);
  const [suggestionTags, setSuggestionTags] = useState<JSX.Element[] | null>();
  const [currentFocusSuggestionIndex, setCurrentSuggestionIndex] = useState(-1);
  const inputValueRef = useRef<HTMLInputElement>(null);

  // API: get all tags
  useEffect(() => {
    const dataFetch = async () => {
      try {
        const res = await getAllTags();
        setAllTags(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    dataFetch();
  }, []);

  // HANDLER: suggestion click
  const handleSuggestionClick = useCallback((clickedTag: TagType) => {
    onSuggestionClick(clickedTag); // call parent function
    setSuggestionDisplay(false); // hide suggestion
    inputValueRef.current!.value = clickedTag.text; // update input value
  }, []);

  // FUNCTION: filter tag and render
  const filterTag = (value: string):JSX.Element[] | null => {
    // if value is empty
    if (value === '') {
      return null;
    }
    return (
      allTags
        .filter((tag) => (tag.text.includes(value))) // if tag include tag.text
        .map((tag, index: number) => (
          <input
            className="search-tag__suggestion__choice"
            id={`search-tag-suggestion-${index}`}
            key={tag.id}
            tabIndex={-1}
            type="button"
            onClick={() => handleSuggestionClick(useParseTagDataToTag(tag))}
            value={tag.text}
            data-variant={tag.type}
            data-id={tag.id}
            data-text={tag.text}
          />
        ))
    );
  };

  // HANDLER: change
  const handleChange:
  React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // show suggestion
    setSuggestionDisplay(true);
    // set suggesion index
    setCurrentSuggestionIndex(-1);
    // filter tag
    setSuggestionTags(
      filterTag(e.target.value)?.length === 0 // if no tags are filtered
        ? null
        : filterTag(e.target.value),
    );
  };

  useEffect(() => {
    console.log(suggestionTags);
  }, [suggestionTags]);

  // HANDLER: blur
  const handleBlur:
  React.FocusEventHandler<HTMLInputElement> = useCallback((e) => {
    if (!e.relatedTarget) {
      setSuggestionDisplay(false);
    }
  }, []);
  // HANDLER: focus
  const handleFocus:
  React.FocusEventHandler<HTMLInputElement> = useCallback((e) => {
    if (!e.relatedTarget) {
      setSuggestionDisplay(true);
    }
  }, []);

  // HANDLER: key down
  const handleKeyDown:
  React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
    //  find the suggestion currently focused
    const currentFocusSuggestion = document.getElementById(`search-tag-suggestion-${currentFocusSuggestionIndex}`);

    // Arrow Down: set suggestion index to next
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentFocusSuggestion) {
        currentFocusSuggestion.classList.remove('selected');
      }
      let newIndex = currentFocusSuggestionIndex + 1;
      const suggestionLength = suggestionTags ? suggestionTags.length : 0;
      if (newIndex === suggestionLength) {
        newIndex = 0;
      }
      setCurrentSuggestionIndex(newIndex);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentFocusSuggestion) {
        currentFocusSuggestion.classList.remove('selected');
      }

      let newIndex = currentFocusSuggestionIndex - 1;
      const suggestionLength = suggestionTags ? suggestionTags.length : 0;
      if (newIndex < 0) {
        newIndex = suggestionLength - 1;
      }
      setCurrentSuggestionIndex(newIndex);
    } else if (e.key === 'Enter') {
      e.preventDefault();

      if (inputValueRef.current && currentFocusSuggestion) {
        inputValueRef.current.value = (currentFocusSuggestion as HTMLInputElement).value;
        handleSuggestionClick({
          id: currentFocusSuggestion.getAttribute('data-id') as string,
          text: currentFocusSuggestion.getAttribute('data-text') as string,
          type: currentFocusSuggestion.getAttribute('data-variant') as TagType['type'],
        });
      }
    }

    /**
     * if the suggestion only had 1 result,
     * then set suggestion index to that result
     */
    if (suggestionTags?.length === 1) {
      setCurrentSuggestionIndex(0);
    }
  }, [currentFocusSuggestionIndex, suggestionTags]);

  // EFFECT: to append background-color to selected suggestion
  useEffect(() => {
    const focusSuggestion = document.getElementById(`search-tag-suggestion-${currentFocusSuggestionIndex}`);
    if (focusSuggestion) {
      focusSuggestion.classList.add('selected');
    }
  }, [currentFocusSuggestionIndex, setCurrentSuggestionIndex]);

  // className
  const searchTagClassNames = classNames({
    'search-tag': true,
    'search-tag--expend': suggestionDisplay && suggestionTags,
  });
  const suggestionClassNames = classNames({
    'search-tag__suggestion': true,
    'search-tag__suggestion--expend': suggestionDisplay && suggestionTags,
  });

  return (
    <div
      className={searchTagClassNames}
    >
      <div className="search-tag__button">
        <Button
          iconAfter={<FiSearch />}
          color="white"
          variant={{ round: true }}
        />
      </div>
      <input
        {...props}
        ref={inputValueRef}
        className="search-tag__input"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />

      {suggestionDisplay && suggestionTags
      && (
        <div className={suggestionClassNames}>{suggestionTags}</div>
      )}
    </div>
  );
}
export default FormSearchTag;
