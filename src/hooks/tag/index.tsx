import { TagType } from 'components/Tag';
import { TagDataType } from 'types/ActivityDataType';

export const useParseArrayTagDataToTag = (TagData: TagDataType[]): Array<TagType> => (
  TagData.map((tag: TagDataType) => ({
    id: tag.Id.toString(),
    text: tag.Text,
    type: tag.Type as TagType['type'],
  }))
);

export const useParseTagDataToTag = (TagData: TagDataType) : TagType => ({
  id: TagData.Id.toString(),
  text: TagData.Text,
  type: TagData.Type as TagType['type'],
});

export const useParseTagToTagData = (inputTag: TagType): TagDataType => (
  {
    Id: parseInt(inputTag.id, 10),
    Text: inputTag.text,
    Type: inputTag.type as TagDataType['Type'],
  }
);
