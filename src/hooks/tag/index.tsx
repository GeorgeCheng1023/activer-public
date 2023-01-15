import { TagType } from 'components/Tag';
import { TagDataType } from 'types/ActivityDataType';

export const useParseTagDataArray = (TagData: TagDataType[]): Array<TagType> => (
  TagData.map((tag: TagDataType) => ({
    id: tag.Id.toString(),
    text: tag.Text,
    type: tag.Type as TagType['type'],
  }))
);

export const useParseTag = (TagData: TagDataType) : TagType => ({
  id: TagData.Id.toString(),
  text: TagData.Text,
  type: TagData.Type as TagType['type'],
});

export const useParseTagData = (inputTag: TagType): TagDataType => (
  {
    Id: parseInt(inputTag.id, 10),
    Text: inputTag.text,
    Type: inputTag.type as TagDataType['Type'],
  }
);
