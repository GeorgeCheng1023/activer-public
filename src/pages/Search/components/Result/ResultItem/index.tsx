import React from 'react';
import { SearchResultDataType } from 'types/ActivityDataType';
import Card from 'components/Card';
import { useParseArrayTagDataToTag } from 'hooks/tag';
import useConvertDate from 'hooks/date/useConvertDate';
import { Link } from 'react-router-dom';
import MainCardControl from 'components/Card/MainCardControl';

interface ResultItemType {
  result:SearchResultDataType
}

function ResultItem({ result } : ResultItemType) {
  const {
    id, tags, title, images, branches,
  } = result.activity;

  const firstDateStart = branches ? branches[0].dateStart : null;
  const firstDateEnd = branches
    ? branches[0].dateEnd
    : null;
  const cardDetail = firstDateEnd
&& firstDateStart
    ? `活動時間: \n${useConvertDate(firstDateStart[Object.keys(firstDateStart)[0]])} ~ ${useConvertDate(firstDateEnd[0])}`
    : null;

  return (
    <Link
      className="result__item"
      to={`/detail/${id}`}
      key={`result-${id}`}
    >
      <Card
        id={id.toString()}
        tags={tags ? useParseArrayTagDataToTag(tags) : []}
        title={title}
        imgUrl={images ? images[0] : '/DefaultActivityPng.png'}
        altText={title}
        detail={cardDetail}
        control={<MainCardControl />}
      />
    </Link>
  );
}

export default ResultItem;
