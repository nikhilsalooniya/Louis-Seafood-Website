'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // ✅ Import Next.js Image

interface Offer {
  id: number;
  title: string;
  description: string;
  image_url: string;
}

const FeaturesSection = () => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch('/api/offer');
        const data = await res.json();
        setOffers(data);
      } catch (err) {
        console.error('Error fetching offers:', err);
      }
    };

    fetchOffers();
  }, []);

  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-4xl font-extrabold text-center text-theme-blue-2 mb-16 font-serif">
          What We Offer
        </h3>

        {offers.map((feature, idx) => (
          <div
            key={feature.id}
            className={`flex flex-col md:flex-row ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''} items-center mb-16 gap-8`}
          >
            {/* Image */}
            <div className="md:w-1/2 w-full flex justify-center">
              <div className="w-80 h-64 relative">
                <Image
                  src={feature.image_url}
                  alt={feature.title}
                  fill
                  className="object-cover rounded-xl shadow-md"
                />
              </div>
            </div>

            {/* Description */}
            <div className="md:w-1/2 w-full text-center md:text-left">
              <h4 className="text-2xl md:text-3xl font-bold text-theme-blue-2 mb-4 font-serif">
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
