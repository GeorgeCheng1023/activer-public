import { TagType } from 'components/Tag';

export type TagDataType = {
  TagId: number,
  Text: string,
  Type: string,
}[];

export const useParseTag = (TagData: TagDataType): Array<TagType> => (
  TagData.map((tag) => ({
    id: tag.TagId.toString(),
    text: tag.Text,
    variant: tag.Type as TagType['variant'],
  }))
);
