import React from 'react';
import Carousel from 'components/Carousel';
import { IconLogo } from 'components/Icons';
import './index.scss';

interface DetailImagesType {
  images?: string[] | null;
  activityId: number;
  altText: string
}

function DetailImage({ images, activityId, altText }: DetailImagesType) {
  if (images) {
    return (
      <div className="detail__img">
        <Carousel
          slides={images.map((img: any, index: number) => (
            <img key={`img-${activityId}${index}`} src={img} alt={altText} />
          ))}
        />
      </div>
    );
  }
  return (
    <div className="detail__img">
      <IconLogo />
    </div>
  );
}

DetailImage.defaultProps = {
  images: null,
};

export default DetailImage;
