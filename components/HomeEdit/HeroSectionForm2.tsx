// components/admin/HeroSectionForm.tsx
'use client';
import React, { useState } from 'react';

const HeroSectionForm2 = () => {
  const [heading, setHeading] = useState('');
  const [subheading, setSubheading] = useState('');
  const [video, setVideo] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('subheading', subheading);
    if (video) formData.append('video', video);

    const res = await fetch('/api/hero2', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) alert("Hero section updated!");
    else alert("Something went wrong!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl text-gray-900 font-bold">Update Hero Section-2</h2>

      <div>
        <label className="block mb-1 text-gray-900 font-semibold">Heading</label>
        <input value={heading} onChange={(e) => setHeading(e.target.value)} className="w-full p-2 border" required />
      </div>

      <div>
        <label className="block mb-1 text-gray-900 font-semibold">Description</label>
        <input value={subheading} onChange={(e) => setSubheading(e.target.value)} className="w-full p-2 border" required />
      </div>

      <div>
        <label className="block mb-1 text-gray-900 font-semibold">Video File (MP4)</label>
        <input className="text-gray-900 bg-gray-100 px-2 py-2" type="file" accept="video/mp4" onChange={(e) => setVideo(e.target.files?.[0] || null)} />
      </div>

      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Save</button>
    </form>
  );
};

export default HeroSectionForm2;
