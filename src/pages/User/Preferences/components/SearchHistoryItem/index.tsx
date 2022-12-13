import React from 'react';
// component
import Tag, { TagType } from 'components/Tag';
import { BiSend } from 'react-icons/bi';
import { TagDataType } from 'types/ActivityDataType';
import Button from 'components/Button';
// redux
import { addHistoryTags, setKeyword } from 'store/searchPanel';
import { useAppDispatch } from 'hooks/redux';
import { useParseTag } from 'hooks/tag';
// style
import './index.scss';

export interface HistoryDataType {

  Keyword: string;
  Tags: TagDataType[];

}

interface Props {
  data: HistoryDataType
}

function SearchHistoryItem({ data } : Props) {
  const dispatch = useAppDispatch();

  const handleSearchHistory = (tags: TagDataType[], keyword: string) => {
    const parseTag: TagType[] = tags.map((tag) => useParseTag(tag));
    dispatch(addHistoryTags(parseTag));
    dispatch(setKeyword(keyword));
    // TODO: search activity
  };

  return (
    <div className="search-history-item">
      <span className="search-history-item__keyword">{data.Keyword}</span>
      <div className="search-history-item__tags">
        {data.Tags.map((tag) => (
          <Tag
            text={tag.Text}
            id={tag.Id.toString()}
            variant={tag.Type as TagType['variant']}
            key={`search-history-item__tags-${tag.Id.toString()}`}
            disabled
          />
        ))}
      </div>
      <Button
        variant="outline"
        text="前往搜尋"
        iconAfter={<BiSend />}
        color="success"
        onClick={(e) => {
          e.preventDefault();
          handleSearchHistory(data.Tags, data.Keyword);
        }}
      />
    </div>
  );
}

export default SearchHistoryItem;
