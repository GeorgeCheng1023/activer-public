import Button from 'components/Button';
import Tag from 'components/Tag';
import React, { useState, useEffect } from 'react';
import { BiSend } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import './index.scss';
import { TagDataType } from 'types/ActivityDataType';
import { useParseTagDataToTag } from 'hooks/tag';
import { motion } from 'framer-motion';
import dummySearchHistory from './dummySearchHistory.json';

interface SearchHistoryDataType {
  id: number,
  keyword: string,
  tags: TagDataType[],
  time: string,
}

function SearchHistory() {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheckList, setIsCheckList] = useState<number[]>([]);
  const [historyList, setHistoryList] = useState<SearchHistoryDataType[]>([]);

  useEffect(() => {
    setHistoryList(dummySearchHistory);
  }, []);

  const handleClickSelectAll:
  React.MouseEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setIsCheckAll(!isCheckAll);
    setIsCheckList(historyList.map((el) => el.id));

    if (isCheckAll) {
      setIsCheckList([]);
    }
  };

  const handleClickCheckbox:
  React.MouseEventHandler<HTMLInputElement> = (e) => {
    const { id, checked } = e.target as HTMLInputElement;

    setIsCheckList([...isCheckList, parseInt(id, 10)]);
    if (!checked) {
      setIsCheckList(isCheckList.filter((item) => item !== parseInt(id, 10)));
    }
  };

  return (
    <div className="search-history">

      <div className="search-history__head">
        <div className="search-history__checkbox">
          <input type="checkbox" onClick={handleClickSelectAll} checked={isCheckAll} />
        </div>
        <div className="search-history__keyword">關鍵字</div>
        <div className="search-history__tag">標籤</div>
        <div className="search-history__navigate">
          {' '}
          <Button
            variant={{ round: true }}
            iconBefore={<BsTrash />}
            color="white"
          />

        </div>
      </div>
      {historyList.map((item) => (
        <motion.div
          className="search-history__item"
          initial={{ x: '-100%', opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            type: 'tween',
          }}

        >
          <div className="search-history__checkbox">
            <input
              id={item.id.toString()}
              type="checkbox"
              checked={isCheckList.includes(item.id)}
              onClick={handleClickCheckbox}
            />
          </div>
          <div className="search-history__keyword">{item.keyword}</div>
          <div className="search-history__tag">
            {item.tags.map((tag) => {
              const parseTag = useParseTagDataToTag(tag);
              return (<Tag {...parseTag} />);
            })}
          </div>
          <div className="search-history__navigate">
            {' '}
            <Button
              iconBefore={<BiSend />}
              variant={{ round: true }}
              color="transparent"
            />

          </div>
        </motion.div>
      ))}

    </div>
  );
}

export default SearchHistory;
