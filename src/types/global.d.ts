export { };

declare global {
  type TagType = {
    color: 'primary' | 'secondary' | 'success';
    icon?: 'minus' | 'plus' | 'move',
    text: string;
  };
  type CardType = {
    imgUrl: string,
    title: string,
    altText: string,
    tags: Array<TagType>,
    animation: string,
    detail?: string
  };
}
