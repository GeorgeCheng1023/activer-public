import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card, CardType } from 'components/Card';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './index.scss';

// import required modules
import { Pagination, Navigation } from 'swiper';

const breakpoints = {
  480: {
    slidesPerView: 3,
  },
  1024: {
    slidesPerView: 4,
  },

};

interface CardSlideType {
  cards: CardType[];
}

function CardSlide({ cards }: CardSlideType) {
  return (
    <Swiper
      slidesPerView={1}
      breakpoints={breakpoints}
      spaceBetween={30}
      pagination={{ clickable: true }}
      navigation
      loop
      modules={[Pagination, Navigation]}
      className="card-slide"
    >
      {cards.map((card) => (
        <SwiperSlide>
          <Card {...card} />
        </SwiperSlide>
      ))}

    </Swiper>
  );
}

export default CardSlide;
