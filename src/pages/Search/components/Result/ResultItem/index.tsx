import React from 'react';
import { SearchResultDataType } from 'types/ActivityDataType';
import Card from 'components/Card';
import { useParseArrayTagDataToTag } from 'hooks/tag';
import useConvertDate from 'hooks/date/useConvertDate';
import { Link } from 'react-router-dom';

interface ResultItemType {
  result:SearchResultDataType
}

function ResultItem({ result } : ResultItemType) {
  const {
    id, tags, title, images, branches,
  } = result;

  const firstDateStart = branches ? branches[0].dateStart : null;
  const firstDateEnd = branches
    ? branches[0].dateEnd
    : null;
  const cardDetail = firstDateEnd
&& firstDateStart
    ? `${useConvertDate(firstDateStart[Object.keys(firstDateStart)[0]])} ~ ${useConvertDate(firstDateEnd[0])}`
    : null;

  return (
    <Link
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
      />
    </Link>
  );
}

export default ResultItem;
