'use client';
import React from 'react';

const features = [
  {
    title: "Fresh & Frozen Seafood",
    img: "/images/image4.jpg",
    description:
      "We offer premium quality fresh and frozen seafood sourced from trusted global suppliers. Our selection includes a wide variety of fish, shellfish, and specialty items. Each product is handled with care to preserve freshness and taste.",
  },
  {
    title: "Full Range of Food Products",
    img: "/images/image7.jpg",
    description:
      "From meats to sauces, we provide a wide variety of food products tailored for your needs. Whether you're a restaurant, retailer, or caterer, our catalog meets diverse culinary requirements. Quality and consistency are our top priorities.",
  },
  {
    title: "Global Sourcing & Importing",
    img: "/images/image6.jpg",
    description:
      "Our international network allows us to import specialty products with ease and efficiency. We work directly with global partners to bring you hard-to-find ingredients. This ensures authenticity and diversity in your offerings.",
  },
  {
    title: "Reliable Delivery & Logistics Support",
    img: "/images/inspection.jpg",
    description:
      "Timely, well-managed delivery service that ensures your products reach you fresh and on time. Our logistics team handles storage and transport with precision. You can count on us for dependable support, every step of the way.",
  },
];


const FeaturesSection = () => {
  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-4xl font-extrabold text-center text-[#003366] mb-16 font-serif">
          What We Offer
        </h3>

        {features.map((feature, idx) => (
          <div
            key={idx}
            className={`flex flex-col md:flex-row ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''
              } items-center mb-16 gap-8`}
          >
            {/* Image */}
            <div className="md:w-1/2 w-full">
              <img
                src={feature.img}
                alt={feature.title}
                className="w-full h-64 object-cover rounded-xl shadow-md"
              />
            </div>

            {/* Description */}
            <div className="md:w-1/2 w-full text-center md:text-left">
              <h4 className="text-2xl md:text-3xl font-bold text-[#003366] mb-4 font-serif">
                {feature.title}
              </h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
