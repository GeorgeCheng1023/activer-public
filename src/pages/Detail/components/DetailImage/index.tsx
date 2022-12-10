import React from 'react';
import Carousel from 'components/Carousel';
import IconLogo from 'components/Icons';

type Props = {
  image?: string[] | null;
  id: number;
  altText: string
};

function DetailImage({ image, id, altText }: Props) {
  if (image) {
    return (
      <div className="detail__img">
        <Carousel
          slides={image.map((img: any, index: number) => (
            <img key={`img-${id}${index}`} src={img} alt={altText} />
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
  image: null,
};

export default DetailImage;
