import React from 'react';
import Carousel from 'components/Carousel';
import { IconLogo } from 'components/Icons';

interface DetailImagesType {
  images?: string[] | null;
  activityId: number;
  altText: string
}

function DetailImage({ images, activityId, altText }: DetailImagesType) {
  if (images) {
    return (
      <Carousel
        slides={images.map((img: any, index: number) => (
          <img key={`img-${activityId}${index}`} src={img} alt={altText} />
        ))}
      />
    );
  }
  return (
    <IconLogo />
  );
}

DetailImage.defaultProps = {
  images: null,
};

export default DetailImage;
