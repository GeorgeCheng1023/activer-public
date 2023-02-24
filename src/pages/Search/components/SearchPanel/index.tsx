import React, { useRef } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { AiOutlineHistory } from 'react-icons/ai';
import { getUserIsLoggedIn } from 'store/auth';
import useOutsideClick from 'hooks/event/useOutsideClick';
import Button from 'components/Button';
import { MdDoubleArrow } from 'react-icons/md';
import SearchBar from 'components/Form/FormSearchBar';
import SearchTag from 'components/Form/FormSearchTag';
import { TagType } from 'components/Tag';
import { motion } from 'framer-motion';
import './index.scss';
import {
  addStorage,
  fold,
  selectExpended,
  toggle,
  expend,
  setKeyword,
  selectSortTags,
} from 'store/searchPanel';
import {
  Form, useSearchParams,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { SearchLoaderType } from 'types/Loader';
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
  const expended = useAppSelector(selectExpended);
  const sortTags = useAppSelector(selectSortTags);
  const searchPanelRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const loaderData = useLoaderData() as SearchLoaderType;
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(getUserIsLoggedIn);

  // Fold when click outside of SearchPanel
  useOutsideClick(searchPanelRef, () => dispatch(fold()));

  // HANDLER: TagSearch suggestion click and add to storage
  const handleSuggestionClick = (clickedSuggestion: TagType) => {
    dispatch(addStorage(clickedSuggestion));
  };

  const handleSearchSubmit = (inputValue: string) => {
    dispatch(fold());
    dispatch(setKeyword(inputValue));
    const params = new URLSearchParams();
    params.append('keywords', inputValue);
    sortTags.forEach((tag) => {
      params.append('tags', tag.text);
    });
    setSearchParams(params);
  };

  return (
    <Form
      id="search-panel"
      role="search"
    >

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
                onClick={() => dispatch(expend())}
                autoFocus
                defaultValue={loaderData.keywords || ''}
                name="keywords"
              />
            </div>

            <div
              className="search-panel__control"
            >
              <Button
                color="secondary"
                type="button"
                onClick={() => {
                  if (!isLoggedIn) {
                    navigate('/login');
                  } else {
                    navigate('/user/preferences');
                  }
                }}
                iconBefore={<AiOutlineHistory />}
                variant={{ round: true }}
              />
              <motion.div
                animate={expended ? 'expend' : 'fold'}
                variants={searchPanelToggleVariant}
              >
                <Button
                  variant={{ round: true }}
                  iconAfter={<MdDoubleArrow />}
                  onClick={() => dispatch(toggle())}
                  type="button"
                />
              </motion.div>
            </div>
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
    </Form>

  );
}

export default Search;
