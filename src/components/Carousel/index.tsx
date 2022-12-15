// components/Carousel
import React from 'react';
// components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
// style
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './index.scss';

interface CarouselType {
  slides: Array<JSX.Element>;
}

function Carousel({ slides } : CarouselType) {
  return (
    <div className="carousel">
      <Swiper
        navigation
        pagination
        modules={[Navigation, Pagination]}
        className="swiper"
        loop
      >
        {slides.map((slide) => (
          <SwiperSlide>
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
