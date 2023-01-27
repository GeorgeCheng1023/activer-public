import React, { useRef, useEffect } from 'react';
// hooks
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import useOutsideClick from 'hooks/event/useOutsideClick';
// style
import './index.scss';
// component
import Button from 'components/Button';
import { MdDoubleArrow } from 'react-icons/md';
import SearchBar from 'components/Form/FormSearchBar';
import SearchTag from 'components/Form/FormSearchTag';
import { TagType } from 'components/Tag';
import { motion } from 'framer-motion';
import { searchActivity } from 'api/activity';
import {
  selectKeyword,
  addStorage,
  selectSortTags,
  setKeyword,
  setResults,
  fold,
  selectExpended,
  toggle,
  expend,
} from 'store/searchPanel';
import RecommendTag from './components/RecommendTag';
import SortTag from './components/SortTag';
import StorageTag from './components/StorageTag';
// motion variants
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

function Search() {
  // hooks init
  const dispatch = useAppDispatch();
  const keyword = useAppSelector(selectKeyword);
  const sortTags = useAppSelector(selectSortTags);
  const expended = useAppSelector(selectExpended);
  const searchPanelRef = useRef<HTMLDivElement>(null);

  // Fold when click outside of SearchPanel or mouse wheeling
  useOutsideClick(searchPanelRef, () => dispatch(fold));
  function handleWheel() {
    dispatch(fold());
  }

  // HANDLER: TagSearch suggestion click and add to storage
  const handleSuggestionClick = (clickedSuggestion: TagType) => {
    dispatch(addStorage(clickedSuggestion));
  };

  // HANDLER: submit, and update result
  const handleSearchSubmit = async (inputValue: string) => {
    dispatch(fold());
    dispatch(setKeyword(inputValue));
    try {
      const res = await searchActivity(keyword, sortTags.map((tag) => tag.text));
      dispatch(setResults(res.data));
    } catch (e) {
      console.error(e);
    }
  };

  // Add wheel handler to window
  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (

    <motion.div
      ref={searchPanelRef}
      animate={expended ? 'expend' : 'fold'}
      className="search-panel"
      variants={searchPanelVariant}
    >

      <div className="search-panel__container">
        {/* activity keyword search */}
        <div className="search-panel__keyword">
          <div className="search-panel__keyword__bar">
            <SearchBar
              onSubmit={handleSearchSubmit}
              placeholder="搜尋活動關鍵字"
              value={keyword}
              onClick={() => dispatch(expend())}
              autoFocus
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
              onClick={() => dispatch(toggle())}
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
