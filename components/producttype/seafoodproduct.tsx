import React from 'react';

const SeafoodProducts: React.FC = () => {
  return (
    <div className="relative py-16 text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/freepik__the-style-is-3d-model-with-octane-render-volumetri__27992.jpeg')` }} // Update with your image path
      >
        <div className="absolute inset-0 bg-[#000000]/50" /> {/* Overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-36">
        <h2 className="text-4xl font-bold font-serif mb-4">Seafood Products</h2>
        <p className="max-w-xl mx-auto text-blue-100">
          Dive into our wide range of fresh, frozen, and packaged seafood sourced from sustainable oceans and clean waters.
        </p>
      </div>

      {/* Wave bottom border */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0] z-0">
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

export default SeafoodProducts;
