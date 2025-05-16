'use client';
import React, { useEffect, useState } from 'react';

interface HeroData {
  heading: string;
  subheading: string;
  video_url: string;
}

const HeroSection: React.FC = () => {
  const [heroData, setHeroData] = useState<HeroData>({
    heading: '',
    subheading: '',
    video_url: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await fetch('/api/hero2');
        const data = await res.json();
        if (res.ok) {
          setHeroData(data);
        } else {
          setError('Failed to fetch hero section data.');
        }
      } catch (err) {
        setError('Error fetching hero section data.');
      }
    };

    fetchHeroData();
  }, []);

  return (
    <section className="relative bg-[#0077be] h-screen text-white overflow-hidden">
      {/* Wave Border (bottom) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 z-10">
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className="w-full h-20">
          <path
            d="M0,0 C300,100 900,0 1200,100 L1200,00 L0,0 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center min-h-[90vh] px-6 py-12 relative z-20 max-w-7xl mx-auto">
        {/* Video (Portrait) */}
        <div className="rounded-2xl shadow-lg w-auto h-[500px] aspect-[9/16] object-cover mx-auto">
          {heroData.video_url ? (
            <video
              className="rounded-2xl shadow-lg w-full h-auto max-h-[500px] object-cover"
              src={heroData.video_url}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-black text-white rounded-2xl">
              <p>Loading video...</p>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="w-full md:w-1/2 md:pl-12 text-left mt-6 md:mt-0">
          <h2 className="text-4xl font-bold mb-4">
            {heroData.heading || 'Loading...'}
          </h2>
          <p className="text-lg leading-relaxed">
            {heroData.subheading || 'Please wait while content loads.'}
          </p>
          {error && <p className="text-red-400 mt-2">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
