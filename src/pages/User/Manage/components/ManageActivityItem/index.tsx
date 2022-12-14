import React from 'react';
import { CardRow } from 'components/Card';
import { CardRowType } from 'types/components/Card';
import ManageCardControl, { ManageCardControlProps } from '../ManageCardControl';

interface Props extends CardRowType, ManageCardControlProps {
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
  status,
}: Props) {
  return (
    <div className="manage__item">
      <CardRow
        imgUrl={imgUrl}
        altText={altText}
        title={title}
        tags={tags}
        detail={detail}
        control={(
          <ManageCardControl
            beginDate={beginDate}
            applyEndDate={applyEndDate}
            status={status}
          />
        )}
      />
    </div>
  );
}

export default ManageActivityItem;
