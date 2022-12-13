import React from 'react';
import { CardColumn, CardType } from 'components/Card';
import ManageCardControl, { ManageCardControlProps } from '../ManageCardControl';

interface Props extends CardType, ManageCardControlProps {
  title: string;
}

function ManageActivityItem({
  imgUrl,
  title,
  tags,
  altText,
  detail,
  beginDate,
  applyEndDate,
}: Props) {
  return (
    <div className="manage__item">
      <CardColumn
        imgUrl={imgUrl}
        altText={altText}
        title={title}
        tags={tags}
        detail={detail}
        control={(
          <ManageCardControl
            beginDate={beginDate}
            applyEndDate={applyEndDate}
          />
        )}
      />
    </div>
  );
}

export default ManageActivityItem;
