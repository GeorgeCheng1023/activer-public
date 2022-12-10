import { TagType } from 'components/Tag';
import { TagDataType } from 'types/ActivityDataType';

export const useParseTag = (TagData: TagDataType[]): Array<TagType> => (
  TagData.map((tag: TagDataType) => ({
    id: tag.Id.toString(),
    text: tag.Text,
    variant: tag.Type as TagType['variant'],
  }))
);

export const useParseTagData = (inputTag: TagType): TagDataType => (
  {
    Id: parseInt(inputTag.id, 10),
    Text: inputTag.text,
    Type: inputTag.variant as TagDataType['Type'],
  }
);
