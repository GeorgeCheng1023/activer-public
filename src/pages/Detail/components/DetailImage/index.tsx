import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import './index.scss';

interface DetailImagesType {
  images: string[] | null;
  altText: string
}

function DetailImage({ images, altText }: DetailImagesType) {
  return (
    <div className="detail__image">
      {
        images ? (
          <Swiper
            navigation
            modules={[Navigation]}

          >
            {images.map((image) => (
              <SwiperSlide>
                <img src={image} alt={altText} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : <img src="/DefaultActivityPng.png" alt={altText} />

      }
    </div>
  );
}

export default DetailImage;
