import React, { useState, useRef, useEffect } from 'react';
// hooks
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import useOutsideClick from 'hooks/event/useOutsideClick';
// style
import './index.scss';
// store
import Button from 'components/Button';
import {
  selectKeyword,
  addStorage,
} from 'store/searchPanel';
// component
import { MdDoubleArrow } from 'react-icons/md';
import SearchBar from 'components/Form/FormSearchBar';
import SearchTag from 'components/Form/FormSearchTag';
import { TagType } from 'components/Tag';
import { motion } from 'framer-motion';
import RecommendTag from './components/RecommendTag';
import SortTag from './components/SortTag';
import StorageTag from './components/StorageTag';

const searchPanelVariant = {
  fold: {
    height: '7.5em',
    transition: { type: 'tween' },
  },
  expend: {
    height: '100%',
    transition: {
      type: 'tween',
    },
  },
};

const searchPanelToggleVariant = {
  fold: {
    rotate: 90,
  },
  expend: {
    rotate: 270,
  },
};

// main function
function Search() {
  // setting redux hooks
  const keyword = useAppSelector(selectKeyword);
  const dispatch = useAppDispatch();
  const [expended, setExpended] = useState(true);
  const searchPanelRef = useRef<HTMLDivElement>(null);
  useOutsideClick(searchPanelRef, () => setExpended(false));

  const handleSuggestionClick = (clickedSuggestion: TagType) => {
    dispatch(addStorage(clickedSuggestion));
  };

  // handle search submit event and update keyword in searchValue
  const handleSearchSubmit = (inputValue: string) => {
    // TODO: fetch activity data by inputValue
    console.log(inputValue);
  };

  function handleWheel() {
    setExpended(false);
  }
  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // redux
  return (

    <motion.div
      ref={searchPanelRef}
      animate={expended ? 'expend' : 'fold'}
      className="search-panel"
      variants={searchPanelVariant}
      onWheel={handleWheel}
    >

      <div className="search-panel__container">
        {/* activity keyword search */}
        <div className="search-panel__keyword">
          <div className="search-panel__keyword__bar">
            <SearchBar
              onSubmit={handleSearchSubmit}
              placeholder="搜尋活動關鍵字"
              defaultText={keyword}
            />
          </div>
          <motion.div
            className="search-panel__toggle"
            animate={expended ? 'expend' : 'fold'}
            variants={searchPanelToggleVariant}
          >
            <Button
              variant={{ round: true }}
              iconAfter={<MdDoubleArrow />}
              onClick={() => setExpended(!expended)}

            />
          </motion.div>
        </div>

        {/* search tag box  */}
        <div className="search-panel__tag">

          {/* tag manage: search, recommend, storage */}
          <div className="search-panel__tag__manage">

            {/* tag searching */}
            <div className="search-panel__tag__manage__search">
              <SearchTag
                placeholder="搜尋活動標籤"
                onSuggestionClick={handleSuggestionClick}
              />
            </div>

            {/* recommend tag */}
            <div className="search-panel__tag__manage__recommend">
              <RecommendTag />
            </div>

            {/* tag stortage */}
            <div className="search-panel__tag__manage__storage">
              <StorageTag />
            </div>
          </div>
          {/* tag sorting */}
          <div className="search-panel__tag__sorting">
            <SortTag />
          </div>

        </div>

      </div>
    </motion.div>

  );
}

export default Search;
