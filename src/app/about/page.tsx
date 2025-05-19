'use client';
import React from 'react';
import WhoWeAre from '../../../components/WhoWeAre';
import OurStrengths from '../../../components/OurStrengths';
import Mission from '../../../components/Mission';
import WhyChooseLouisSeafood from '../../../components/WhyChoose';

const AboutPage = () => {
  return (
    <main className="min-h-screen">
      <WhoWeAre />
        <OurStrengths />
        <Mission />
        <WhyChooseLouisSeafood />
     
    </main>
  );
};

export default AboutPage;
