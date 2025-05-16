'use client';
import React, { useEffect, useState } from 'react';

interface WhoWeAreData {
  heading: string;
  description: string;
  video_url: string;
}

const WhoWeAreSection: React.FC = () => {
  const [data, setData] = useState<WhoWeAreData>({
    heading: '',
    description: '',
    video_url: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/whoarewe');
        const json = await res.json();
        if (res.ok) {
          setData(json);
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-white mt-10 py-12 px-4 md:px-16 flex flex-col md:flex-row items-center gap-10">
      {/* Left - Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        {data.video_url ? (
          <video
            src={data.video_url}
            autoPlay
            muted
            playsInline
            loop
            className="w-full max-w-[90%] md:max-w-[450px] h-auto md:h-[300px] rounded-xl shadow-md object-cover mt-4"
          >
            Your browser does not support the video tag.
          </video>

        ) : (
          <div className="w-full max-w-[90%] md:max-w-[450px] h-64 bg-gray-200 rounded-xl mt-4" />
        )}

      </div>

      {/* Right - Content */}
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4 text-center md:text-left">
          {data.heading || 'Who We Are'}
        </h2>
        <p className="text-gray-800 text-base leading-relaxed text-center md:text-left">
          {data.description || 'Loading description...'}
        </p>
        {error && <p className="text-red-500 mt-4 text-center md:text-left">{error}</p>}
      </div>
    </section>
  );
};

export default WhoWeAreSection;
