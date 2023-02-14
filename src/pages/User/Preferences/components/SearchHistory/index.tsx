import Button from 'components/Button';
import Tag from 'components/Tag';
import {
  Form, createSearchParams, useNavigate,
  useSubmit,
} from 'react-router-dom';
import useSetSearchParam from 'hooks/router/useSetSearchParam';
import useGetSearchParam from 'hooks/router/useGetSearchParam';
import React, { useEffect, useState } from 'react';
import { BiSend, BiSortAlt2 } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import './index.scss';
import { SearchHistoryResponseType } from 'types/Response';
import { SearchHistoryResultDataType } from 'types/ActivityDataType';
import { parseTagDataToTag } from 'utils/parseTag';
import { motion } from 'framer-motion';
import formatDateString from 'utils/convertDate';

interface SearchHistoryType {
  history: SearchHistoryResponseType['searchResultData'];
}

function SearchHistory({ history }: SearchHistoryType) {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheckList, setIsCheckList] = useState<number[]>([]);
  const navigate = useNavigate();
  const submit = useSubmit();
  const setSearchParam = useSetSearchParam();
  const orderBy = useGetSearchParam('orderBy', 'ascending');

  const handleClickSelectAll:
  React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setIsCheckAll(!isCheckAll);
  };

  useEffect(() => {
    if (!history) {
      return;
    }

    if (isCheckAll) {
      setIsCheckList(history.map((el) => el.id));
    } else {
      setIsCheckList([]);
    }
  }, [isCheckAll]);

  const handleClickCheckbox:
  React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, checked } = e.target as HTMLInputElement;
    setIsCheckList([...isCheckList, parseInt(id, 10)]);
    if (!checked) {
      setIsCheckList(isCheckList.filter((item) => item !== parseInt(id, 10)));
    }
  };

  const handleNavigate = (inputData : SearchHistoryResultDataType) => {
    navigate({
      pathname: '/search',
      search: `?${createSearchParams({
        keywords: inputData.keyword,
        tags: inputData.tags.map((tag) => tag.text),
      })}`,
    }, {
      replace: true,
    });
  };

  const handleClickDelete = () => {
    const formData = new FormData();
    formData.append('ids', JSON.stringify({ isCheckList }));
    submit(formData, { method: 'delete' });
  };

  const handleClickTimeSort = () => {
    if (orderBy === 'ascending') {
      setSearchParam('orderBy', 'descending');
    } else if (orderBy === 'descending') {
      setSearchParam('orderBy', 'ascending');
    }
  };

  return (
    <Form className="search-history" method="post">

      <div className="search-history__head search-history__col">
        <div className="search-history__checkbox">
          <input
            type="checkbox"
            onChange={handleClickSelectAll}
            checked={isCheckAll}
          />
        </div>
        <div className="search-history__keyword">關鍵字</div>
        <div className="search-history__tag">標籤</div>
        <div className="search-history__time">
          搜尋時間
          <Button
            iconBefore={<BiSortAlt2 />}
            variant={{ round: true }}
            color="white"
            type="button"
            className="search-history__sort"
            onClick={handleClickTimeSort}
          />

        </div>
        <div className="search-history__navigate">
          {' '}
          <Button
            variant={{ round: true }}
            iconBefore={<BsTrash />}
            type="button"
            color="white"
            onClick={handleClickDelete}
          />
        </div>
      </div>
      {
        history
          ? history.map((item) => (
            <motion.div
              className="search-history__item search-history__col"
              id={`search-history__item-${item.id}`}
              key={`search-history__item-${item.id}`}
              initial={{ x: '-10%', opacity: 0, backgroundColor: '#ffffff' }}
              whileInView={{ x: 0, opacity: 1 }}
              whileHover={{ backgroundColor: '#e3e3e3' }}
              transition={{
                type: 'tween',
              }}
              viewport={{
                once: true,
              }}
            >
              <div className="search-history__checkbox">
                <input
                  id={item.id.toString()}
                  type="checkbox"
                  checked={isCheckList.includes(item.id)}
                  onChange={handleClickCheckbox}
                />
              </div>
              <div className="search-history__keyword">{item.keyword}</div>
              <div className="search-history__tag">
                {item.tags.map((tag) => {
                  const parseTag = parseTagDataToTag(tag);
                  return (
                    <Tag
                      {...parseTag}
                      key={`search-history-${item.id}-tag-${tag.id}`}
                    />
                  );
                })}
              </div>
              <div className="search-history__time">
                {formatDateString(item.createAt)}
              </div>
              <div className="search-history__navigate">
                {' '}
                <Button
                  iconBefore={<BiSend />}
                  variant={{ round: true }}
                  type="button"
                  color="transparent"
                  onClick={() => handleNavigate(item)}
                />

              </div>
            </motion.div>
          ))
          : (
            <div className="search-history__placeorder">
              無搜尋紀錄
            </div>
          )
      }
    </Form>
  );
}

export default SearchHistory;
