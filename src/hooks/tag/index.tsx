import { TagType } from 'components/Tag';
import { TagDataType } from 'types/ActivityDataType';

export const useParseArrayTagDataToTag = (TagData: TagDataType[]): Array<TagType> => (
  TagData.map((tag: TagDataType) => ({
    id: tag.id.toString(),
    text: tag.text,
    type: tag.type as TagType['type'],
  }))
);

export const useParseTagDataToTag = (TagData: TagDataType) : TagType => ({
  id: TagData.id.toString(),
  text: TagData.text,
  type: TagData.type as TagType['type'],
});

export const useParseTagToTagData = (inputTag: TagType): TagDataType => (
  {
    id: parseInt(inputTag.id, 10),
    text: inputTag.text,
    type: inputTag.type as TagDataType['type'],
  }
);
