import React from 'react';
// components
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from 'components/Card';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import './index.scss';

// import required modules
import { EffectCards, Navigation } from 'swiper';

export default function CardRoll() {
  return (
    <Swiper
      navigation
      loop
      effect="cards"
      grabCursor
      modules={[EffectCards, Navigation]}
      className="hero__card-roll"
    >
      <SwiperSlide>
        <Card
          id="12345"
          imgUrl="https://plus.unsplash.com/premium_photo-1664461279859-07a15fd8a000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHJ1bnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
          title="test"
          tags={[{
            id: '1',
            text: 'test',
            type: 'area',
          }, {
            id: '1',
            text: 'test',
            type: 'area',
          }, {
            id: '1',
            text: 'test',
            type: 'area',
          }, {
            id: '1',
            text: 'test',
            type: 'area',
          }, {
            id: '1',
            text: 'test',
            type: 'area',
          }, {
            id: '1',
            text: 'test',
            type: 'area',
          }, {
            id: '1',
            text: 'test',
            type: 'area',
          }, {
            id: '1',
            text: 'test',
            type: 'area',
          }]}
          altText="Test"
        />

      </SwiperSlide>
      <SwiperSlide>
        <Card
          id="12343567"
          imgUrl="https://plus.unsplash.com/premium_photo-1664461279859-07a15fd8a000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHJ1bnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
          title="test2"
          tags={[{
            id: '1',
            text: 'test',
            type: 'area',
          }]}
          altText="Test"
        />

      </SwiperSlide>
      <SwiperSlide>
        <Card
          id="1234356"
          imgUrl="https://plus.unsplash.com/premium_photo-1664461279859-07a15fd8a000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHJ1bnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
          title="test3"
          tags={[{
            id: '1',
            text: 'test',
            type: 'area',
          }]}
          detail="2022-10-1 ~ 2022-10-3"
          altText="Test"
        />

      </SwiperSlide>

    </Swiper>
  );
}
