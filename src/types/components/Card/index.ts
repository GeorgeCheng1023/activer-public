import { TagType } from 'components/Tag';

export interface CardType {
  imgUrl: string,
  title: string,
  altText: string,
  tags: Array<TagType>,
  detail?: string
}

export interface CardRowType extends CardType {
  control?: JSX.Element;
}
