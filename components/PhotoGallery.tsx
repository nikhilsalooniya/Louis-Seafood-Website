'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

// Array of image URLs (replace with actual paths)
const galleryImages = [
  '/images/FreshFish.jpg',
  '/images/frozenveg.jpg',
  '/images/inspection.jpg',
  '/images/globalsupplier.jpg',
  '/images/freshsalmon.jpg',
  '/images/logistics.jpg',
  '/images/shrimped.jpg',
];

const AutoScrollGallery = () => {
  const galleryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (gallery) {
      const scrollSpeed = 2; // Default scroll speed for smaller screens
      const scrollAmount = 1; // Default scroll increment

      // Function to dynamically adjust scroll speed based on screen size
      const adjustScrollSpeed = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth > 1024) {
          return 3; // Increase speed for large screens
        }
        return 2; // Default for mobile
      };

      // Clone the first image to create the infinite scroll effect
      const cloneImages = () => {
        const firstImage = gallery?.firstElementChild?.cloneNode(true);
        if (firstImage && gallery) {
          gallery.appendChild(firstImage); // Append first image to end
        }
      };

      // Clone the first image on mount
      cloneImages();

      // Scroll the gallery automatically
      const scrollInterval = setInterval(() => {
        const currentSpeed = adjustScrollSpeed();
        if (gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth) {
          gallery.scrollLeft = 0; // Reset scroll position when reached end
        } else {
          gallery.scrollLeft += scrollAmount;
        }
      }, scrollSpeed);

      return () => clearInterval(scrollInterval); // Cleanup interval on unmount
    }
  }, []);

  return (
    <div className="max-w-full mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center text-theme-blue-2 font-serif mb-12">
         Gallery
      </h2>

      <div
        ref={galleryRef}
        className="flex overflow-x-auto space-x-4 mb-6 scrollbar-hide w-full"
      >
        {galleryImages.map((src, idx) => (
          <div key={idx} className="relative min-w-[300px] h-[200px] flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={src}
              alt={`Gallery Image ${idx}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollGallery;
