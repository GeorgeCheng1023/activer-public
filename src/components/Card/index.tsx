import React from 'react';
import Tag from '../Tag';
import './index.scss';

type TagsProp = {
  color: string,
  text: string,
  icon: string,
};
type CardProps = {
  imgUrl: string,
  title: string,
  altText: string,
  tags: Array<TagsProp>,
  animation: string
};

function createTag(TagsContent: TagsProp) {
  return (
    <Tag
      tagColor={TagsContent.color}
      tagText={TagsContent.text}
      tagIcon={TagsContent.icon}
    />
  );
}

function Card({
<<<<<<< HEAD
  imgUrl, title, tags, altText,
}: CardProps) {
  return (
    <div className="card">
      <img className="card__image" src={imgUrl} alt={altText} />
=======
  imgUrl, title, tags, animation,
}: CardProps) {
  return (
    <div className={`card card--${animation}`}>
      <img className="card__image" src={imgUrl} alt="" />
>>>>>>> f8421382769f1e0a8591e300ac52c9bbb7ad245a
      <h3 className="card__title">{title}</h3>
      <div className="card__tag">
        {tags.map(createTag)}
      </div>
    </div>
  );
}

export default Card;
