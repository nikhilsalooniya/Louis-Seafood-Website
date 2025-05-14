import React from 'react';

const points = [
  {
    title: 'Global Network',
    description:
      'We operate across international markets, connecting you with top suppliers from all over the world for unmatched variety.',
  },
  {
    title: 'Competitive Pricing',
    description:
      'Our strong supplier relationships help us offer you the best value without compromising on quality.',
  },
  {
    title: 'Strict Quality Standards',
    description:
      'Each product is thoroughly inspected and complies with global food safety regulations.',
  },
  {
    title: 'Fast & Reliable Service',
    description:
      'We deliver efficiently with minimal delays, ensuring freshness and timeliness every step of the way.',
  },
  {
    title: 'Personalized Client Support',
    description:
      'Our team is here for you 24/7, offering tailored support to meet your unique business needs.',
  },
];

const WhyChooseUs = () => {
  return (
    <div className="relative bg-white p-10 shadow-xl rounded-xl overflow-hidden max-w-4xl mx-auto mt-10">
      {/* Folded corner effect */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gray-200" style={{
        clipPath: 'polygon(100% 0, 0% 0%, 100% 100%)',
        boxShadow: '-3px 3px 8px rgba(0, 0, 0, 0.1)',
      }} />

      <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
        Why Choose Louis Seafood?
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {points.map((item, index) => (
          <div
            key={index}
            className="bg-[#f9f9f9] rounded-lg p-5 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-blue-800 mb-2">{item.title}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
