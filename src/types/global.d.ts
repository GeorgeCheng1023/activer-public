export {};

declare global {
  type TagType = {
    color: 'primary' | 'secondary' | 'success';
    icon: 'minus' | 'plus' | 'move',
    text: string;
  };
}
