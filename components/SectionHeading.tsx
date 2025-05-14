// components/SectionHeading.tsx
import React from 'react';

interface SectionHeadingProps {
  title: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-center mt-16 mb-8 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-4xl flex items-center gap-4 flex-wrap justify-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold italic text-gray-900 text-center whitespace-normal sm:whitespace-nowrap">
          {title}
        </h2>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
    </div>
  );
};

export default SectionHeading;
