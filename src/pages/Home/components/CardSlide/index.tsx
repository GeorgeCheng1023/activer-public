import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card } from 'components/Card';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './index.scss';

// import required modules
import { Pagination, Navigation } from 'swiper';

const breakpoints = {
  480: {
    slidesPerView: 4,
  },

};

export default function App() {
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
      <SwiperSlide>
        <Card
          imgUrl="https://plus.unsplash.com/premium_photo-1664461279859-07a15fd8a000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHJ1bnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
          title="test"
          tags={[{
            id: '1',
            text: 'test',
            variant: 'area',
          }]}
          altText="Test"
        />
      </SwiperSlide>

      <SwiperSlide>
        <Card
          imgUrl="https://plus.unsplash.com/premium_photo-1664461279859-07a15fd8a000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHJ1bnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
          title="test"
          tags={[{
            id: '1',
            text: 'test',
            variant: 'area',
          }]}
          altText="Test"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Card
          imgUrl="https://plus.unsplash.com/premium_photo-1664461279859-07a15fd8a000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHJ1bnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
          title="test"
          tags={[{
            id: '1',
            text: 'test',
            variant: 'area',
          }]}
          altText="Test"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Card
          imgUrl="https://plus.unsplash.com/premium_photo-1664461279859-07a15fd8a000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHJ1bnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
          title="test"
          tags={[{
            id: '1',
            text: 'test',
            variant: 'area',
          }]}
          altText="Test"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Card
          imgUrl="https://plus.unsplash.com/premium_photo-1664461279859-07a15fd8a000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHJ1bnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
          title="test"
          tags={[{
            id: '1',
            text: 'test',
            variant: 'area',
          }]}
          altText="Test"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Card
          imgUrl="https://plus.unsplash.com/premium_photo-1664461279859-07a15fd8a000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHJ1bnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
          title="test"
          tags={[{
            id: '1',
            text: 'test',
            variant: 'area',
          }]}
          altText="Test"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Card
          imgUrl="https://plus.unsplash.com/premium_photo-1664461279859-07a15fd8a000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHJ1bnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
          title="test"
          tags={[{
            id: '1',
            text: 'test',
            variant: 'area',
          }]}
          altText="Test"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Card
          imgUrl="https://plus.unsplash.com/premium_photo-1664461279859-07a15fd8a000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHJ1bnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
          title="test"
          tags={[{
            id: '1',
            text: 'test',
            variant: 'area',
          }]}
          altText="Test"
        />
      </SwiperSlide>

    </Swiper>
  );
}
