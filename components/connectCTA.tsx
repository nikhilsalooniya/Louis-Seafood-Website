'use client';
import React from 'react';
import Link from 'next/link';

const ConnectCTA = () => {
  return (
    <section className="bg-theme-blue py-12 px-8 shadow-md mb-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Description */}
        <div className="mb-6 md:mb-0">
          <h4 className="text-3xl font-bold mb-2 text-theme-blue-2">Ready to Dive In?</h4>
          <p className="text-lg">
            Let&rsquo;s create a seafood experience like no other. Contact us today to get started.
          </p>
        </div>

        {/* Button wrapped in Link */}
        <Link href="/contact">
          <button className="bg-white text-theme-blue-2 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition duration-300 cursor-pointer">
            Let&apos;s Connect
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ConnectCTA;
