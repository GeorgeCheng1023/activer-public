import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Tag from 'components/Tag';

const defaultTags: Array<TagType> = [{
  color: 'primary',
  text: 'Test',
},
{
  color: 'success',
  text: 'Free',
},
];

function TagSort() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tags, setTags] = useState<Array<TagType>>(defaultTags);

  function createTag(tag: TagType) {
    return <Tag color={tag.color} text={tag.text} />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="tag-sort">
        {tags.map(createTag)}
      </div>
    </DndProvider>
  );
}

export default TagSort;
