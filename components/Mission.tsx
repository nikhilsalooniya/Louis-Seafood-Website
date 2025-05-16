import React from 'react';

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
  return (
    <div className="bg-white p-8  shadow-lg">
      <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">Our Mission</h2>

      <div className="grid grid-cols-4 auto-rows-[200px]">
        {missionPoints.map((item, index) => (
          <div
            key={index}
            className={`relative overflow-hidden shadow-md ${item.cols} ${item.rows}`}
          >
            <img
              src={item.image}
              alt={item.text}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            {/* Light overlay under the text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 flex items-center justify-center p-4">
              <p className="text-white text-lg font-semibold text-center">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mission;
