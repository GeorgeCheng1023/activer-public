import React from 'react';
import { TagDataType } from 'types/ActivityDataType';
import Tag, { TagType } from 'components/Tag';

type Props = {
  tags: TagDataType[] | null
};

function DetailTags({ tags }: Props) {
  if (tags) {
    return (
      <>
        {
          tags.map((tag: TagDataType) => {
            const variant = tag.Type as TagType['variant'];
            return (
              <Tag
                id={tag.Id!.toString()}
                key={tag.Id!.toString()}
                text={tag.Text}
                variant={variant}
              />
            );
          }).slice(0, 5)
        }
      </>
    );
  }
  return null;
}

export default DetailTags;
