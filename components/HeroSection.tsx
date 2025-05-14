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
        const res = await fetch('/api/hero-section');
        const data = await res.json();
        if (res.ok) {
          setHeroData(data);
        } else {
          setError('Failed to fetch hero data');
        }
      } catch (err) {
        setError('Error fetching hero data');
      }
    };

    fetchHeroData();
  }, []);

  return (
    <section className="relative h-screen text-white overflow-hidden">
      {/* Video Background */}
      {heroData.video_url ? (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={heroData.video_url}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div className="absolute inset-0 bg-black opacity-50 z-0" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-8 py-32">
        <h2 className="text-4xl font-extrabold mb-4 text-center">{heroData.heading}</h2>
        <p className="text-lg text-center mb-8">{heroData.subheading}</p>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </section>
  );
};

export default HeroSection;
