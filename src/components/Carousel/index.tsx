import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import './index.scss';

// import required modules
import { Navigation } from 'swiper';

type Props = {
  slides: Array<JSX.Element>;
};

function Carousel({ slides } : Props) {
  return (
    <div className="carousel">
      <Swiper navigation modules={[Navigation]} className="mySwiper" loop>
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
