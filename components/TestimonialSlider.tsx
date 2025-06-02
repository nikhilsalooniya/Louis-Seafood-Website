'use client';

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const PrevArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute left-0 md:-left-5 top-1/2 transform -translate-y-1/2 bg-white text-blue-700 p-2 rounded-full shadow hover:bg-blue-100 z-10"
  >
    <FaArrowLeft />
  </button>
);

const NextArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute right-0 md:-right-5 top-1/2 transform -translate-y-1/2 bg-white text-blue-700 p-2 rounded-full shadow hover:bg-blue-100 z-10"
  >
    <FaArrowRight />
  </button>
);

const TestimonialSlider = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonial');
        const data = await res.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      }
    };
    fetchTestimonials();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-theme-blue-2 text-center mb-10 font-serif">Testimonials</h2>
      <div className="relative">
        <Slider {...settings}>
          {testimonials.map((item, idx) => (
            <div key={idx} className="px-4">
              <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center min-h-[300px]">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-200 mb-4"
                />
                <p className="text-gray-700 italic text-center mb-3 text-sm">"{item.comment}"</p>
                <p className="font-semibold text-theme-blue-2">{item.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialSlider;
