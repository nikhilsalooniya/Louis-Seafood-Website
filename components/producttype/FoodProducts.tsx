import React from 'react';

const FoodProducts = () => {
  return (
    <div className="relative bg-[#005f56] text-white py-16">
      <h2 className="text-4xl font-bold text-center font-serif mb-4">Food Products</h2>
      <p className="text-center max-w-xl mx-auto text-green-100">
        Explore our wide selection of high-quality food products, including grains, spices, sauces, and more—all globally sourced.
      </p>

      {/* Wave bottom border */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[60px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            d="M0,224L60,197.3C120,171,240,117,360,117.3C480,117,600,171,720,186.7C840,203,960,181,1080,154.7C1200,128,1320,96,1380,80L1440,64V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default FoodProducts;
