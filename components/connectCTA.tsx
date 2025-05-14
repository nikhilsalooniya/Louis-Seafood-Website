'use client';
import React from 'react';
import Link from 'next/link';

const ConnectCTA = () => {
  return (
    <section className="bg-blue-900 text-white py-12 px-8  shadow-md mb-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Description */}
        <div className="mb-6 md:mb-0">
          <h4 className="text-3xl font-bold mb-2">Ready to Dive In?</h4>
          <p className="text-lg text-blue-100">
            Let’s create a seafood experience like no other. Contact us today to get started.
          </p>
        </div>

        {/* Button wrapped in Link */}
        <Link href="/contact">
          <button className="bg-white text-blue-800 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition duration-300 cursor-pointer">
            Let's Connect
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ConnectCTA;
