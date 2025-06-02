'use client';
import React, {useEffect, useState} from 'react';
import Image from 'next/image';

interface Offer {
  id: number;
  title: string;
  image_url: string;
}

const missionPoints = [
  {
    image: '/images/image6.jpg',
    text: 'Sustainably Sourced Food',
    cols: 'col-span-2',
    rows: 'row-span-1',
  },
  {
    image: '/images/delivery.jpeg',
    text: 'Prompt Delivery',
    cols: 'col-span-1',
    rows: 'row-span-1',
  },
  {
    image: '/images/image10.jpg',
    text: 'Trusted Partnerships',
    cols: 'col-span-1',
    rows: 'row-span-2',
  },
  {
    image: '/images/image5.jpg',
    text: 'Freshness Every Time',
    cols: 'col-span-1',
    rows: 'row-span-1',
  },
  {
    image: '/images/premiumoack.jpeg',
    text: 'Premium Packaging',
    cols: 'col-span-1',
    rows: 'row-span-1',
  },
  {
    image: '/images/image4.jpg',
    text: 'Top-Quality & Safety Standards',
    cols: 'col-span-1',
    rows: 'row-span-1',
  },
];

const Mission = () => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch('/api/OurMission');
        const data = await res.json();
        setOffers(data);
        console.log(data);
      } catch (err) {
        console.error('Error fetching offers:', err);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div className="bg-white p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">Our Mission</h2>

      {/*<div className="grid grid-cols-4 auto-rows-[200px] gap-4 ">*/}
      <div className="grid grid-cols-3 grid-rows-[200px] gap-4">

        {offers.map((item, index) => (
          <div
            key={index}
            className={`relative overflow-hidden shadow-md h-[200px]`}
          >
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="hover:scale-105"
              priority={index === 0} // optionally prioritize loading the first image
            />
            {/* Light overlay under the text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 flex items-center justify-center p-4">
              <p className="text-white text-lg font-semibold text-center">{item.title}</p>
            </div>
          </div>
        ))}

        {/*{missionPoints.map((item, index) => (*/}
        {/*  <div*/}
        {/*    key={index}*/}
        {/*    className={`relative overflow-hidden shadow-md ${item.cols} ${item.rows}`}*/}
        {/*  >*/}
        {/*    <Image*/}
        {/*      src={item.image}*/}
        {/*      alt={item.text}*/}
        {/*      fill*/}
        {/*      style={{ objectFit: 'cover', transition: 'transform 0.3s' }}*/}
        {/*      sizes="(max-width: 768px) 100vw, 33vw"*/}
        {/*      className="hover:scale-105"*/}
        {/*      priority={index === 0} // optionally prioritize loading the first image*/}
        {/*    />*/}
        {/*    /!* Light overlay under the text *!/*/}
        {/*    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 flex items-center justify-center p-4">*/}
        {/*      <p className="text-white text-lg font-semibold text-center">{item.text}</p>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*))}*/}

      </div>
    </div>
  );
};

export default Mission;
