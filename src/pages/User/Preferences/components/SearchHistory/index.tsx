import Button from 'components/Button';
import Tag from 'components/Tag';
import React, { useState } from 'react';
import { BiSend } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import './index.scss';
import { SearchHistoryResponseType } from 'types/ActivityDataType';
import { parseTagDataToTag } from 'utils/parseTag';
import { motion } from 'framer-motion';
import { createSearchParams, useNavigate } from 'react-router-dom';
import formatDateString from 'utils/convertDate';

interface SearchHistoryType {
  history: SearchHistoryResponseType[];
}

function SearchHistory({ history }: SearchHistoryType) {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheckList, setIsCheckList] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleClickSelectAll:
  React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setIsCheckAll(!isCheckAll);
    setIsCheckList(history.map((el) => el.id));

    if (isCheckAll) {
      setIsCheckList([]);
    }
  };

  const handleClickCheckbox:
  React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, checked } = e.target as HTMLInputElement;

    setIsCheckList([...isCheckList, parseInt(id, 10)]);
    if (!checked) {
      setIsCheckList(isCheckList.filter((item) => item !== parseInt(id, 10)));
    }
  };

  const handleNavigate = (inputData : SearchHistoryResponseType) => {
    navigate({
      pathname: '/search',
      search: `?${createSearchParams({
        keywords: inputData.keyword,
        tags: inputData.tags.map((tag) => tag.text),
      })}`,
    });
  };

  return (
    <div className="search-history">

      <div className="search-history__head search-history__col">
        <div className="search-history__checkbox">
          <input type="checkbox" onChange={handleClickSelectAll} checked={isCheckAll} />
        </div>
        <div className="search-history__keyword">關鍵字</div>
        <div className="search-history__tag">標籤</div>
        <div className="search-history__time">搜尋時間</div>
        <div className="search-history__navigate">
          {' '}
          <Button
            variant={{ round: true }}
            iconBefore={<BsTrash />}
            color="white"
          />
        </div>
      </div>
      {history.map((item) => (
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
              color="transparent"
              onClick={() => handleNavigate(item)}
            />

          </div>
        </motion.div>
      ))}

    </div>
  );
}

export default SearchHistory;
