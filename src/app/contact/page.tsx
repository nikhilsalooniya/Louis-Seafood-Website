'use client';
import React from 'react';
import ContactDetails from '../../../components/ContactDetails';
import ContactPrompt from '../../../components/ContactPrompt';


export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6 flex flex-col md:flex-row justify-center items-center gap-6">
      <div className="w-full md:w-1/2">
        <ContactPrompt />
      </div>
      
    </div>
  );
}

